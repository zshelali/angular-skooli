const express = require('express');
const router = express.Router();
const Ue = require('../model/Ue');

router.get('/', async(req, res) => {
    const ues = await Ue.find().sort({ date_updated: -1 });
    res.json(ues);
});

router.post('/', async(req, res) => {
    const { title, description, image } = req.body;
    const newUe = new Ue({ title, description, image });
    await newUe.save();
    res.status(201).json(newUe);
});

module.exports = router;