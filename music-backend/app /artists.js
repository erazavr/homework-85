const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
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
        const artist = await Artist.findOne({_id: req.query.id});
        res.send(artist)
    } else {
        const artists = await Artist.find();
        res.send(artists)
    }

});
router.post('/',[auth, upload.single('image')], async (req, res) => {
    const artistData = req.body;

    if (req.file) {
        artistData.image = req.file.filename;
    }
    artistData.user = req.user._id;
    const artist = new Artist(artistData);

    try {
        await artist.save();
        res.send(artist)
    } catch (e) {
        return res.status(400).send(e)
    }

});

router.post('/:id/published', [auth, permit('admin')], async (req ,res) => {
   try {
       const artist = await Artist.findById(req.params.id);
       if(!artist) {
           res.status(400).send({message: "Artist not found"})
       }
       artist.published = !artist.published;
       await artist.save();
       return res.send(artist)
   } catch (error) {
       res.status(500).send(error)
   }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Artist.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;