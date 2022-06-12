const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(30);
const email = joi.string().email();
const avatar = joi.string().uri();

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  avatar,
});

const updateUserSchema = joi.object({
  name: name,
  email: email,
  avatar,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema};
