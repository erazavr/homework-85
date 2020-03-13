const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const config = require('../config');
const Artist = require('../models /Artist');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    if (req.query.id) {
        const artist = await Artist.findOne({_id: req.query.id})
        res.send(artist)
    } else {
        const artists = await Artist.find();
        res.send(artists)
    }

});
router.post('/',upload.single('image'), async (req, res) => {
    const artistData = req.body;

    if (req.file) {
        artistData.image = req.file.filename;
    }

    const artist = new Artist(artistData);

    try {
        await artist.save();
        res.send({id: artist._id})
    } catch (e) {
        return res.status(400).send(e)
    }

});

module.exports = router;