const Pet = require('../models/Pets');

// Helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class PetController {
  // Create a pet ----------------------------------
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    // Deixar disponivel
    const available = true;

    const images = req.files;

    // images upload

    // validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatorio!' });
      return;
    }
    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatorio!' });
      return;
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatorio!' });
      return;
    }
    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatorio!' });
      return;
    }

    console.log(images);

    if (images.length === 0) {
      res.status(422).json({ message: 'A imagem é obrigatorio!' });
      return;
    }

    // get pet ownwe (pega o dono do pet)
    const token = getToken(req);
    const user = getUserByToken(token);

    // create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: 'Pet criado com sucesso!',
        newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  // getAll------------------------------------
  static async getAll(req, res) {
    // Mostrar os Pets mais novos
    const pets = await Pet.find().sort('-createdAt');

    res.status(200).json({
      pets: pets,
    });
  }
};
