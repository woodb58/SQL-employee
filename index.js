const inquirer = require("inquirer");
// const cTable = require("console.table"); literally just here because it is required in the challenge. not needed.
const db = require("./db/connection");
// imports connection to server
db.connect(function (err) {
  if (err) {
    throw err;
  }
  startPrompt();
});

function startPrompt() {
  inquirer
    .prompt({
      name: "task",
      type: "list",
      message: "Please make a selection",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employee",
        "Update Employee Role",
        "Add Department",
        "Add Role",
      ],
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

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;
      }
    });
}

const viewEmployees = () => {
  db.query("SELECT * FROM employees;", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    startPrompt();
  });
};

const viewDepartments = () => {
  db.query("SELECT * FROM departments;", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    startPrompt();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM roles;", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    startPrompt();
  });
};

const addEmployee = () => {
  db.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Employee's first name?",
        },

        {
          name: "last_name",
          type: "input",
          message: "Employee's last name?",
        },

        {
          name: "role_id",
          type: "list",
          message: "What is the employee's role?",
          choices: res.map((role) => role.title),
        },
        {
          name: "manager_id",
          type: "list",
          message: "What is the manager's ID number?",
          choices: ["2", "5"],
        },
      ])
      .then(function (response) {
        const roleId = res.find((role) => role.title === response.role_id).id;

        db.query(
          "INSERT INTO employees SET ?",
          {
            first_name: response.first_name,
            last_name: response.last_name,
            role_id: roleId,
            manager_id: response.manager_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Employee added!");
            startPrompt();
          }
        );
      });
  });
};

const updateEmployeeRole = () => {
  db.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name?",
          response: res.map((employee) => employee.first_name),
        },
        {
          name: "role_id",
          type: "list",
          message: "What is the employee's new role?",
          choices: res.map((role) => role.title),
        },
      ])
      .then(function (response) {
        const roleId = res.find((role) => role.title === response.role_id).id;

        db.query(
          "UPDATE employees SET ? WHERE ?",
          [
            {
              role_id: roleId,
            },
            {
              first_name: response.firstName,
            },
          ],
          function (err) {
            if (err) throw err;
            console.log("Updated role!");
            startPrompt();
          }
        );
      });
  });
};

const addDepartment = () => {
  db.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "department",
          type: "input",
          message: "New department name?",
        },
      ])
      .then(function (response) {
        db.query(
          "INSERT INTO departments SET ?",
          {
            department_name: response.department,
          },
          function (err) {
            if (err) throw err;
            console.log("Department added!");
            startPrompt();
          }
        );
      });
  });
};

const addRole = () => {
  db.query("SELECT * FROM departments;", (err, res) => {
    if (err) {
      throw err;
    }
    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What is the role title?",
        },
        {
          name: "roleSalary",
          type: "input",
          message: "What is the role salary?",
        },
        {
          name: "roleDepartment",
          type: "list",
          message: "What department does this role belong to?",
          choices: res.map((department) => department.department_name),
        },
      ])
      .then((response) => {
        const departmentSelected = res.find(
          (department) => department.department_name === response.roleDepartment
        );
        db.query(
          "INSERT INTO roles SET ?",
          {
            title: response.roleTitle,
            salary: response.roleSalary,
            department_id: departmentSelected.id,
          },
          (err) => {
            if (err) {
              throw err;
            }
            console.log("New role has been added.");
            startPrompt();
          }
        );
      });
  });
};
