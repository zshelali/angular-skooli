const express = require("express");
const router = express.Router();
const devoirController = require("../controllers/devoir.controller");

// Étudiant : soumettre un devoir
router.post("/", devoirController.submitDevoir);

// Enseignant : récupérer tous les devoirs d'une UE
router.get("/:ueCode", devoirController.getDevoirsByUe);

// Enseignant : noter un devoir
router.patch("/:id", devoirController.gradeDevoir);

module.exports = router;