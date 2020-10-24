const inquirer = require('inquirer');
const connection = require('./db/connection')

let questions = [
    {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: [
            "View all departments",
            "view all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
        ],
    },
];

inquirer.prompt(questions).then((choice) => {
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
