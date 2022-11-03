const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const service = new UserService();

router.get('/', async (req, res) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      message: 'Users Not Found',
      error: error
    });
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: `User ID ${id} Not Found`,
      error: error
    });
  }
});
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.createUser(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;