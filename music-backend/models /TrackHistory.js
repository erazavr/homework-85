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
        datetime: {
            type: Date,
            default: Date.now
        },

    },
    { versionKey: false }
);

const History = mongoose.model('History', HistorySchema);

module.exports = History;