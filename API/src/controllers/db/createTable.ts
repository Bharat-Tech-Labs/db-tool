import { sequelize } from './connect'
export default async (req, res) => {
    console.log('createTable');
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
    sequelize.authenticate().then(() => {
        sequelize.query(query, { type: sequelize.QueryTypes.CREATE })
            .then(function (table) {
                res.end(JSON.stringify(table));
            })
    }).catch((err) => {
        res.end("Connection Error");
    })
}