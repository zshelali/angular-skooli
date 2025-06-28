const { getDB } = require('../db');

async function getAllModules(req, res) {
    try {
        const db = getDB();
        const code = req.params.code;
        const modules = await db.collection('modules').find({codeUe: code}).sort({updatedAt: -1}).toArray();
        res.json(modules);
    } catch (err) {
        console.error('❌ Erreur GET modules :', err);
        res.status(500).json({ message: 'Erreur serveur 😥', error: err });
    }
}

async function createModule(req, res) {
    try {
        const db = getDB();
        const result = await db.collection('modules').insertOne(req.body);
        res.status(201).json(result.ops ? result.ops[0] : req.body); // MongoDB v4 fallback
    } catch (err) {
        console.error('❌ Erreur POST module :', err);
        res.status(500).json({ message: 'Erreur ajout', error: err });
    }
}

module.exports = {
    getAllModules,
    createModule
};
