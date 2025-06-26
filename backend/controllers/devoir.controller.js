const { getDB } = require('../db');

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
            path: fichier.path,
            dateSoumission: new Date()
        };

        const result = await db.collection("devoirs").insertOne(devoir);

        res.status(201).json(result.ops ?.[0] || devoir);
    } catch (err) {
        console.error("❌ Erreur enregistrement devoir :", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};