const router = require('express').Router();

const UserController = require('../controllers/UserController');

// Caminho
router.post('/register', UserController.register);

module.exports = router;
