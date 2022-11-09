/* eslint-disable no-console */
const connDB = require('./src/DBconfig/dataBase');
const routerApi = require('./src/routes');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const { logError, errorHandler, boomError } = require('./src/middlewares/errorHandler');

app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
routerApi(app);

app.use(logError);
app.use(boomError);
app.use(errorHandler);

mongoose.connect(connDB.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => { console.log('Data Base Connected'); })
  .catch(err => { console.log('Connect error ', err); });

app.listen(connDB.port, async () => {
  console.log('Server run in port ', connDB.port);
});
