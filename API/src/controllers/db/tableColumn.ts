import { sequelize } from './connect';
export default async (req, res) => {
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
            tableName = JSON.parse(key);
        }
        const query = "SELECT column_name FROM information_schema.columns WHERE TABLE_NAME = '" + tableName + "';";
        sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
            .then(function (columns) {
                res.write(JSON.stringify(columns));
                res.end();
            })
    }).catch((err) => {
        res.end("Connection Error");
    })
}