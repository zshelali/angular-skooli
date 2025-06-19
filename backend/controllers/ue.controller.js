const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

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

async function updateUe(req, res) {
  const ueId = req.params.id;
  const updateData = req.body;

  if (!ObjectId.isValid(ueId)) {
    return res.status(400).json({ error: "Invalid UE ID" });
  }
  updateData.updatedAt = new Date();

  try {
    const db = await getDB();
    const result = await db
      .collection("ues")
      .findOneAndUpdate(
        { _id: new ObjectId(String(ueId)) },
        { $set: updateData },
        { returnDocument: "after" }
      );
    if (!result.value) {
      return res.status(404).json({ error: "UE not found😤" });
    }

    res.json(result.value);
  } catch (err) {
    console.error("Error updating UE:😢", err);
    res.status(500).json({ error: "Failed to update UE (server😡)" });
  }
}

async function deleteUe(req, res) {
  const ueId = req.params.id;
  if (!ObjectId.isValid(ueId)) {
    return res.status(400).json({ error: "Invalid UE ID" });
  }
  try {
    const db = await getDB();
    const result = await db
      .collection("ues")
      .deleteOne({ _id: new ObjectId(String(ueId)) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "UE not found😤" });
    }

    res.json({ message: "UE deleted successfully" });
  } catch (err) {
    console.error("Error deleting UE:😢", err);
    res.status(500).json({ error: "Failed to delete UE (server😡)" });
  }
}

module.exports = {
  getAllUes,
  createUe,
  updateUe,
  deleteUe,
};
