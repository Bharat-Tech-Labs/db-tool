const bodyParser = require('body-parser');
const express = require('express');
import dbRoutes from './routes/db.js';
const app = express();
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false, parameterLimit: 1000000 }));
app.use(
    '/',
    dbRoutes
  );

  app.listen(8082, 'localhost');