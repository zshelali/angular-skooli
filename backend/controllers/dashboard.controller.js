const { getDB } = require('../db');




exports.getUserUe =  async (req, res) => {
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
