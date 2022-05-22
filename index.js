const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require('./db/connection');

db.connect(function (err) {
    if(err){
        throw err
    }
    startPrompt()
})

// function which prompts the user for what action they should take
function startPrompt()  {

    inquirer.prompt({
        type: "list",
        name: "task",
        message: "Would you like to do?",
        choices: [
          "View Employees",
          "View Departments",
          "View Roles",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
        ]
      })

.then(function ({ task }) {
    switch (task) {
      case "View Employees":
        viewEmployees();
        break;

      case "View Departments":
        viewDepartments();
        break;
      
      case "View Roles":
        viewRoles();
        break;
    
      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employees":
        removeEmployees();
        break;

      case "Update Employee Role":
        updateEmployeeRole();
        break;

      case "Add Role":
        addRole();
        break;

    }
  });
}

const viewEmployees = () => {
    db.query('SELECT * FROM employees;', (err, res) => {
        if (err) {
            throw err
        }
        console.table(res)
        startPrompt()
    })
}

const viewDepartments = () => {
    db.query('SELECT * FROM departments;', (err, res) => {
        if (err) {
            throw err
        }
        console.table(res)
        startPrompt()
    })
}


const viewRoles = () => {
    db.query('SELECT * FROM roles;', (err, res) => {
        if (err) {
            throw err
        }
        console.table(res)
        startPrompt()
    })
}
