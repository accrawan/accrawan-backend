const express = require('express');
const router = express.Router();
const { waterfall } = require('async');
const debug = require('debug')('accrawan-backend:routes.project');
const User = require('../models/user');
const Project = require('../models/project');
const Node = require('../models/nodes');

router.post('/create', (req, res) => {
  waterfall(
    [
      cb => {
        let { title, description } = req.body;
        const newProject = new Project({
          title,
          description,
          isPublic: req.body.isPublic,
          team: [
            {
              _id: null,
              user: req.user._id,
              role: 'admin'
            }
          ]
        });
        newProject.save((err, project) => {
          if (err) cb(err);
          cb(null, project);
        });
      },
      (project, cb) => {
        User.findByIdAndUpdate(req.user._id, {
          $addToSet: { projects: project._id }
        }).exec(err => {
          if (err) return cb(err);
          return cb(null, project);
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

router.put('/:id/create-node', (req, res) => {
  waterfall(
    [
      cb => {
        Node.create(
          {
            name: req.body.name,
            project: req.params.id,
            owner: req.user._id,
            added: new Date().toUTCString()
          },
          (err, node) => {
            if (err) return cb(err);
            cb(null, node);
          }
        );
      },
      (node, cb) => {
        Project.findOneAndUpdate(
          {
            _id: req.params.id,
            team: {
              $elemMatch: {
                user: req.user._id
              }
            }
          },
          {
            $addToSet: {
              nodes: node._id
            }
          }
        )
          .select('title')
          .exec((err, project) => {
            if (err) return cb(err);
            if (!project)
              return Node.findByIdAndDelete(node._id).exec(err => {
                if (err)
                  return cb(
                    new Error(
                      'No project associated with node, unable to remove'
                    )
                  );
              });
            return cb(null, { node, project });
          });
      }
    ],
    (err, result) => {
      if (err) return res.json(err);
      res.json(result);
    }
  );
});

// router.post('/:id/log', (req, res) => {
//   Project.findOneAndUpdate();

// });
module.exports = router;
