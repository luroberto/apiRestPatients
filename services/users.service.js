const faker = require('faker');
const boom = require('@hapi/boom');

class UserService {
  constructor() {
    this.users = [];
    this.generated();
  }

  generated() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: faker.image.imageUrl(),
      });
    }
  }

  // emulacion de un retraso en la respuesta para probar el asincronismo
  async getUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 1000);
    });
    // return this.users;
  }

  async getUserId(id) {
    const userId = this.users.find((user) => user.id === id);
    if (!userId) {
      throw boom.notFound('User not found');
    }
    return userId;
  }

  async createUser(user) {
    const newUser = {
      id: faker.random.uuid(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  async userUpdate(id, changes) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      // throw new Error('User not found');
      throw boom.notFound('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async userDelete(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { message: `User ${id} deleted successfully` };
  }
}

module.exports = UserService;
