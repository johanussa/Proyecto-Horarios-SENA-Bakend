/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/modelUser.js');

class UserService {

  async find() {
    let usersDB = await UserModel.find();
    if (usersDB.length == 0) { throw boom.notFound('There are not data in DB'); }
    return usersDB;
  } 
  async findOne(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch(error) {
      throw boom.notFound(error + ' ID No Registrado - Argument passed in must be' +
      ' a string of 12 bytes or a string of 24 hex characters or an integer');
    }
  }
  async createUser(data) {
    const query = { Identificacion: data.Identificacion };
    const userDB = await UserModel.find(query);
    if (!userDB.length) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.Password, salt);
      data.Password = hashedPassword;
      const newUser = await UserModel.create(data);
      return newUser;
    }
    throw boom.conflict(`El usuario con ID ${data.Identificacion} Ya se encuentra registrado`);
  } 
  async update(id, args) {
    try {
      await UserModel.findById(id);
      if (args.Password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(args.Password, salt);
        args.Password = hashedPassword;
      }
      await UserModel.findOneAndUpdate(id, args);   
      return { message : `User ${id} Update OK` };
    } catch (error) {
      throw boom.notFound(error + ' Id No Existe');
    }
  }
  async delete(id) {
    try {
      await UserModel.findById(id);
      await UserModel.findOneAndDelete(id);
      return { message : `Id ${id} Delete OK` };
    } catch (error) {
      throw boom.notFound(error + ' Id Not Exist');
    }
  }
}

module.exports = UserService;

// // Recuperamos la contraseña de la petición
// const palabraSecretaTextoPlano = "hunter2";
// // Y la guardada en la base de datos
// const palabraSecretaEncriptada = "$2a$10$P9yvh9ew5ZueNRjQGX4Eiui9jNhaKJCX24mRsrWSNvj.0O2FjNSB2";
// // Comprobamos...
// const palabraSecretaValida = await bcrypt.compare(palabraSecretaTextoPlano, palabraSecretaEncriptada);