const express = require('express');

const Track = require('../models /Track');

const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

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

router.post('/', auth, async (req, res) => {
   const track = new Track(req.body);
   track.user = req.user._id;
    try {
       await track.save();
       return res.send({id: track._id})
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/:id/published', [auth, permit('admin')], async (req ,res) => {
    try {
        const track = await Track.findById(req.params.id);
        if(!track) {
            res.status(400).send({message: "Artist not found"})
        }
        track.published = !track.published;
        await track.save();
        return res.send(track)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Track.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;