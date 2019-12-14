// gameGroups-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const mongooseClient = app.mongooseClient;
    const { Schema } = mongooseClient;
    const games = new Schema({
        text: { type: String, required: true }
    }, {
        timestamps: true
    });

    return mongooseClient.model('games', games);
};
