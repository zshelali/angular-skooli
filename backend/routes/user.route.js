const express = require('express');
const router = express.Router();
const { getDB } = require('../db');

router.get('/', async(req, res) => {
    try {
        const db = getDB();
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (err) {
        console.error('Erreur GET /users :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
});

module.exports = router;