  
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "(Heleen33!)",
  database: "employee_db"
});


connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
    inquirer
        .prompt({
            name: "create",
            type: "list",
            message: "Create a [Department], a [Role] or [Employee] or [View] the following.",
            choices: ["Department", "Role", "Employee", "View"]
        })
        .then(function(promtAnswers){
            if (promtAnswers.create === "Department") {
                addDepartment();
            }
            else if(promtAnswers.create === "Role") {
                addRole();
            }
            else if(promtAnswers.create === "Employee") {
                addEmployee();
            }
            else if(promtAnswers.create === "View") {
                viewData();
            }
            else{
                connection.end();
            }
        })
}
function addDepartment() {
    inquirer
      .prompt([
        {
          name: "division",
          type: "input",
          message: "Name of the department you'd like to add.",
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.division
          },
          function(err) {
            if (err) throw err;
            console.log("Your department was added!");
            start();
          }
        );
      });
  }

  function addRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "The title of the role you'd like to add.",
        },
        {
          name: "salary",
          type: "input",
          message: "The salary of the role you'd like to add.",
        },
        {
          name: "departmentId",
          type: "input",
          message: "The departmentId of the role you'd like to add.",
        }
      ])
      .then(function(answer) {

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.department,
            salary: answer.salary,
            department_id: answer.departmentId
          },
          function(err) {
            if (err) throw err;
            console.log("Your role was added!");
            start();
          }
        );
      });
  }

  function addEmployee() {
    inquirer
      .prompt([
        {
          name: "first",
          type: "input",
          message: "The first name of the employee you'd like to add.",
        },
        {
          name: "last",
          type: "input",
          message: "The last name of the employee you'd like to add.",
        },
        {
          name: "roleId",
          type: "input",
          message: "The role id of the employee you'd like to add."
        },
        {
          name: "managerId",
          type: "input",
          message: "The manager id of the employee you'd like to add.",
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: answer.roleId,
            manager_id: answer.managerId
          },
          function(err) {
            if (err) throw err;
            console.log("Your employee was added!");
            start();
          }
        );
      });
  }
  
  function viewData() {
    inquirer
      .prompt({
        name: "table",
        type: "list",
        message: "Select the table would you like to view.",
        choices: ["Department", "Role", "Employee"]
      })
      .then(function(answer) {
        if (answer.table === "Department") {
          viewDepartment();
        }
        else if(answer.table === "Role") {
          viewRole();
        } 
        else if(answer.table === "Employee") {
          viewEmployee();
        }
        else{
          connection.end();
        }
      });
  }

  function viewDepartment() {
    connection.query("SELECT * FROM department", function(err,res){
      if (err) throw err;
      console.table(res);
      start();
    })
  };
  
  function viewRole() {
    connection.query("SELECT * FROM role", function(err,res){
      if (err) throw err;
      console.table(res);
      start();
    })
  };
  
  function viewEmployee() {
    connection.query("SELECT * FROM employee", function(err,res){
      if (err) throw err;
      console.table(res);
      start();
    })
  };


