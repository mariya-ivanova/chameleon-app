var _ = require('lodash');
const PAGE_SIZE = 10,
  DEFAULT_GAME_IMAGE = 'https://dayinthelifeofapurpleminion.files.wordpress.com/2014/12/batman-exam.jpg';

module.exports = function(db) {

  function _validate(game) {

  }

  function get(req, res) {
    var page = req.query.page || 0;

    var games = _.chain(db('games'))
      .sortBy(function(game) {
        return -game.likes || (game.postDate - 0);
      })
      .slice(page * PAGE_SIZE)
      .take(PAGE_SIZE);

    res.json({
      result: games
    });
  }

  
  function post(req, res) {
    var user = req.user;
	/*	
    if (!user) {
      res.status(401)
        .json('User not authorized');
      return;
    }
	*/	
    var game = req.body;
	/*	
    var validationError = _validate(game);
    if (validationError) {
      res.status(400)
        .json(validationError.message);
      return;
    }
	*/	
	
	if (!!user) {
		game.userId = user.id;
	} // added by mimi
	
	game.userName = game.userName; // added by mimi

//    game.likes = 0;
//    game.dislikes = 0;
    game.img = game.img || DEFAULT_GAME_IMAGE;
    game.shareDate = new Date();
	game.points = game.points; // added by mimi
    db('games').insert(game);

    res.json({
      result: game
    });
  }
  

  function put(req, res) {
    var user = req.user;
    if (!user) {
      res.status(401)
        .json('User not authorized');
      return;
    }

    var gameId = req.params.id;
    var game = db('games').find({
      id: gameId
    });

    if (!game) {
      res.status(404)
        .json('Invalid game ID');
      return;
    }
    var type = req.body.type;
    if (['like', 'dislike'].indexOf(type) < 0) {
      res.status(400)
        .json('Request type must be either "like" or "dislike"');
      return;
    }

    if (req.body.type === 'like') {
      game.likes += 1;
    } else {
      game.dislikes += 1;
    }
    db.save();

    res.json({
      result: game
    });
  }

  return {
    get: get,
    post: post,
    put: put
  };
};
