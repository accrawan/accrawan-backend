var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const debug = require('debug')('accrawan-backend:user.model');
const securePassword = require('secure-password');
const pwd = new securePassword();

var UserSchema = new Schema({
  username: { type: String, required: true, lowercase: true },
  given_name: String,
  family_name: String,
  email: { type: String, required: true, lowercase: true },
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
  ],
  password: {
    type: Buffer,
    required: true
  }
});

UserSchema.pre('save', function(next) {
  let user = this;
  if (this.isModified('password') || this.isNew) {
    let userPassword = Buffer.from(user.password);
    pwd.hash(userPassword, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  } else return next();
});

UserSchema.methods.comparePassword = function(password, cb) {
  let hashbuf = Buffer.alloc(securePassword.HASH_BYTES);
  let user = this;
  hashbuf.set(user.password);
  pwd.verify(Buffer.from(password), hashbuf, function(err, result) {
    if (err) return cb(err);
    if (result === securePassword.VALID_NEEDS_REHASH) {
      pwd.hash(password, (err, hash) => {
        if (err) return cb(err);
        user.password = hash;
        user.save(err => {
          debug(err);
          if (err) return cb(null, true);
          debug('rehashed');
          return cb(null, true);
        });
      });
    } else {
      cb(null, result === securePassword.VALID);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
