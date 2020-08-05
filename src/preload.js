// window.onload = () => {
/* eslint-disable @typescript-eslint/no-var-requires */
console.log("OK");
const bodyParser = require('body-parser');
// // const papa = require("papaparse");
const express = require('express');
const { Sequelize } = require('sequelize');
const ssh2 = require('ssh2');
const pg = require('pg');
const app = express();
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false, parameterLimit: 1000000 }));

let sequelize;
// const c = new ssh2();
// const pgHost = 'localhost'; // remote hostname/ip
//  let pgPort = 5432;
// //  const proxyPort = 9090;
//   let ready = false;

// const proxy = require('net').createServer(function(sock) {
// if (!ready)
//   return sock.destroy();
// c.forwardOut(sock.remoteAddress, sock.remotePort, pgHost, pgPort, function(err, stream) {
//   if (err)
//     return sock.destroy();
//   sock.pipe(stream);
//   stream.pipe(sock);
// });
// });
// proxy.listen(0, '127.0.0.1');



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
    logging: false,
    dialect: 'postgres',
    host: body.host,
    port: body.port
  });
  // console.log(sequelize);
  sequelize.authenticate().then(() => {
    // console.log("success");

    res.end("success");
  }).catch((err) => {
    // console.log("error");
    res.end("error");
  })

  //   pgPort=body.port;

  //   let privateKey;
  // if(body.sshPassword==='')
  // {
  //   privateKey=require('fs').readFileSync(body.sshKey)
  // }
  // c.connect({
  // host : body.sshHost,
  // port : body.sshPort,
  // username : body.sshUser,
  // privateKey : privateKey,
  // password:body.sshPassword
  // });
  // c.on('connect', function() {
  // console.log('Connection :: connect');
  // });
  // c.on('ready', function() {
  // ready = true;

  // sequelize = new Sequelize(body.dbname, body.userName, body.userPassword, {
  //     dialectModule: pg,
  //     pool: { idle: 5000000 },
  //     logging: false,
  //     dialect: 'postgres',
  //     host: body.host,
  //     port: proxy.address().port
  //   });
  //   // console.log(sequelize);
  //   sequelize.authenticate().then(() => {
  //     // console.log("success");
  //     res.end("success");
  //   }).catch((err) => {
  //     // console.log("error");
  //     res.end("error");
  //   })
  // });
});


app.post('/checkDiskSpace', function (req, res, next) {
  console.log('checkDiskSpace');
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

  let privateKey;
  if (body.sshPassword === '') {
    privateKey = require('fs').readFileSync(body.sshKey)
  }
  const conn = new ssh2.Client();
  conn.on('ready', function () {
    // console.log('Client :: ready');

    conn.exec('df -h', function (err, stream) {
      // console.log(stream);
      if (err) throw err;
      let resData = "";
      stream.on('close', function (code, signal) {
        res.end(resData);
        // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();
      }).on('data', function (data) {
        resData += data;
        // console.log('STDOUT: ' + data);

        // res.write(data);
      }).stderr.on('data', function (data) {
        console.log('STDERR: ' + data);
      });
    });
  }).on('error', function (err) {
    console.log("Connection not Established");
    res.end(err);
  }).connect({
    host: body.sshHost,
    port: body.sshPort,
    username: body.sshUser,
    privateKey: privateKey,
    password: body.sshPassword
  });

});



app.post('/createTable', function (req, res, next) {
  console.log('createTable');
  let key;
  let query;
  for (key in req.body) {
    // console.log(key);
    // console.log(JSON.parse(key));
    query = JSON.parse(key);
  }
  // console.log(query);
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  // for (key in query.headers) {
  //   // console.log(key);
  //   // console.log(query.headers[key].type);
  //   if(query.headers[key].type=="VARCHAR")
  //   {
  //     query.headers[key].type=DataTypes.STRING;
  //   }
  // }
  // console.log(query);
  res.statusCode = 200;
  sequelize.authenticate().then(() => {
    // console.log("Success!");
    sequelize.query(query, { type: sequelize.QueryTypes.CREATE })
      .then(function (table) {
        // table.sync();
        // console.log(table === sequelize.models.table);
        // console.log(JSON.stringify(table));
        res.end(JSON.stringify(table));
        // table.sync({force: true }).then(()=>{console.log("dwqws")}).catch((err)=>{console.log(err)}).finally(()=>{console.log("hrthe")});
        // console.log(table);

      })
    //   try{
    // const table = sequelize.define(query.name, query.headers ,{
    //   freezeTableName: true,
    //   timestamps: false,
    //   defaultPrimaryKey: false
    // });
    // table.removeAttribute('id');
    // table.sync({force: true }).then(()=>{
    //   console.log(table);
    //   
    // });

    //   }
    //   catch(err){
    //     console.log(err);
    //   }
  }).catch((err) => {
    res.end("Connection Error");
  })
});

