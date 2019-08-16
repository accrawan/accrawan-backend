const express = require('express');
const router = express.Router();
const debug = require('debug')('accrawan-backend:routes/gateway.js');
const Gateway = require('../models/gateways');
const User = require('../models/user');
const { waterfall } = require('async');

router.post('/create', (req, res) => {
  // async add gateway _id to user on save
  waterfall(
    [
      cb => {
        let { name, model, manufacturer, mac_address } = req.body;
        let newGateway = new Gateway({
          name,
          model,
          manufacturer,
          mac_address,
          added: new Date(),
          owner: req.user._id
        });

        newGateway.save((err, gateway) => {
          if (err) return cb(err);
          return cb(null, gateway);
        });
      },
      (gateway, cb) => {
        User.findByIdAndUpdate(req.user._id, {
          $addToSet: {
            gateways: gateway._id
          }
        }).exec(err => {
          if (err) return cb(err);
          return cb(null, gateway);
        });
      }
    ],
    (err, result) => {
      if (err) {
        debug(err);
        return res.json(err);
      }
      return res.json(result);
    }
  );
});

router.delete('/delete', (req, res) => {
  // async it
  waterfall(
    [
      cb => {
        Gateway.findByIdAndDelete(req.body._id, (err, gateway) => {
          if (err) return cb(err);
          if (!gateway) return cb(new Error('No gateway found'));
          return cb(null, gateway); // delete gateway from user collection
        });
      },
      (gateway, cb) => {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $pull: {
              gateways: gateway._id
            }
          }
        ).exec(err => {
          if (err) return cb(err);
          return cb(null, gateway);
        });
      }
    ],
    (err, result) => {
      if (err) {
        debug(err);
        return res.json(err);
      }
      res.json(result);
    }
  );
});

module.exports = router;
