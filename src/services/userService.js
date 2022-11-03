/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const UserModel = require('../models/modelUser.js');

class UserService {

  async find() {
    let usersDB = await UserModel.find();
    if (usersDB.length == 0) { throw boom.notFound('Users Not Found DB'); }
    return usersDB;
  } 
  async findOne(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch(e) {
      throw boom.notFound(e + ' ID No Registrado - Argument passed in must be' +
      ' a string of 12 bytes or a string of 24 hex characters or an integer');
    }
  }
  async createUser(data) {
    const query = { Identificacion: data.Identificacion };
    const userDB = await UserModel.find(query);
    if (!userDB.length) {
      const newUser = await UserModel.create(data);
      return newUser;
    }
    throw boom.conflict(`El usuario con ID ${data.Identificacion} Ya se encuentra registrado`);
  }
}

module.exports = UserService;