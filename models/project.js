var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: { required: true, type: String },
  description: String,
  isPublic: { type: Boolean, default: true },
  created: {
    type: Date,
    default: Date.now()
  },
  nodes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Node'
    }
  ],
  team: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: 'String'
      }
    }
  ],
  logs: [
    {
      type: Schema.Types.Mixed
    }
  ]
});
module.exports = mongoose.model('Project', ProjectSchema);
