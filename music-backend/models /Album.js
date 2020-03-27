const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema(
    {
       name: {
           type: String,
           required: true
       },
       artist: {
           type: mongoose.Schema.Types.ObjectID,
           ref: 'Artist',
           required: true
       },
        user: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
            required: true
        },
        year: {
           type: String,
           required: true
       },
       image: {
           type: String,
           required: true
       },
        published: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {versionKey: false}
);

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;