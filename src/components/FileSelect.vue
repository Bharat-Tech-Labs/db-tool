/* eslint-disable @typescript-eslint/no-var-requires */
<template>
    <div>
        <v-btn color="primary" @click="connectDB()">Connect</v-btn>
    </div>
</template>

<script>

import { Sequelize } from "sequelize";
// import {Pool} from 'pg';
// import shell from 'shelljs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const shell = require('shelljs');
// import {electron} from 'electron';
// electron
// shell.echo('hello world');
// import {exec} from 'child_process';
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


// import http from 'http';
import {exec} from 'child_process';
console.log('ok');
import express from 'express';

// console.log(electron)
export default {
    name: 'FileSelect',
    methods: {
        connectDB(){
            
const router=express.Router();
router.get('/',function(req,res,next){
    exec('echo "hello world"',function(err,stdout,stderr){
        console.log(stdout);
    })
});
// const cmd='echo "ok rwroking"';
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
            //     dialect: 'postgres'
            // });
            // sequelize.authenticate().then(()=>{
            //     console.log("success");
            // }).catch((err)=>{console.log(err);})
        }
    }
}
</script>