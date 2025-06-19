const Ue = require('../model/Ue');

async function getAllUes(req, res) {
    try {
        const ues = await Ue.find().sort({ date_updated: -1 });
        res.json(ues);
    } catch (err) {
        console.error('❌ Erreur récupération UE :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
}

async function createUe(req, res) {
    try {
        const { title, description, image } = req.body;
        const newUe = new Ue({ title, description, image });
        await newUe.save();
        res.status(201).json(newUe);
    } catch (err) {
        console.error('❌ Erreur création UE :', err);
        res.status(500).json({ message: 'Erreur création', error: err });
    }
}

module.exports = { getAllUes, createUe };