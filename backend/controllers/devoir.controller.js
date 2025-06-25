const { getDB } = require("../db");

// POST /api/devoirs (étudiant soumet un devoir)
exports.submitDevoir = async(req, res) => {
    try {
        const db = getDB();
        const devoir = {
            title: req.body.title,
            description: req.body.description,
            fileUrl: req.body.fileUrl, // chemin ou URL du fichier uploadé
            student: req.body.student,
            ueCode: req.body.ueCode,
            status: "en attente",
            createdAt: new Date()
        };
        const result = await db.collection("devoirs").insertOne(devoir);
        res.status(201).json(result.ops ? result.ops[0] : devoir);
    } catch (err) {
        console.error("❌ Erreur envoi devoir :", err);
        res.status(500).json({ message: "Erreur envoi devoir", error: err });
    }
};

// GET /api/devoirs/:ueCode (enseignant récupère les devoirs de l'UE)
exports.getDevoirsByUe = async(req, res) => {
    try {
        const db = getDB();
        const devoirs = await db.collection("devoirs")
            .find({ ueCode: req.params.ueCode })
            .toArray();
        res.json(devoirs);
    } catch (err) {
        console.error("❌ Erreur récupération devoirs :", err);
        res.status(500).json({ message: "Erreur récupération devoirs", error: err });
    }
};

// PATCH /api/devoirs/:id (enseignant note un devoir)
exports.gradeDevoir = async(req, res) => {
    const { note, commentaire } = req.body;
    const { id } = req.params;
    try {
        const db = getDB();
        const result = await db.collection("devoirs").updateOne({ _id: new require("mongodb").ObjectId(id) }, {
            $set: {
                note,
                commentaire,
                status: "corrigé"
            }
        });
        res.json({ success: result.modifiedCount === 1 });
    } catch (err) {
        console.error("❌ Erreur notation devoir :", err);
        res.status(500).json({ message: "Erreur notation devoir", error: err });
    }
};