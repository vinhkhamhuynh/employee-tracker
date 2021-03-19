const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'Vinceh*963.',
    database: 'employees_DB',
});

connection.connect((err) => {
    if (err) throw err;
    runInitQuestions();
});

//run prompt asking questions for user to answer
const runInitQuestions = () => {
    inquirer.prompt({
        name: 'initQ',
        type: 'list',
        message: "What would you like to do ?",
        choices: [
            "List Departments",
            "List Employee's Role",
            "List All Employees",
            "Add New Department",
            "Add New Employee's Role",
            "Add Employee",
            "Update Employee",
            // "Remove Employee",
            // "Remove Department",
            // "List Departments",
            "Exit",
        ],
    }).then((answers) => {
        switch (answers.initQ) {
            case 'Exit':
                connection.end();
                break;
        }
    })
};

