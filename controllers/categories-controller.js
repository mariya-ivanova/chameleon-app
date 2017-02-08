var _ = require('lodash');

module.exports = function(db) {

  function get(req, res) {
    var categories = _.chain(db('games'))
      .map(function(game) {
        return game.category;
      }).uniq()
      .value();
    res.json({
      result: categories
    });
  }

  return {
    get: get
  };
};
