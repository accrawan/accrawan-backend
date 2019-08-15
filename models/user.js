var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type:String, required: true, lowercase: true},
  email: {type: String, required: true, lowercase: true},
  gateways: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Gateway'
    }
  ],
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);