const faker = require('faker');
const boom = require('@hapi/boom');

class PatientsService {
  constructor() {
    this.patients = [];
    this.generated();
  }

  generated() {
    const limit = 20;
    for (let i = 0; i < limit; i++) {
      this.patients.push({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        age: faker.random.number({ min: 3, max: 100 }),
      });
    }
  }

  async getPatients() {
    return this.patients;
  }

  async getPatientId(id) {
    const patientId = this.patients.find((patient) => patient.id === id);
    if (!patientId) {
      throw boom.notFound('Patient not found');
    }
    return patientId;
  }

  async createPatient(patient) {
    const newPatient = {
      id: faker.random.uuid(),
      ...patient,
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  async patientUpdate(id, changes) {
    const index = this.patients.findIndex((patient) => patient.id === id);
    if (index === -1) {
      throw boom.notFound('Patient not found');
    }
    const patient = this.patients[index];
    this.patients[index] = {
      ...patient,
      ...changes,
    };
    return this.patients[index];
  }

  async patientDelete(id) {
    const index = this.patients.findIndex((patient) => patient.id === id);
    if (index === -1) {
      throw boom.notFound('Patient not found');
    }
    this.patients.splice(index, 1);
    return {message: `Patient ${id} deleted successfully`};
  }

}

module.exports = PatientsService;
