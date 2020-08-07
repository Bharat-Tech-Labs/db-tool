// import { sequelize } from './connect';
import { Connection } from '../../helpers/connection'

export default async (req, res) => {
    console.log('table');
    const connection = new Connection();
    const sequelize = connection.getConnection();
    console.log(sequelize);
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    });
    res.statusCode = 200;
    sequelize.authenticate().then(() => {

        const query = "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';";
        sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
            .then(function (table) {
                res.end(JSON.stringify(table));
            })
    }).catch((err) => {
        res.end("Connection Error");
    })
}