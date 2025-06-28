const { getDB } = require("../db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

async function getAllUsers(req, res) {
  try {
    const db = getDB();
    const users = await db
      .collection("users")
      .find()
      .sort({ updatedAt: -1 })
      .toArray();
    
    // Remove passwords from all users in response
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.json(usersWithoutPasswords);
  } catch (err) {
    console.error("Error fetching users:😢", err);
    res.status(500).json({ error: "Failed to fetch users (server😡)" });
  }
}

async function createUser(req, res) {
  try {
    console.log('🔍 Backend received user data:', req.body);
    const { firstName, lastName, email, password, role, registeredUEs } = req.body;

    // Check if password is provided
    if (!password) {
      console.log('❌ No password provided in request');
      return res.status(400).json({ error: "Password is required" });
    }

    console.log('🔍 Password provided:', password ? 'YES' : 'NO');
    console.log('🔍 Registered UEs:', registeredUEs);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      registeredUEs: registeredUEs || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('🔍 User object to save (with hashed password):', {
      ...newUser,
      password: '[HASHED]'
    });

    const db = getDB();
    const result = await db.collection("users").insertOne(newUser);
    
    // Return the complete created user object (without password)
    const createdUser = await db.collection("users").findOne({ _id: result.insertedId });
    
    // Remove password from response
    delete createdUser.password;
    
    console.log('✅ User created and returning:', createdUser);
    res.status(201).json(createdUser);
  } catch (err) {
    console.error("Error creating user:😢", err);
    res.status(500).json({ error: "Failed to create user (server😡)" });
  }
}

async function updateUser(req, res) {
  console.log('🔍 Update user called with ID:', req.params.id);
  console.log('🔍 Request body:', req.body);

  const userId = req.params.id;
  const updateData = { ...req.body }; // Create a copy to avoid mutation

  // Remove _id from updateData to avoid MongoDB conflicts
  delete updateData._id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  // Hash password if provided
  if (updateData.password && updateData.password.trim() !== '') {
    console.log('🔍 Password provided for update:', updateData.password);
    console.log('🔍 Hashing password...');
    try {
      updateData.password = await bcrypt.hash(updateData.password, 10);
      console.log('🔍 Password hashed successfully');
    } catch (hashError) {
      console.error('❌ Error hashing password:', hashError);
      return res.status(500).json({ error: "Failed to hash password" });
    }
  } else {
    console.log('🔍 No password provided for update, keeping current password');
    // Remove empty password field to avoid overwriting with empty string
    delete updateData.password;
  }

  // Handle registeredUEs
  if (updateData.registeredUEs !== undefined) {
    console.log('🔍 Updating registered UEs:', updateData.registeredUEs);
    updateData.registeredUEs = updateData.registeredUEs || [];
  }

  updateData.updatedAt = new Date();
  console.log('🔍 Final update data:', { ...updateData, password: updateData.password ? '[HASHED]' : 'NOT_PROVIDED' });

  try {
    const db = getDB();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: updateData },
        { returnDocument: "after" }
      );

    if (!result) {
      return res.status(404).json({ error: "User not found😤" });
    }

    // Remove password from response
    delete result.password;

    console.log('✅ User updated successfully:', result);
    res.json(result);
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
    const db = getDB();
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(userId) });

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

module.exports = { getAllUsers, getSpecificUser, createUser, updateUser, deleteUser };