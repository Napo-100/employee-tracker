const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }

    viewDepartments() {
        return this.connection.promise().query('SELECT * FROM departments');
    }

    viewRoles() {
        return this.connection.promise().query('SELECT * FROM roles');
    }

    viewEmployees() {
        return this.connection.promise().query('SELECT * FROM employees INNER JOIN roles ON employees.role_id = roles.id');
    }
}

module.exports = new DB(connection);
