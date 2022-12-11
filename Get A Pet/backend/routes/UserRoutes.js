const router = require('express').Router();
const UserController = require('../controllers/UserController');

// middlewares
const verifyToken = require('../helpers/check-token');
const { imageUpload } = require('../helpers/image-upload');

// Rotas
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
// pegar user pelo id
router.get('/:id', UserController.getUserById);
// Edit user (patch rota de atualização)
router.patch(
  '/edit/:id',
  verifyToken,
  imageUpload.single('image'),
  UserController.editUser
);

module.exports = router;
