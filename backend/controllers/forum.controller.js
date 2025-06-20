const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

exports.getForums = async(req, res) => {
    try {
        const db = getDB();
        const forums = await db.collection('forums').find().toArray();
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
            creator: req.body.creator,
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
    try {
        const db = getDB();
        const { id, topicIndex } = req.params;
        const message = {
            text: req.body.text,
            author: req.body.author,
            createdAt: new Date()
        };

        const result = await db.collection('forums').updateOne({ _id: new ObjectId(id) }, {
            $push: {
                [`topics.${topicIndex}.messages`]: message
            }
        });

        if (result.modifiedCount === 1) {
            res.json({ message: 'Message ajouté' });
        } else {
            res.status(404).json({ message: 'Forum non trouvé' });
        }
    } catch (err) {
        console.error('Erreur ajout message :', err);
        res.status(500).json({ message: 'Erreur ajout message', error: err });
    }
};