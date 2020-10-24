const { prompt } = require('inquirer');
//const connection = require('./db/connection')
const cTable = require('console.table');
const db = require('./db/database')

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

const quitApp = function () {
    process.exit()
}

// const viewRoles = function () {
//     connection.query(
//         "SELECT * FROM roles",
//         function (err, results) {
//             if (err) {
//                 console.log(err)
//                 return;
//             }
//             console.table(results);
//             // inquirer.prompt(mainPrompt);

//         }
//     )
// };

// const viewEmployees = function () {
//     connection.query(
//         "SELECT * FROM employees",
//         function (err, results) {
//             if (err) {
//                 console.log(err)
//                 return;
//             }
//             console.table(results);
//             // inquirer.prompt(mainPrompt);

//         }
//     )
// };



// const addDepartment = () => {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "department",
//                 message: 'What is the name of the department you would like to add?',
//                 // validate: departmentInput => {
//                 //     if (departmentInput) {
//                 //         console.log("added a department")
//                 //         return true;
//                 //     } else {
//                 //         console.log('No department added');
//                         inquirer.prompt(mainPrompt);
//                 //     }
//                 // }
//             }
//         ])
//         .then((department) => {
//             connection.query(
//                 "INSERT into department",
//                 {
//                     department
//                 },
//                 function (err, results) {
//                     if (err) throw err;
//                     console.table(results.affectedRows + " department inserted!\n");
//                     // Call addDepartment() AFTER the INSERT completes
//                     addDepartment();
//                 }
//             );
//         });
// };

mainPrompt();