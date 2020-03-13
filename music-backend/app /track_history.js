const express = require('express');

const Track_History = require('../models /TrackHistory');
const Users = require('../models /User');

const router = express.Router();

router.post('/', async (req, res) => {
    const trackHistory = new Track_History(req.body);
    const authorizationHeader = req.get('Authorization');
    if (!authorizationHeader) {
        return res.status(401).send({error: "No authorization header"})
    }
    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Token' || !token) {
        return res.status(401).send({error: "Authorizations type wrong or token not present"})
    }
    const user = await Users.findOne({token});
    if (!trackHistory.user) {
        trackHistory.user = user._id
    }
    if (!user) {
        return res.status(401).send({error: "No user found with this token. Token incorrect"})
    }
    try {
        await trackHistory.save();
        return res.send(trackHistory)
    } catch (error) {
        res.status(400).send(error)
    }

});

module.exports = router;