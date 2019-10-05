const games = require('./game.model');

module.exports = function (app) {
    app.context.models.games = games(app);
}