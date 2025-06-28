const { getDB } = require('../db');




 async function getUserUe (req, res)  {
  try {
    const db = getDB();


    const emailUser = req.params.email;
    console.log(emailUser);
    const user = await db.collection("users").findOne({email:  emailUser});
    console.log(user.role);

    if (!user) {
      console.error('❌ User not found' );
      return res.status(404).json({message: 'Utilisateur introuvable.'});
    }

    const codes = (user.registeredUEs || []).map(ue => ue.code)
    let ues = undefined;
    if (user.role === "profadmin" || user.role === "admin") {
      ues = await db.collection("ues").find().toArray();
    }else if (user.role === "student" || user.role === "prof"){
     ues = await db.collection('ues').find({code: {$in: codes}}).toArray();
    }else{
      ues = []
    }


    return res.json(ues);

  } catch (err) {
    console.error('❌ Erreur GET forum :', err);
  }
}

async function addUserUe(req, res) {
  try {
    const db = getDB();
    const userEmail = req.body.email;
    console.log('affichage code : ' + userEmail);
    const newCode = req.body.code;
    console.log('affichage email : ' + newCode);
    const user = await db.collection("users").updateOne({ email: userEmail }, { $push: { registeredUEs: {code: newCode} } } );
    res.json({message: 'RegisteredUes updated.'});
  }catch(error) {
    res.status(500).json({message: "Erreur serveur", error})
  }
}

module.exports = {getUserUe, addUserUe}
