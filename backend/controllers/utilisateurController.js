const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/Utilisateur');

// Fonction pour créer un nouvel utilisateur (Inscription)
exports.inscriptionUtilisateur = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    // Vérifiez si l'email est déjà utilisé
    const utilisateurExistant = await Utilisateur.findOne({ where: { email } });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hash du mot de passe
    const hashMotDePasse = await bcrypt.hash(motDePasse, 10);

    // Création de l'utilisateur
    const nouvelUtilisateur = await Utilisateur.create({
      nom,
      email,
      motDePasse: hashMotDePasse,
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur lors de l\'inscription de l\'utilisateur' });
  }
};

// Fonction pour authentifier un utilisateur (Connexion)
exports.authentificationUtilisateur = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Vérifiez si l'utilisateur existe
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifiez le mot de passe
    const motDePasseCorrect = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
    if (!motDePasseCorrect) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générez le token JWT
    const token = jwt.sign({ id: utilisateur.id, email: utilisateur.email }, 'votre_clé_secrète', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur lors de l\'authentification de l\'utilisateur' });
  }
};

// Fonction pour récupérer un utilisateur par son identifiant
exports.getUtilisateurById = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    } else {
      res.status(200).json(utilisateur);
    }
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
  }
};

// Fonction pour mettre à jour un utilisateur existant
exports.updateUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    } else {
      await utilisateur.update(req.body);
      res.status(200).json(utilisateur);
    }
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};

// Fonction pour supprimer un utilisateur par son identifiant
exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.params.id);
    if (!utilisateur) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    } else {
      await utilisateur.destroy();
      res.status(204).json({ message: 'Utilisateur supprimé avec succès' });
    }
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};
