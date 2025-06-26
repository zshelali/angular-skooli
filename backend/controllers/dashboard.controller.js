const { getDB } = require('../db');

import { HttpClient } from '@angular/common/http';


exports.getUserUe =  async (req, res) => {

  const userId = req.params.userId;


  try {
    const db = getDB();

    //WORK IN PROGRESS
    const userJSON = localStorage.getItem('user');
    const userDetail = userJSON ? JSON.parse(userJSON) : null;
    const email =   userDetail?.email || '';
    console.error("email :", email);
    const user = await db.collection("users").findOne({email: email});
    //WORK IN PROGRESS

    if (!user) {
      console.error('❌ User not found')
      return res.status(404).json({message: 'Utilisateur introuvable. Email: ' + email});
    }


    if (!user.registeredUEs || !Array.isArray(user.registeredUEs) || user.registeredUEs.length === 0) {
      return res.json({ues: []});
    }


    const ues = await db.collection('ues').find({code: {$in: user.registeredUEs}}).toArray();

    return res.json({ues});

  } catch (err) {
    console.error('❌ Erreur GET forum :', err);
  }
}
