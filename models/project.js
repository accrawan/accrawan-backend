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
  ]
});
module.exports = mongoose.model('Project', ProjectSchema);
