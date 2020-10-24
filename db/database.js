const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }

    viewDepartments() {
        return this.connection.promise().query('SELECT * FROM departments');
    }
}

module.exports = new DB(connection);