var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema(
  {
    name: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    stats: Array
  },
  {
    strict: false
  }
);

module.exports = mongoose.model('Node', NodeSchema);
