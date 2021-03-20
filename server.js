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
        message: "Welcome, What would you like to do ?",
        choices: [
            "List Employees by Department",
            "List Employees by Role",
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

            case 'List All Employees':
                listAll();
                break;

            case 'List Employees by Department':
                listDept();
                break;

                case 'List Employees by Role':
                    listRole();
                    break;
        }
    })
};

//function to list all (employeess, roles , departements)
const listAll = () => {
    console.log('-------------');
    console.log('LIST ALL EMPLOYEES');
    console.log('-------------');

    //function to retrieve all data from database
    const query = `SELECT employee.id, employee.first_name AS "FIRST NAME", employee.last_name AS "LAST NAME", role.title AS "ROLE", role.salary AS "SALARY", department.department_name AS "DEPARTMENT"
    FROM employee
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        // display on console.table
        console.table(res);
        runInitQuestions();
    })

};

//function to retrieve all employees by department
const listDept = () => {
    console.log('-------------');
    console.log('LIST ALL EMPLOYEES BY DEPARTMENT');
    console.log('-------------');

    //function to retrieve all employees by department in database
    const query = `SELECT department.department_name AS "DEPARTMENT", employee.first_name AS "FIRST NAME", employee.last_name AS "LAST NAME", role.title AS "ROLE", role.salary AS "SALARY"
FROM department
INNER JOIN role ON (department.id = role.department_id)
INNER JOIN employee ON (role.id = employee.role_id)
ORDER BY department.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.table(res);
        runInitQuestions();
    })
};

//function to retrieve all employess by role
const listRole = () => {
    console.log('-------------');
    console.log('LIST ALL EMPLOYEES BY ROLE');
    console.log('-------------');

    //function to retrieve all employees by ROLE in database
    const query = `SELECT role.title AS "ROLE", employee.first_name AS "FIRST NAME", employee.last_name AS "LAST NAME"
    FROM role
    INNER JOIN department ON (role.department_id = department.id)
    INNER JOIN employee ON (role.id = employee.role_id)
    ORDER BY role.id;`;
    connection.query(query, (err, res)=>{
        if (err) throw err;

        console.table(res);
        runInitQuestions();
    })
};