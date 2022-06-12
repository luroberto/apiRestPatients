const express = require('express');
const UserService = require('../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema  } = require('../schemas/users.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res) => {
  const users = await service.getUsers();
  res.json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.getUserId(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newUser = await service.createUser(body);
  res.json(newUser);
});

// PATCH (con ejemplo de try catch)

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.userUpdate(id, body);
    res.json(user);
  } catch (error) {
    // res.status(404).json({ error: error.message });
    next(error); // este llama al middleware de error
  }
});

// DELETE

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.userDelete(id);
  res.json(rta);
});

module.exports = router;
