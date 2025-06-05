const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/role.middleware');

router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({message: 'Welcome in the admin-only zone.'})
});

// TEST, CHANGE IT
router.get('/student-or-admin', verifyToken, authorizeRoles('student', 'admin'), (req, res) => {
    res.json({ message: `Hello ${req.user.role}, you may access this.` });
  });

module.exports = router;