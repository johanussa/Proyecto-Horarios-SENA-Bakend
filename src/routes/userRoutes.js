const express = require('express');
const router = express.Router();
const UserService = require('../services/UserService');

const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
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
router.patch('/', async (req, res, next) => {
  try {
    const { _id } = req.body;
    const userUpdate = await service.update(_id, req.body);
    res.status(200).json(userUpdate);
  } catch (error) {
    next(error);
  }
});
router.delete('/', async (req, res, next) => {
  try {
    const { _id } = req.body;
    const userDelete = await service.delete(_id);
    res.status(200).json(userDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;