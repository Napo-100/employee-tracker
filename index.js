const { prompt } = require('inquirer');
const cfonts = require('cfonts');
//const connection = require('./db/connection')
const cTable = require('console.table');
const db = require('./db/class')

const mainPrompt = function () {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Exit"
            ]
        }
    ]).then(res => {
        let choice = res.choice
        switch (choice) {
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
            case "Exit":
                quitApp();

        }
    })
};


const viewDepartments = function () {
    db.viewDepartments().then(([rows]) => {
        let departments = rows
        console.table(departments)
    }).then(() => mainPrompt())
};

const viewRoles = function () {
    db.viewRoles().then(([rows]) => {
        let roles = rows
        console.table(roles)
    }).then(() => mainPrompt())
};

const viewEmployees = function () {
    db.viewEmployees().then(([rows]) => {
        let employees = rows
        console.table(employees)
    }).then(() => mainPrompt())
};

const addDepartment = function () {
    prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter a department name',
        },
    ]).then((res) => {
        db.addDepartment({
            name: res.department
        })
            .then(() => {
                console.log(`\nNew department ${res.department} successfully added!\n`)
                
                mainPrompt()
            })
    })
};


const quitApp = function () {
    process.exit()
}






cfonts.say(" Middle Earth \n    Manager!    ", {
    font: "pallet",
    align: "left",
    colors: ["yellow", "cyanBright"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
    gradient: true,
    independentGradient: false,
    transitionGradient: false,
    env: "node",
});

mainPrompt();

