/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const connDB = require('./src/DBconfig/dataBase');

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));

mongoose.connect(connDB.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => { console.log('Data Base Connected'); })
  .catch(err => { console.log('Connect error ', err); });

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server On Line'
  });
})

app.listen(connDB.port, async () => {
  console.log('Server run in port ', connDB.port);
});
