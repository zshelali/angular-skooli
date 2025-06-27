
const { getDB } = require('../db');

async function getAllUes(req, res) {
  try {
    const db = await getDB();
    const ues = await db
      .collection("ues")
      .find()
      .sort({ updatedAt: -1 })
      .toArray();
    res.json(ues);
  } catch (err) {
    console.error("Error fetching UEs:😢", err);
    res.status(500).json({ error: "Failed to fetch UEs (server😡)" });
  }
}

async function createUe(req, res) {
  try {
    const { code, name, description, credits, illustration } = req.body;

    const newUe = {
      code,
      name,
      description,
      credits,
      illustration,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const db = await getDB();
    const result = await db.collection("ues").insertOne(newUe);
    res.status(201).json({ _id: result.insertedId, ...newUe });
  } catch (err) {
    console.error("Error creating UE:😢", err);
    res.status(500).json({ error: "Failed to create UE (server😡)" });
  }
}

async function getCurrentUe(req, res) {
  try {
    const db = getDB();
    const codeUE = req.params.id;
    console.log(codeUE);
    const ue = await db.collection("ues").findOne({ code: codeUE });
    console.log(ue);
    res.json(ue);
  } catch (err) {
    console.error('❌ Erreur récupération information UE :', err);
    res.status(500).json({message: 'Erreur serveur', error: err });
  }
}

module.exports = { getAllUes, createUe, getCurrentUe };
