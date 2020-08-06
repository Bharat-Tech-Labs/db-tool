import { sequelize } from './connect';
export default async (req, res) => {
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
}