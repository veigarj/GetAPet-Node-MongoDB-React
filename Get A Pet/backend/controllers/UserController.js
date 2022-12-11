// Chamar o modulo
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

// function register ----------------------------------------------------
module.exports = class UserController {
  static async register(req, res) {
    // com destructuri da requisição
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatorio' });
      return;
    }
    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatorio' });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatorio' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'O senha é obrigatorio' });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatoria' });
      return;
    }
    // check if Password e confirmPassword
    if (password !== confirmpassword) {
      res.status(422).json({
        message: 'A senha e a confirmação de senha precisam ser iguais',
      });
      return;
    }

    // check if user exists = verifica se user ja exist via email
    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      res.status(422).json({
        message: 'Por favor, utilize outro e-mail',
      });
      return;
    }

    // Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a user
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // Login ------------------------------------------------------
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatorio' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatorio' });
      return;
    }
    // check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({
        message: 'não há usuario cadastrado com este e-mail!',
      });
      return;
    }

    // check if password math with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({
        message: 'Senha invalida!',
      });
      return;
    }

    await createUserToken(user, req, res);
  }

  // function Verify User Logado token-------------------------------------
  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'nossosecret');

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }

  // pegar user pelo id --------------------------------------------
  static async getUserById(req, res) {
    // pegar o params id
    const id = req.params.id;
    // encontrar
    // Remove password com .select('-password')
    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(422).json({
        message: 'Usuario não encontrado!',
      });
      return;
    }
    res.status(200).json({ user });
  }

  // Function editUser ------------------------------------------------
  static async editUser(req, res) {
    const token = getToken(req);

    const user = await getUserByToken(token);

    const { name, email, phone, password, confirmpassword } = req.body;

    let image = '';

    if (req.file) {
      user.image = req.file.filename;
    }

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' });
      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' });
      return;
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
      return;
    }

    user.email = email;

    if (image) {
      const imageName = req.file.filename;
      user.image = imageName;
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' });
      return;
    }

    user.phone = phone;

    // check if password match
    if (password != confirmpassword) {
      res.status(422).json({ error: 'As senhas não conferem.' });

      // change password
    } else if (password == confirmpassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12);
      const reqPassword = req.body.password;

      const passwordHash = await bcrypt.hash(reqPassword, salt);

      user.password = passwordHash;
    }

    try {
      // returns updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};
