import { Sequelize } from 'sequelize';
import { Connection } from '../../helpers/connection'
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

    sequelize.authenticate().then(() => {

        res.end("success");
    }).catch((err) => {
        res.end("error");
    })
    new Connection(sequelize);
}

// export { sequelize };