const faker = require('faker');
const boom = require('@hapi/boom');

class OfficesService {
  constructor() {
    this.offices = [];
    this.generated();
  }

  generated() {
    const limit = 2;
    for (let i = 0; i < limit; i++) {
      this.offices.push({
        id: faker.random.uuid(),
        name: faker.name.findName(),
      });
    }
  }

  async getOffices() {
    return this.offices;
  }

  async getOfficeId(id) {
    const officeId = this.offices.find((office) => office.id === id);
    if (!officeId) {
      throw boom.notFound('Office not found');
    }
    return officeId;
  }

  async createOffice(office) {
    const newOffice = {
      id: faker.random.uuid(),
      ...office,
    };
    this.offices.push(newOffice);
    return newOffice;
  }

  async officeUpdate(id, changes) {
    const index = this.offices.findIndex((office) => office.id === id);
    if (index === -1) {
      // throw new Error('Office not found');
      throw boom.notFound('Office not found');
    }
    const office = this.offices[index];
    this.offices[index] = {
      ...office,
      ...changes,
    };
    return this.offices[index];
  }

  async officeDelete(id) {
    const index = this.offices.findIndex((office) => office.id === id);
    if (index === -1) {
      // throw new Error('Office not found');
      throw boom.notFound('Office not found');
    }
    const office = this.offices[index];
    this.offices.splice(index, 1);
    return {message: `Office ${id} deleted successfully`};
  }

}

module.exports = OfficesService;
