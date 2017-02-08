var express = require('express'),
  bodyParser = require('body-parser'),
  lowdb = require('lowdb');

var db = lowdb('./data/data.json');
db._.mixin(require('underscore-db'));

var app = express();
app.use(bodyParser.json());

app.use(express.static('public'));

require('./utils/authorize-user')(app, db);

//User routes
var usersController = require('./controllers/users-controller')(db);
app.get('/api/users', usersController.get);
app.post('/api/users', usersController.post);
app.put('/api/auth', usersController.put);

// Games
var gamesController = require('./controllers/games-controller')(db);
app.get('/api/games', gamesController.get);
app.post('/api/games', gamesController.post);
app.put('/api/games/:id', gamesController.put);

// Categories
var categoriesController = require('./controllers/categories-controller')(db);
app.get('/api/categories', categoriesController.get);


var port = 3000;
app.listen(port, function() {
  console.log('Server is running at http://localhost:' + port);
});
