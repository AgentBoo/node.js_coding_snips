const LocalStrategy = require('passport-local').Strategy,
      User = require('./../app/models/user');

module.exports = function(passport){

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

// provide a strategy to passport called local-signup
// use named strategies

  passport.use('local-signup', new LocalStrategy({
      usernameField       : 'username',
      passwordField       : 'password',
      passReqToCallback   : true                                                      // allows me to pass back the entire request to the callback
  },
      function(req, username, password, done){
      // async
      // User.findOne will not fire unless data is sent back
      process.nextTick(function(){

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' : username }, function(err, user){
             if (err)
                 return done(err);
            // check to see if there alreay is a user with that email
             if (user)
                 return done(null, false, req.flash('signupMessage', 'This email has already been taken'));  // check out the req.flash situation
            // if there is no other user with that username, create a new user
             else {
            // set user's local credentials
                 let newUser = new User();

                 newUser.local.username = username;
                 newUser.local.password = newUser.generateHash(password);

                // save the user
                 newUser.save((err) => {
                     if (err)
                         throw err;
                     else
                         return done(null, newUser) });
          };
        })
      })
    }
));

     passport.use('local-login', new LocalStrategy({
         usernameField      : 'username',
         passwordField      : 'password',
         passReqToCallback  : true
    },
         function(req, username, password, done){
           User.findOne({ 'local.username' : username }, function(err, user){
                if(err)
                   return done(err);
                if(!user)
                   return done(null, false, req.flash('loginMessage'), 'No user found')
                if(!user.validPassword(password))
                   return done(null, false, req.flash('loginMessage', 'Ooops! Wrong password'))
                else
                  return done(null, user) });
    }
));




}
// last bracked, end, the end end end, period.
