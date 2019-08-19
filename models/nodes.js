var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema(
  {
    name: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    last_online: Date,
    added: Date,
    stats: Array,
    device_id: String
  },
  {
    strict: false
  }
);

module.exports = mongoose.model('Node', NodeSchema);
