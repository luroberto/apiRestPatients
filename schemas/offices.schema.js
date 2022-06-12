const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(30);

const createOfficeSchema = joi.object({
  name: name.required(),
});

const updateOfficeSchema = joi.object({
  name: name,
});

const getOfficeSchema = joi.object({
  id: id.required(),
});

module.exports = {createOfficeSchema, updateOfficeSchema, getOfficeSchema};

