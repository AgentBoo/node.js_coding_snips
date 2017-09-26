const express = require('express'),
passport = require('passport'),
flash = require('connect-flash'),
mongoose = require('mongoose');

// NOTE: Configure passport
require('./../../config/passport.js')(passport);

const router = express.Router();

// home page
router.get('/', (req, res) => res.render('home'));

// login page
router.get('/login', (req, res) => res.render('login', { message: req.flash('loginMessage') }) );

// process req to login
router.post('/login', passport.authenticate('local-login', {
       successRedirect  : '/snips',
       failureRedirect  : '/login',
       failureFlash     : true  })                  // allow flash messages
);

// signup page
router.get('/signup', (req, res) => res.render('signup', { message: req.flash('signupMessage') }) );

// process req to signup
router.post('/signup', passport.authenticate('local-signup', {
       successRedirect  : '/home',                // redirect to secure profile
       failureRedirect  : '/signup',                 // redirect back to signup
       failureFlash     : true  })
);
// router.post('/signup', (req, res) => console.log(req.body))

// profile section
router.get('/snips', isLoggedIn, (req, res) => res.redirect('/snips/' + req.user._id ));

// logout
router.get('/logout', (req, res) => {
   req.logout();
   res.redirect('/'); });


// isLoggedIn middleware
function isLoggedIn(req, res, next){
      if (req.isAuthenticated()){ return next() };
      res.redirect('/') };

module.exports = router;
