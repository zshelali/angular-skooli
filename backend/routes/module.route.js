const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

// GET /api/modules
router.get('/', async(req, res) => {
    try {
        const db = getDB();
        const modules = await db.collection('modules').find().toArray();
        res.json(modules);
    } catch (err) {
        console.error('❌ Erreur GET modules :', err);
        res.status(500).json({ message: 'Erreur serveur 😥', error: err });
    }
});

// POST /api/modules
router.post('/', async(req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('modules').insertOne(req.body);
        res.status(201).json(result.ops ? result.ops[0] : req.body); // pour compatibilité
    } catch (err) {
        console.error('❌ Erreur POST module :', err);
        res.status(500).json({ message: 'Erreur ajout', error: err });
    }
});

module.exports = router;