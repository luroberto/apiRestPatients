const express = require('express');
const OfficesService = require('../services/offices.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOfficeSchema,
  updateOfficeSchema,
  getOfficeSchema,
} = require('../schemas/offices.schema');
const e = require('express');

const router = express.Router();
const service = new OfficesService();

router.get('/', async (req, res) => {
  const offices = await service.getOffices();
  res.json(offices);
});

// POST

router.post(
  '/',
  validatorHandler(createOfficeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOffice = await service.createOffice(body);
      res.json(newOffice);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getOfficeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const office = await service.getOfficeId(id);
      res.json(office);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH

router.patch(
  '/:id',
  validatorHandler(getOfficeSchema, 'params'),
  validatorHandler(updateOfficeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const office = await service.officeUpdate(id, body);
      res.json(office);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.officeDelete(id);
  res.json(rta);
});

module.exports = router;
