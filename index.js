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
                updateRole();
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

const addRole = function () {
    db.viewDepartments().then(([rows]) => {
        const department = rows.map(({ dept_Id, name }) => ({ name: name, value: dept_Id }))

        prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title for the role',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role',
            },
            {
                type: 'list',
                name: 'deptId',
                message: 'Choose a department for this role',
                choices: department
            },
        ]).then((res) => {
            db.addRole(res)
                .then(() => {
                    console.log(`\nNew role ${res.title} successfully added!\n`)

                    mainPrompt()
                })
        })
    })
}


const addEmployee = function () {
    db.roleQuery().then(([rows]) => {
        const roles = rows.map(({ id, title }) => ({ name: title, value: id }))

        db.getManager().then(([rows]) => {
            const manager = rows.map(({ id, firstName, lastName }) => ({ name: firstName + "   " + lastName, value: id }));


            prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the employee',
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'choose a role for the employee',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'choose a manager for the employee',
                    choices: manager
                },
            ]).then((res) => {
                db.addEmployee(res)
                    .then(() => {
                        console.log(`\nNew employee ${res.firstName}" "${res.lastName}" " successfully added!\n`)

                        mainPrompt()
                    })
            })
        })
    })
}





const updateRole = function () {
    db.roleQuery().then(([rows]) => {
        const roles = rows.map(({ id, title }) => ({ name: title, value: id }))

        db.fullNameQuery().then(([rows]) => {
            const empNameList = rows.map(({ id, firstName, lastName }) => ({ name: firstName + " " + lastName, value: id }));

            prompt([
                {
                    type: 'list',
                    name: 'EmpNameRoleUpdate',
                    message: 'Which employee would you like to update?',
                    choices: empNameList
                },
                {
                    type: 'list',
                    name: 'roleUpdate',
                    message: "Choose the role ID to assign to employee",
                    choices: roles
                },


            ]).then((res) => {
                db.updateRole(res)
                    .then(() => {
                        console.log(`\nNew role successfully added!\n`)

                        mainPrompt()
                    })
            })
        });
    })
}


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
