const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema(
    {
      name: {
          type: String,
          required: true
      },
      user: {
          type: mongoose.Schema.Types.ObjectID,
          ref: 'User',
          required: true
      },
      image: String,
      info: String,
      published: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    { versionKey: false }
    );
const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
