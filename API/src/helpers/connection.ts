export class Connection {
    private static connection;
    constructor(sequelize = Connection.connection) {
        Connection.connection = sequelize;
    }
    getConnection() {
        return Connection.connection;
    }
}