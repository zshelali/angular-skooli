const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const devoirController = require('../controllers/devoir.controller');

// 📁 Config de multer pour stocker les fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'devoirs');
        fs.mkdirSync(uploadPath, { recursive: true }); // crée dossier si non existant
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/', upload.single('file'), devoirController.submitDevoir);
router.get("/", devoirController.getAllDevoirs);
router.patch("/:id", devoirController.noterDevoir);


module.exports = router;