const express = require('express');
const PatientsService = require('../services/patients.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPatientSchema, updatePatientSchema, getPatientSchema } = require('../schemas/patients.schema');

const router = express.Router();
const service = new PatientsService();

router.get('/', async (req, res) => {
  const patients = await service.getPatients();
  res.json(patients);
});

router.get('/:id',
  validatorHandler(getPatientSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await service.getPatientId(id);
    res.json(patient);
  } catch (error) {
    next(error);
  }
});

// POST

router.post('/',
  validatorHandler(createPatientSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const newPatient = await service.createPatient(body);
    res.json(newPatient);
  } catch (error) {
    next(error);
  }
});

// PATCH

router.patch('/:id',
  validatorHandler(getPatientSchema, 'params'),
  validatorHandler(updatePatientSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const patient = await service.patientUpdate(id, body);
    res.json(patient);
  } catch (error) {
    next(error);
  }
});

// DELETE

router.delete('/:id',
  async (req, res, next) => {
  try {
    const { id } = req.params;
  const rta = await service.patientDelete(id);
  res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
