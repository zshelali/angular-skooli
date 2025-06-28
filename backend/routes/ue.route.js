const express = require('express');
const router = express.Router();


const { getAllUes, createUe, updateUe, deleteUe, getCurrentUe } = require('../controllers/ue.controller');
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/assets/img/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});


router.get('/:id', getCurrentUe);
router.get('/', getAllUes);

router.post('/', upload.single('image'), createUe);
router.put('/:id', updateUe);
router.delete('/:id', deleteUe);

module.exports = router;



