const express = require('express');
const router = express.Router();
const debug = require('debug')('accrawan-backend:routes/gateway.js');
const Gateway = require('../models/gateways');
const User = require('../models/user');

router.post('/create', (req, res) => {
  let { name, model, manufacturer, mac_address } = req.body;
  let newGateway = new Gateway({
    name,
    model,
    manufacturer,
    mac_address,
    added: new Date()
  });

  newGateway.save((err, gateway) => {
    if (err) return debug('err');
    return res.json(gateway);
  });
});

router.delete('/delete', (req, res) => {
  // async it
  Gateway.findByIdAndDelete(req.body._id, (err, gateway) => {
    if (err) return debug(err);
    return res.json(gateway); // delete gateway from user collection
  });
});

module.exports = router;
