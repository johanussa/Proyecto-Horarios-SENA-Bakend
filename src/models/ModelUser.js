/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  Identificacion: { type: String, required: true, unique: true },
  Tipo_ID: { type: String, required: true },
  Nombres: { type: String, required: true },
  Apellidos: { type:String, required: true },
  Email: { type: String, required: true, unique: true,
    validate: {
      validator: (Email) => {
        const expreRegular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return expreRegular.test(Email);
      },
      message: 'Email is not valid',
    },
  },
  Password: { type: String, required: true },
  Ciudad: { type: String, default: "Bogota D.C.", enum: ["Bogota D.C."] },
  Jornada: { type: String, enum: ["Diurna", "Nocturna", "Virtual"] },
  Tipo_Formacion: { type: String, enum: ["Tecnico", "Tecnologo", "Complementaria", "Especializacion"] },
  Programa: { type: String, enum: ["Soldadura", "Joyeria", "Tecnico_Sistemas", "Programacion_Software", "aslistamiento"] },
  Ficha: { type: String },
  Ruta: { type: String },
  Rol: { type: String, enum: ["Aprendiz", "Administrador", "Funcionario"] }
});

const UserModel = mongoose.model('Usuario', UserSchema);
module.exports = UserModel;
