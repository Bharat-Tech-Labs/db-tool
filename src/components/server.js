/* eslint-disable @typescript-eslint/no-var-requires */
const bodyParser = require('body-parser');

const express = require('express');
const { Sequelize } = require('sequelize');
const pg = require('pg');
const app = express();
// app.use(bodyParser.json({limit: '500mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false, parameterLimit: 1000000 }));
// app.use(bodyParser.json({limit: '50mb', extended: true}));
// app.use(bodyParser.urlencoded({extended: true}));
let sequelize;
app.post('/connect', function (req, res, next) {
  console.log('connect');
  res.statusCode = 200;
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });



  let key;
  let body;
  for (key in req.body) {
    body = JSON.parse(key);
  }

  sequelize = new Sequelize(body.dbname, body.userName, body.userPassword, {
    dialectModule: pg,
    pool: { idle: 5000000 },
    dialect: 'postgres'
  });
  // console.log(sequelize);
  sequelize.authenticate().then(() => {
    console.log("success");
    res.end("success");
  }).catch((err) => {
    console.log("error");
    res.end("error");
  })
});


app.post('/query', function (req, res, next) {
  console.log('query');
  console.log(req.body);
  // console.log(JSON.parse(req.body));
  let key;
  let query;
  for (key in req.body) {
    // console.log(key);
    // console.log(JSON.parse(key));
    query=JSON.parse(key);
  }
  console.log(query);
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  res.statusCode = 200;
  sequelize.authenticate().then(() => {
    console.log("qsuccess");
    res.end("qsuccess");
  }).catch((err) => {
    res.end("qerror");
  })
});

app.listen(8082, 'localhost');