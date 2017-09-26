const express = require('express'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      passport = require('passport'),
      flash = require('connect-flash'),
      mongodb = require('./config/database.js'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
      mustacheExpress = require('mustache-express'),
      userRouter = require('./app/routes/users.js'),
      snipRouter = require('./app/routes/snips.js');


// NOTE: Configure passport ====================================================
require('./config/passport.js')(passport);

// NOTE: DB configuration ======================================================
mongoose.Promise = require('bluebird');
mongoose.connect(mongodb.url, { useMongoClient: true });                         // connect to our database + received deprecation warning for open() and connect() methods directing me to http://mongoosejs.com/docs/connections.html#use-mongo-client


// NOTE: Express app configuration =============================================
const app = express();
      app.engine('mustache', mustacheExpress());
      app.set('view engine', 'mustache');
      app.set('views', './views');
      app.use('/public', express.static('public'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(cookieParser());                                    // read cookies (needed for authentication)
      app.use(session(({
          secret: 'iscreamyouscreamgimmethatgimmethat ice cream',
          resave: true,
          saveUninitialized: false })));
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(flash());
      app.use(morgan('dev'));

// NOTE: Express router
      app.use('/', userRouter);
      app.use('/snips', snipRouter)


// NOTE: Index route handler  ==================================================
      app.get('/', (req, res) => {res.render('home')});
      app.get('/snippet', (req, res) => res.render('snippet'))
      app.post('/snippet', (req, res) => res.render('render', { 'textarea': req.body.text}))

// NOTE: PORT
const port = process.env.PORT || 5000;
      app.listen(port, () => console.log('Knock knock on ' + port))
