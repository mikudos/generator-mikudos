const gameGroups = require('./game-groups.model');
const games = require('./game.model');

module.exports = function (app) {
    app.context.models.gameGroups = gameGroups(app);
    app.context.models.games = games(app);
}