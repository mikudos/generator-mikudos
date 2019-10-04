// gameGroups-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const mongooseClient = app.mongooseClient;
    const { Schema } = mongooseClient;
    const gameGroups = new Schema({
        text: { type: String, required: true }
    }, {
        timestamps: true
    });

    return mongooseClient.model('gameGroups', gameGroups);
};
