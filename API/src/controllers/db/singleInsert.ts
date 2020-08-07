import { Connection } from '../../helpers/connection'
export default async (req, res) => {

    const connection = new Connection();
    const sequelize = connection.getConnection();
    let key;
    let body;
    for (key in req.body) {
        body = JSON.parse(key);
    }
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    });
    const data: string[] = [];
    data.push(body.data);
    res.statusCode = 200;
    sequelize.authenticate().then(() => {
        try {
            const queryInterface = sequelize.getQueryInterface();
            const result = queryInterface.bulkInsert(body.name, data);
            res.write("success");
        }
        catch (err) {
            res.write("error");
        }
        finally {
            res.end();
        }
    }).catch((err) => {
        res.end("Connection Error");
    })
}