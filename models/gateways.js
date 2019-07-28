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
  mac_address: String,
  keys: [
    {
      type: Buffer
    }
  ],
  owner: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Gateway', GatewaySchema);
