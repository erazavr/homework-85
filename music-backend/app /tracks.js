const express = require('express');

const Track = require('../models /Track');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.album) {
        const tracks = await Track.find({album: req.query.album}).populate('album').sort({number: 1});
        res.send(tracks)
    } else if (req.query.artist){
        let result = [];
        const tracks = await Track.find().populate('album');
        for (let i = 0; i < tracks.length; i++) {
            let albumArtist = tracks[i].album.artist;
            if (String(albumArtist) === req.query.artist) {
                result.push(tracks[i])
            }
        }
        res.send(result)
    } else {
        const tracks = await Track.find().sort({number: 1});
        res.send(tracks)
    }
});
router.post('/', async (req, res) => {
   const track = new Track(req.body);
    try {
       await track.save();
       return res.send({id: track._id})
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router;