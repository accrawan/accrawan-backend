var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { crypt } = require('../config/env');

var ProjectSchema = new Schema(
  {
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
        node_id: {
          type: Schema.Types.ObjectId,
          ref: 'Node'
        },
        ack_time: { type: Date, default: Date.now }
      }
    ],
    api_key: {
      type: String
    }
  },
  {
    strict: false
  }
);

ProjectSchema.pre('save', function(next) {
  let project = this;
  if (this.isModified('public_key') || this.isNew) {
    var secureToken = require('secure-token');
    var CryptoJS = require('crypto-js');
    var newToken = secureToken.create(24).toString('base64');
    var cipherText = CryptoJS.AES.encrypt(newToken, crypt.aes_salt);
    project.public_key = cipherText.toString();
    return next();
    /*
     * decrypt with
     * var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
     * var plaintext = bytes.toString(CryptoJS.enc.Utf8);
     */
  }
});

ProjectSchema.methods.decryptApiKey = function(key, cb) {
  var CryptoJS = require('crypto-js');
  var bytes = CryptoJS.AES.decrypt(key, crypt.aes_salt);
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return cb(null, plaintext);
};
module.exports = mongoose.model('Project', ProjectSchema);
