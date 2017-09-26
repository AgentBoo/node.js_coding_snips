// NOTE: Modules
const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

// NOTE: Define User schema
const userSchema = mongoose.Schema({
      local             : {
          username      : {
                type    : String,
                unique  : true,
                required: true
        },
          password      : {
                type    : String,
                required: true,
        }
       }
});


// NOTE: Define User methods
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, 10)
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
};



// NOTE: Expose model
module.exports = mongoose.model('User', userSchema);
