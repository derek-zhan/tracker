const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      createIndexes: { unique: true },
      trim: true,
      minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
      },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email'],
        createIndexes: { unique: true },
      }
  }, {
    timestamps: true,
  });
  
  userSchema.pre('save', function(next) {
      var user = this;

      if(!user.isModified('password')) return next();

      bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
          if(err) return next(err);

          bcrypt.hash(user.password, salt, function(err, hash) {
              if(err) return next(err);

              user.password = hash;
              next();
          })
      })
  })

  userSchema.methods.comparePassword = function(candidatePassword, cb) {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
          if(err) return cb(err);
          cb(null, isMatch);
      })
  }
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;