var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GatewaySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    x: Number,
    y: Number,
    z: Number
  },
  last_online: Date,
  mac_address: String
});

module.exports = mongoose.model('Gateway', GatewaySchema);
