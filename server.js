const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const express = require('express');
// const sequelize = require('./config/connection');



// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const connection = sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));

// });



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
            "Add New Role",
            "Add New Employee",
            "Update Employee",
            "Remove Employee",
            "Remove Department",

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

            case 'Add New Employee':
                addEmp();
                break;

            case 'Add New Department':
                addDept();
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
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.table(res);
        runInitQuestions();
    })
};

//function to add new employee
const addEmp = () => {

    //call role table to populate choices for user to choose
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;

        //promt user to input new employee info
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "Please enter new Employee 's first name"
            },
            {
                name: "last_name",
                type: "input",
                message: "Please enter new Employee 's last name"
            },
            {
                name: "new_role",
                type: "list",
                choices() {
                    const roleChoices = [];
                    res.forEach(({ title }) => {
                        roleChoices.push(title);
                    })
                    return roleChoices;
                },
                message: "Choose a role for the New Employee"
            }
        ])
            .then((answers) => {
                let newRoleId;
                res.forEach((res) => {
                    if (res.title === answers.new_role) {
                        newRoleId = res.id;
                    }
                })

                //insert new data into database
                connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answers.first_name,
                        last_name: answers.last_name,
                        role_id: newRoleId
                    },
                    (err) => {
                        if (err) throw err;
                        console.log('-------------');
                        console.log(`${answers.first_name} ${answers.last_name} is ADDED to New Employee`);
                        console.log('-------------');

                        runInitQuestions();
                    }
                )
            })
    })
};

const addDept = () => {
    inquirer.prompt({
        name: "add_Dept",
        type: "input",
        message: " Please create a new Department name.",
        validate: function validatInput(name) {
            return name !== '';
        }
    }).then((answers) => {
        connection.query('INSERT INTO department SET?', { department_name: answers.add_Dept, },
            (err) => {
                if (err) throw err;
                console.log('-------------');
                console.log(`${answers.add_Dept} department successfully added!`);
                console.log('-------------');
                runInitQuestions();
            }
        )
    })
};
