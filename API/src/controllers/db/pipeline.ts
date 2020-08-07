import { Connection } from '../../helpers/connection'
export default async (req, res) => {

    const connection = new Connection();
    const sequelize = connection.getConnection();
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