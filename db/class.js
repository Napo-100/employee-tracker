const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }

    viewDepartments() {
        return this.connection.promise().query(`SELECT * FROM departments`);
    }

    viewRoles() {
        return this.connection.promise().query(`SELECT r.title, r.salary, d.name AS 'department name' 
                                                FROM roles AS r 
                                                LEFT JOIN departments AS d 
                                                ON r.deptId = d.id`
                                                );
    }

    viewEmployees() {
        return this.connection.promise().query(`SELECT CONCAT(e.firstName," ", e.lastName) AS 'name', 
                                                r.title AS 'role', r.salary, CONCAT(e2.firstName," ", e2.lastName) AS 'manager name'
                                                FROM employees AS e
                                                LEFT JOIN roles AS r
                                                ON e.roleId = r.id
                                                LEFT JOIN employees AS e2
                                                ON e.managerId = e2.id`
                                                );
        
    }

    addDepartment(newDepartment) {
        return this.connection.promise().query(`INSERT INTO departments SET ?`, newDepartment);
    }

    addRole(){

    }

    addEmployee(){

    }

    updateEmployee(){

    }


}

module.exports = new DB(connection);
