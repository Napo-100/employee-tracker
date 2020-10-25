const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }

    viewDepartments() {
        return this.connection.promise().query(`SELECT d.id AS 'dept id', d.name
                                                FROM departments AS d`);
    }

    viewRoles() {
        return this.connection.promise().query(`SELECT r.title, r.salary, d.name AS 'department name' 
                                                FROM roles AS r 
                                                LEFT JOIN departments AS d 
                                                ON r.deptId = d.id`
                                                );
    }

    viewEmployees() {
        return this.connection.promise().query(`SELECT e.id, CONCAT(e.firstName,"   ", e.lastName) AS 'firt name   last name', 
                                                r.title AS 'title', d.name AS department, r.salary, 
                                                CONCAT(e2.firstName,"  ", e2.lastName) AS 'manager name'
                                                FROM employees AS e
                                                LEFT JOIN roles AS r
                                                ON e.roleId = r.id
                                                LEFT JOIN departments AS d 
                                                ON r.deptId = d.id
                                                LEFT JOIN employees AS e2
                                                ON e.managerId = e2.id`
                                                );
        
    }

    addDepartment(department) {
        return this.connection.promise().query(`INSERT INTO departments SET ?`, department);
    }

    addRole(role){
        return this.connection.promise().query(`INSERT INTO departments SET ?`, role);
    }

    addEmployee(employee){
        return this.connection.promise().query(`INSERT INTO departments SET ?`, employee);
    }

    updateEmployee(){

    }


}

module.exports = new DB(connection);
