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
        duration: Number,
        number: Number
    },
    {versionKey: false}
 );

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;