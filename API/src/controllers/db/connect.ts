import { Sequelize } from 'sequelize';
import logger from 'electron-log';
const info = logger.create('anotherInstance');
info.transports.file.level = 'info';
info.transports.file.file = __dirname + '/info.log';
const error = logger.create('anotherInstance');
error.transports.file.level = 'error';
error.transports.file.file = __dirname + '/error.log';
import pg from 'pg';
let sequelize;
export default async (req, res) => {
    console.log('connectok');
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
    sequelize.authenticate().then((result) => {
        info.info("Connection is set up");
        res.end("success");
    }).catch((err) => {
        error.error(err);
        res.end("error");
    })
}

export { sequelize };