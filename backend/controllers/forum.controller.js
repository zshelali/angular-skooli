const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.getForums = async(req, res) => {
    try {
        const db = getDB();
        const ueId = req.params.id;
        const forums = await db.collection('forums').find({ueCode: ueId}).toArray();
        res.json(forums);
    } catch (err) {
        console.error('Erreur récupération forums :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
};

exports.createForum = async(req, res) => {
    try {
        const db = getDB();
        const forum = {
            ueCode: req.body.ueCode,
            title: req.body.title,
            creatorName: req.body.creatorName,
            creatorEmail: req.body.creatorEmail,
            messages: [],
            createdAt: new Date()
        };
        const result = await db.collection('forums').insertOne(forum);
        res.status(201).json(result.ops ?.[0] || forum);
    } catch (err) {
        console.error('❌ Erreur POST forum :', err);
        res.status(500).json({ message: 'Erreur ajout forum', error: err });
    }
};


exports.addMessageToForum = async(req, res) => {
    const db = getDB();
    const forumId = req.params.id;

    const message = {
        text: req.body.text,
        authorName: req.body.authorName,
        authorEmail: req.body.authorEmail,
        createdAt: new Date()
    };

    const result = await db.collection('forums').updateOne({ _id: new ObjectId(forumId) }, { $push: { messages: message } });

    if (result.modifiedCount === 1) {
        res.json({ message: 'Message ajouté avec succès' });
    } else {
        res.status(404).json({ message: 'Forum non trouvé' });
    }
};
