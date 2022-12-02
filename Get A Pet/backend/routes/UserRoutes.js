const router = require('express').Router();

const UserController = require('../controllers/UserController');

// middlewares
const verifyToken = require('../helpers/verify-token');

// Rotas
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
// pegar user pelo id
router.get('/:id', UserController.getUserById);
// Edit user
router.patch('/edit/:id', verifyToken, UserController.editUser);

module.exports = router;
