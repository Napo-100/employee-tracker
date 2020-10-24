const inquirer = require('inquirer');
const connection = require('./db/connection')
const cTable = require('console.table');

let mainPrompt = [
    {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
        ],
    },
];

let deptAdd = [
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you would like to add?',
        validate: departmentInput => {
            if (departmentInput) {
                console.log(input + "added to departments")
                return true;
            } else {
                console.log('No department added');
                inquirer.prompt(mainPrompt);
            }
        }
    }
]

inquirer.prompt(mainPrompt).then((choice) => {
    switch (choice.prompt) {
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "View all employees":
            viewEmployees();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Update employee role":
            updateEmployee();
            break;
    }
});

const viewDepartments = function () {
    connection.query(
        "SELECT * FROM departments",
        function (err, results) {
            if (err) {
                console.log(err)
                return;
            }
            console.table(results);
            inquirer.prompt(mainPrompt);
        
        }
    )
};

const viewRoles = function () {
    connection.query(
        "SELECT * FROM roles",
        function (err, results) {
            if (err) {
                console.log(err)
                return;
            }
            console.table(results);
            inquirer.prompt(mainPrompt);
            return;
        }
    )
};

const viewEmployees = function () {
    connection.query(
        "SELECT * FROM employees",
        function (err, results) {
            if (err) {
                console.log(err)
                return;
            }
            console.table(results);
            inquirer.prompt(mainPrompt);
            return;
        }
    )
};

const addDepartment = function () {
    connection.query(
        inquirer.prompt(deptAdd).then((input) => {
            "INSERT INTO departments " + input.prompt,
                function (err, results) {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    console.table(results);
                    inquirer.prompt(mainPrompt)

                }
        }
        )

    )
}
