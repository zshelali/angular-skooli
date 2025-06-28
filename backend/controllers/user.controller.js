const { getDB } = require("../db");
const { ObjectId } = require("mongodb");

async function getAllUsers(req, res) {
  try {
    const db = await getDB();
    const users = await db
      .collection("users")
      .find()
      .sort({ updatedAt: -1 })
      .toArray();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:😢", err);
    res.status(500).json({ error: "Failed to fetch users (server😡)" });
  }
}

async function createUser(req, res) {
  try {
    const { name, email, role, profilePicture } = req.body;

    const newUser = {
      name,
      email,
      role,
      profilePicture,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await getDB();
    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json({ _id: result.insertedId, ...newUser });
  } catch (err) {
    console.error("Error creating user:😢", err);
    res.status(500).json({ error: "Failed to create user (server😡)" });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const updateData = req.body;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  updateData.updatedAt = new Date();

  try {
    const db = await getDB();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(String(userId)) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    if (!result.value) {
      return res.status(404).json({ error: "User not found😤" });
    }

    res.json(result.value);
  } catch (err) {
    console.error("Error updating user:😢", err);
    res.status(500).json({ error: "Failed to update user (server😡)" });
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const db = await getDB();
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(String(userId)) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found😤" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:😢", err);
    res.status(500).json({ error: "Failed to delete user (server😡)" });
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
