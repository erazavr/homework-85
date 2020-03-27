const path = require('path');

const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const config = require('../config');
const Album = require('../models /Album');

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
    let albums;
    if (req.query.artist) {
        albums = await Album.find({artist: req.query.artist}).populate('artist').sort({year: 1});
    } else {
        albums = await Album.find().sort({year: 1});
    }
   res.send(albums)
});
router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');
        if (!album) {
            return res.status(404).send({message: 'Not found'});
        }
        res.send(album);

    } catch (e) {
        res.status(400).send({message: "Not found"})
    }
});
router.post('/', [auth, upload.single('image')],async (req, res) => {
    const albumData = req.body;

    if (req.file) {
        albumData.image = req.file.filename;
    }
    albumData.user = req.user._id;
    const album = new Album(albumData);

    try {
        await album.save();
        res.send({id: album._id})
    } catch (e) {
        return res.status(400).send(e)
    }
});

router.post('/:id/published', [auth, permit('admin')], async (req ,res) => {
    try {
        const album = await Album.findById(req.params.id);
        if(!album) {
            res.status(400).send({message: "Artist not found"})
        }
        album.published = !album.published;
        await album.save();
        return res.send(album)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const task = await Album.findById(req.params.id);
        if (!task) {
            res.status(400).send({error: "Wrong Id"})
        } else {
            await Album.deleteOne({_id: req.params.id});
            return res.send({message: 'Deleted'})
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;