app.post('/table', function (req, res, next) {
  console.log('table');
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  res.statusCode = 200;
  sequelize.authenticate().then(() => {

    const query = "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';";
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      .then(function (table) {
        // console.log(JSON.stringify(table));
        res.end(JSON.stringify(table));
        // We don't need spread here, since only the results will be returned for select queries
      })
  }).catch((err) => {
    res.end("Connection Error");
  })
});




app.post('/tableColumn', function (req, res, next) {
  console.log('tableColumn');
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  res.statusCode = 200;
  sequelize.authenticate().then(() => {
    let key;
    let tableName;
    for (key in req.body) {
      // console.log(key);
      // console.log(JSON.parse(key));
      tableName = JSON.parse(key);
    }
    // console.log(tableName);
    const query = "SELECT column_name FROM information_schema.columns WHERE TABLE_NAME = '" + tableName + "';";
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      .then(function (columns) {
        // console.log(JSON.stringify(columns));
        res.write(JSON.stringify(columns));
        res.end();
      })
  }).catch((err) => {
    res.end("Connection Error");
  })
});

app.post('/singleInsert', function (req, res, next) {
  let key;
  let body;
  for (key in req.body) {
    body = JSON.parse(key);
  }
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  const data = [];
  data.push(body.data);
  res.statusCode = 200;
  sequelize.authenticate().then(() => {
    try {
      // console.log(body.name,body.data);
      const queryInterface = sequelize.getQueryInterface();
      const result = queryInterface.bulkInsert(body.name, data);
      // console.log(result);
      res.write("success");
    }
    catch (err) {
      res.write("error");
    }
    finally {
      res.end();
    }
  }).catch((err) => {
    res.end("Connection Error");
  })
});


app.post('/bulkInsert', function (req, res, next) {
  console.log('query');
  // console.log(req.body);
  // console.log(JSON.parse(req.body));
  let key;
  let body;
  for (key in req.body) {
    // console.log(key);
    // console.log(JSON.parse(key));
    body = JSON.parse(key);
  }
  // console.log(body);
  //   const file=JSON.parse(body.file);
  //   const fileObject  = {
  //     lastModified     : file.lastModified,
  //     lastModifiedDate : file.lastModifiedDate,
  //     name             : file.name,
  //     size             : file.size,
  //     type            : file.type,
  //     path:file.path
  //  };  
  //  const fileObject  = {
  //   lastModified     : this.fileInput['lastModified'],
  //   lastModifiedDate : this.fileInput['lastModifiedDate'],
  //   name             : this.fileInput['name'],
  //   size             : this.fileInput['size'],
  //   type            : this.fileInput['type'],
  //   path:this.fileInput['path']
  // };  
  //  console.log(req.body.file);
  //   console.log(req.body.header);
  // let n=body.name;
  // console.log(sequelize.models);
  // app.model[body.name].bulkCreate(body.data).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  res.statusCode = 200;
  sequelize.authenticate().then(() => {
    try {
      // console.log(body.name,body.data);
      const queryInterface = sequelize.getQueryInterface();
      const result = queryInterface.bulkInsert(body.name, body.data);
      res.write("success");
    }
    catch (err) {
      res.write("error");
    }
    finally {
      res.end();
    }
    // console.log(papa);
    // papa.parse(fileObject, {
    //   header: true,
    //   transformHeader: function(h, index) {
    //     console.log(h);
    //     for (let i = 0; i < body.header.length; i++) {
    //       if (body.header[i].name == h) {
    //         return body.header[i].newName;
    //       }
    //     }
    //   },
    //   dynamicTyping: true,
    //   chunkSize: 1024 * 1024 * 10,
    //   chunk: function(result) {
    //     console.log(result.data);
    //     const queryInterface = sequelize.getQueryInterface();
    // queryInterface.bulkInsert(body.tableName,result.data );

    // }
    // }).then(()=>{console.log("then")}).catch((er)=>{console.log(er)});

  }).catch((err) => {
    res.end("Connection Error");
  })
});

app.post('/pipeline', function (req, res, next) {
  let key;
  let query;
  for (key in req.body) {
    query = JSON.parse(key);
  }
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  res.statusCode = 200;
  console.log(query)
  sequelize.authenticate().then(() => {
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
      .then(function (result) {
        res.end("success");
      })
  }).catch((err) => {
    res.end("Connection Error");
  })
});



console.log("listening");
app.listen(8082, 'localhost');
// // const electron = require("electron");
//   const proc = require("child_process");
//   proc.exec("yarn electron",{maxBuffer: 1024 * 1024 * 1024 * 2},(error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
//   });
// };