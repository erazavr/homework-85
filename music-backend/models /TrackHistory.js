const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        track: {
            type: String,
            required: true
        },
        trackName: {
            type: String,
            required: true
        },
        artist: {
          type: String,
          required: true
        },
        datetime: String,

    },
    { versionKey: false }
);
HistorySchema.methods.date = function () {
    this.datetime = new Date().toLocaleString()
};

const History = mongoose.model('History', HistorySchema);

module.exports = History;