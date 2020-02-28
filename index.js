require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const router = express.Router();
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30,
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



sessionStore.sync();

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;

  next();
})

app.get('/', function(req, res) {
  console.log(`User is ${req.user ? req.user.name : 'not logged in'}`)
  res.render('index', { user: req.user });
});

app.get('/profile', isLoggedIn, function(req, res) {
  db.user.findOne({
    where: {
      id: req.user.id
    },
    include: [
      db.makeup
    ]
  }).then(function(user) {
    res.render('profile', {user});
  });
});
//adding to favorites
app.post('/profile', function(req, res) {
  db.usersMakeups.findOrCreate({
    where: {
      makeupId: req.body.id,
      userId: req.user.id
    }
  }).then(function() {
    res.redirect('/profile');
  });
});
//deleting from favorites
app.delete('/profile/:id', function(req, res) {
  db.usersMakeups.destroy({
    where: {
      makeupId: req.body.id,
      userId: req.user.id
    }
  }).then(function() {
    res.redirect('/profile');
  });
});

app.use('/auth', require('./controllers/auth'));
app.use('/makeup', require('./controllers/makeup'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
