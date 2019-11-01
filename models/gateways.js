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
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
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
