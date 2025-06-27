const { getDB } = require('../db');

async function getAllUsers(req, res) {
    try {
        const db = getDB();
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (err) {
        console.error('❌ Erreur récupération utilisateurs :', err);
        res.status(500).json({ message: 'Erreur serveur', error: err });
    }
}

async function getSpecificUser(req, res) {
  try {
    const db = getDB();
    const emailUser = req.params.email;
    const user = await db.collection("users").findOne({ email: emailUser });
    res.json(user);
  } catch (err) {
    console.error('❌ Erreur récupération utilisateur :', err);
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
}

module.exports = { getAllUsers, getSpecificUser };
