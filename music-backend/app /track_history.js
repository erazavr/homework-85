const express = require('express');
const auth = require('../middleware/auth');
const Track_History = require('../models /TrackHistory');
const Track = require('../models /Track');
const Album = require('../models /Album');
const Artist = require('../models /Artist');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    const history = await Track_History.find({user: req.user._id}).sort({datetime: -1});
    res.send(history)
});
router.post('/' ,auth,async (req, res) => {
    const trackHistory = new Track_History(req.body);
    try {
        const track = await Track.find({_id: req.body.track});
        const album = await Album.find({_id: track[0].album});
        const artist = await Artist.find({_id: album[0].artist});
        if (!trackHistory.user) {
            trackHistory.user = req.user._id
        }
        trackHistory.artist = artist[0].name;
        trackHistory.trackName = track[0].name;
        trackHistory.date();
        await trackHistory.save();
        return res.send(trackHistory)
    } catch (error) {
        res.status(400).send(error)
    }

});

module.exports = router;