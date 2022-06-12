const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(30);
const email = joi.string().email();
const phone = joi.string().min(3).max(30);
const address = joi.string().min(3).max(30);
const city = joi.string().min(3).max(30);
const state = joi.string().min(3).max(30);
const age = joi.number().min(3).max(100);

const createPatientSchema = joi.object({
  name: name.required(),
  email: email.required(),
  phone: phone.required(),
  address: address.required(),
  city: city,
  state: state,
  age: age,
})

const updatePatientSchema = joi.object({
  name: name,
  email: email,
  phone: phone,
  address: address,
  city: city,
  state: state,
  age: age
})

const getPatientSchema = joi.object({
  id: id.required(),
})

module.exports = {createPatientSchema, updatePatientSchema, getPatientSchema};
