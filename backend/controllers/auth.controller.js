const {getDB} = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// receive the http request
async function authController(req, res) {

  try {
    // extract email and password
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: 'Email and password required.'});
    }

    // connect to db
    const db = getDB();

    // search for user with that email
    const user = await db.collection('users').findOne({email});

    if (!user) {
      return res.status(404).json({message: 'Invalid credentials.'}); //user not found
    }

    // compare passwords using bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({message: 'Invalid credentials.'}) //invalid password
    }

    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '1h'} //⛔️⛔️⛔️change this!!!!!
    );

    // send a success response, stripped out password
    const {password: _, ...userData} = user;
    return res.status(200).json({
      message: 'Login successful.🗡️', 
      user:userData,
      token: token
    })

  }
  // catch errors
  catch (err) {
    // of course this project will never leave development, but best practices are better learned early...
    if (process.env.NODE_ENV === 'development') {
      console.error('Login error:', err);
    }
    return res.status(500).json({message: 'Internal server error'})
  }


}

module.exports = authController;