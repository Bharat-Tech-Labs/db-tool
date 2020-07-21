<template>
  <div>
    <v-btn color="primary" @click="connectionDialog = true">Connect</v-btn>
    <v-dialog v-model="connectionDialog">
      <v-card>
        <v-card-title class="headline">Connection</v-card-title>

        <v-card-text>
          <v-text-field v-model="dbname" label="DB Name" required></v-text-field>
          <v-text-field v-model="userName" label="User Name" required></v-text-field>
          <v-text-field
            v-model="userPassword"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            label="Password"
            @click:append="passwordShow = !passwordShow"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" @click="connectionDialog = false">Cancle</v-btn>

          <v-btn color="primary" @click="connectDB()">Connect</v-btn>
          <v-dialog v-model="connectionError">
            <v-card>
              <v-card-text>
                Connection is not step
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="connectionError=false">Ok</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Header</th>
            
            <!-- <th class="text-left">Calories</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in fileHeader" :key="item.name">
            <td><v-text-field v-model="newHeader.key" value="item.name"></v-text-field></td>
             
            
            <!-- <td>{{ item.calories }}</td> -->
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
// import { Sequelize } from "sequelize";
// import pg from "pg";
// import shell from 'shelljs';
// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const shell = require('shelljs');

// import electron from 'electron';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const electron = require('electron');
// shell.echo('hello world');
// import {exec} from 'child_process';
// const exec = require("child_process").exec;

// console.log('ok');
// import express from 'express';
// const router=express.Router();
// router.get('/',function(req,res,next){
//     exec('echo "hello world"',function(err,stdout,stderr){
//         console.log(stdout);
//     })
// });
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const express = require('express');
// const app = express.;
// app.get('/',
//     function(req,res)
//     {
//         res.send("express");
//     }
// );
// app.listen(3333);

// import querystring from "querystring";
// import http from "http";
import request from "request";

// import {exec} from 'child_process';
// import net from 'net';
// console.log('ok');
// import express from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const pg = require('pg');
// console.log(electron)
export default {
  name: "FileSelect",
  
  data() {
    return {
        dbname: "",
    userName: "",
    userPassword: "",
    passwordShow: false,
    connectionDialog: false,
    connectionError: false
    }
},
  // computed: {
  //   connectionDialog(){
  //     return this.connectionDialog;
  //   }
  // },
  methods: {
    connectDB() {
      // shell.echo('hello world');
      // const soc=net.Socket;
      console.log("ok");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const payload = JSON.stringify({
        dbname: this.dbname,
        userName: this.userName,
        userPassword: this.userPassword
      });
      console.log(payload);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // const options = {
      //   port: 8081,
      //   host: "127.0.0.1",
      //   method: "POST",
      //   headers: {
      //     "Access-Control-Allow-Origin": '*',
      //   }
      // };
      // request.post()
      const r = request.post(
        {
          url: "http://127.0.0.1:8082/connect",
          // path:'/connect',
          //         headers: {
          //   "Access-Control-Allow-Origin": "*",
          //   "Content-Type": "application/json",
          //             'Access-Control-Allow-Headers': '*',
          //             'Access-Control-Allow-Methods': '*'
          // },
          // method: 'POST',
          // mode:'no-cors',
          // body:payload
          form: {
            dbname: this.dbname,
            userName: this.userName,
            userPassword: this.userPassword
          }
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
            if (body === "success") {
              
              this.connectionDialog = false;
              console.log(this.connectionDialog);
            } else {
              this.connectionError = true;
            }
          } else {
            console.log(error);
            console.log(response);
          }
        }
      );
      console.log(r);
      //   const req = http.get(options, res => {
      //     console.log(`statusCode: ${res.statusCode}`);
      //     let cont = "";
      //     res.on("data", d => {
      //       cont += d;
      //     });

      //     res.on('end',()=>{
      //         console.log(cont);
      //         console.log("end");
      //         // req.end();
      //     })
      //   });
      //   req.on("error", error => {
      //     console.error(error);
      //   });
      //   console.log("pay");
      // //   req.write(payload);
      // //   req.end(payload);
      // try{
      //    req.write(payload);//,()=>{console.log("end"); req.end();});
      // }
      // catch(err){
      //     console.log(err)
      // }
      // finally{
      //     console.log("fin");
      // }
      //   console.log("con");
      //   req.on("response", () => {
      //     console.log("got connected!");
      //   });

      // console.log(soc);
      //             const connection = new pg.Client({
      //                 connectionString: 'postgresql://admin:qwedsa@localhost:8081/psqldb'});
      //             console.log(connection);
      //             connection.connect().then(() => {
      //                 console.log("Success");
      //             }).catch(error=>{console.log(error)})

      //             connection.query('SELECT NOW()', (err, res) => {
      //   console.log(err, res)
      //   connection.end()
      // })
      // exec('echo "hello world"',function(err,stdout,stderr){
      //         console.log(stdout);
      //     });
      // const router=express.Router();
      // router.get('/',function(req,res,next){
      //     exec('echo "hello world"',function(err,stdout,stderr){
      //         console.log(stdout);
      //     })
      // });
      // const cmd='echo "ok working"';
      // const child= spawn(cmd);
      // child.stdout.on('data', function (data) {
      //       console.log(data);
      //     });

      // http.createServer(function(request, response) {
      //         response.writeHead(200, {"content-type": "text/plain"});
      //         cp.execFile('node', ['--version'], function(error, stdout, stderror) {
      //             if(error) throw error;
      //             console.log(stdout);
      //             console.log(stderror);
      //         });
      //         response.write("Hello world!!!");
      //         response.end();
      //     }).listen(8080);
      //     console.log("The server has started listening to the port: 8000");

      //             console.log(Pool);
      //             console.log("ok");
      //             const ls = cp.execFile('node', ['--version']);
      // console.log(ls);
      // ls.stdout.on('data', (data) => {
      //   console.log(`stdout: ${data}`);
      // });

      // ls.stderr.on('data', (data) => {
      //   console.error(`stderr: ${data}`);
      // });

      // ls.on('close', (code) => {
      //   console.log(`child process exited with code ${code}`);
      // });

      // const pool = new Pool({
      //   user: 'admin',
      //   host: 'localhost',
      //   database: 'psqldb',
      //   password: 'qwedsa',
      //   port: 5432,
      // })
      // console.log(pool)
      // // // client.connect()
      // pool.on('error', function (err, client) {
      //     console.error('idle client error', err.message, err.stack);
      // });
      // pool.query('SELECT NOW()', (err, res) => {
      //   console.log(err, res)
      //   pool.end()
      // })
      // const sequelize = new Sequelize('psqldb', 'admin', 'qwedsa', {
      //     // host: 'localhost',
      //     dialectModule: pg,
      //     pool:{idle:5000},
      //     dialect: 'postgres'
      // });
      // sequelize.authenticate().then(()=>{
      //     console.log("success");

      //       sequelize.query('select now()').then((res)=>{console.log(res);});

      // }).catch((err)=>{console.log(err);})
    }
  }
};
</script>