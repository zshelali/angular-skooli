const { getDB } = require('../db');




 async function getUserUe (req, res)  {
  try {
    const db = getDB();


    const emailUser = req.params.email;
    const user = await db.collection("users").findOne({email:  emailUser});


    if (!user) {
      console.error('❌ User not found' );
      return res.status(404).json({message: 'Utilisateur introuvable.'});
    }
    console.log(user.registeredUEs);

    if (!user.registeredUEs || !Array.isArray(user.registeredUEs) || user.registeredUEs.length === 0) {
      return res.json({ues: []});
    }

    const codes = (user.registeredUEs || []).map(ue => ue.code)

    const ues = await db.collection('ues').find({code: {$in: codes}}).toArray();
    for(let ue of ues) {
      console.log(ue);
    }
    return res.json(ues);

  } catch (err) {
    console.error('❌ Erreur GET forum :', err);
  }
}

async function addUserUe(req, res) {
  try {
    const db = getDB();
    const newCode = req.params.codeUe;
    const userEmail = req.body;
    const user = await db.collection("users").updateOne({ email: userEmail }, { $push: { registeredUes: {code: newCode} } } );
    res.json({message: 'RegisteredUes updated.'});
  }catch(error) {
    res.status(500).json({message: "Erreur serveur", error})
  }
}

module.exports = {getUserUe, addUserUe}
