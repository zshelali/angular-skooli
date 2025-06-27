const { getDB } = require('../db');
const path = require('path');
const { ObjectId } = require('mongodb');

exports.submitDevoir = async(req, res) => {
    try {
        const db = getDB();

        const { titre, etudiant } = req.body;
        const fichier = req.file;

        if (!titre || !etudiant || !fichier) {
            return res.status(400).json({ message: "Champs manquants dans la requête." });
        }

        const devoir = {
            titre,
            etudiant: JSON.parse(etudiant),
            nomFichier: fichier.originalname,
            path: `/uploads/devoirs/${fichier.filename}`, // ✅ chemin HTTP exploitable
            dateSoumission: new Date()
        };

        const result = await db.collection("devoirs").insertOne(devoir);

        res.status(201).json(result.ops ?.[0] || devoir);
    } catch (err) {
        console.error("❌ Erreur enregistrement devoir :", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.getAllDevoirs = async(req, res) => {
    try {
        const db = getDB();
        const devoirs = await db.collection("devoirs").find().toArray();
        res.json(devoirs);
    } catch (err) {
        console.error("❌ Erreur récupération devoirs :", err);
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};

exports.noterDevoir = async(req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;
        const { note, commentaire } = req.body;

        const result = await db.collection("devoirs").updateOne({ _id: new ObjectId(id) }, { $set: { note, commentaire, etat: "corrigé" } });

        if (result.modifiedCount === 1) {
            res.json({ message: "✅ Devoir noté avec succès" });
        } else {
            res.status(404).json({ message: "❌ Devoir introuvable" });
        }
    } catch (err) {
        console.error("❌ Erreur notation :", err);
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
};