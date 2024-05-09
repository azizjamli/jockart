const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// Route pour l'inscription d'un utilisateur
router.post('/inscription', utilisateurController.inscriptionUtilisateur);

// Route pour l'authentification d'un utilisateur
router.post('/authentification', utilisateurController.authentificationUtilisateur);

// Route pour récupérer un utilisateur par son ID
router.get('/:id', utilisateurController.getUtilisateurById);

// Route pour mettre à jour un utilisateur existant
router.put('/:id', utilisateurController.updateUtilisateur);

// Route pour supprimer un utilisateur par son ID
router.delete('/:id', utilisateurController.deleteUtilisateur);

module.exports = router;
