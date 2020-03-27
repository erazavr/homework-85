const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        album: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Album',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
            required: true
        },
        duration: Number,
        number: Number,
        video: String,
        published: {
            type: Boolean,
            required: true,
            default: false
        },

    },
    {versionKey: false},


 );

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;