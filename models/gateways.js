var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GatewaySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  manufacturer: String,
  model: String,
  location: {
    x: Number,
    y: Number,
    z: Number,
    description: String
  },
  last_online: Date,
  mac_address: String,
  keys: [
    {
      type: Buffer
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  added: {
    type: Date,
    default: Date.now
  },
  isPublic: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Gateway', GatewaySchema);
