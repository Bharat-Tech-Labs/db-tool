// const { Sequelize }=require("/home/ubuntu/db-query-tool/node_modules/sequelize");
const { Sequelize }=require('sequelize');
const pg = require('pg');
const sequelize = new Sequelize('psqldb', 'admin', 'qwedsa', {
                // host: 'localhost',
                dialectModule: pg,
                pool:{idle:5000},
                dialect: 'postgres'
            });
            sequelize.authenticate().then(()=>{
                console.log("success");
                
                  sequelize.query('select now()').then((res)=>{console.log(res);});
                
            }).catch((err)=>{console.log(err);})
            