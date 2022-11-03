/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const UserModel = require('../models/modelUser.js');

class UserService {

  // constructor() {
  //   this.users;
  // }

  async find() {
    let usersDB = await UserModel.find();
    if (usersDB) { return usersDB; }
    // else { throw boom.notFound('Users Not Found DB'); }
    else { boom.notFound('Users Not Found DB'); }
  }
  async findOne(id) {
    const user = await UserModel.findById(id);
    if (user.length == 0) { throw boom.notFound(`ID ${id} Not Found`); }
    else { return user; }
  }
  async createUser(data) {
    const query = { Identificacion: data.Identificacion };
    const userDB = await UserModel.find(query);
    if (userDB.length == 0) {
      const newUser = await UserModel.create(data);
      return newUser;
    } else { throw boom.conflict(`El usuario con ID ${data.Identificacion} Ya se encuentra registrado`); }
  }
}

module.exports = UserService;