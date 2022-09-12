//const mysql = require("mysql");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
//connecting to server that's running
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    //link database like src
    password: "EosM200!",
    database: "employeesDB",
})

const runApp = () => {
    inquirer.prompt({
        name: "start",
        type: "list",
        message: "This is how we ROLLLLLLLL!!!!",
        choices: [
            "View Employees",
            "Add Employee",
            "Update Employee Role"
        ]
        //.then as res and arrow function for next
    }).then((res) => {
        if (res.start == "View Employees") {
            empView()
        }
        else if (res.start == "Add Employee") {
            employeeAdd()
        }
        else if (res.start == "Update Employee Role") {
            employeeUpdate()
        }
        else {
            //if not then end
            connection.end();
        }
    })
};
//query for sql connection
const empView = () => {
    //mysql syntax SLECT firstName, managerId etc
    let query = "SELECT firstName, lastName FROM employees ORDER BY lastName";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Employees:', res);
        inquirer.prompt({
            name: "next",
            type: "confirm",
            message: "Do you want to return?",
        }).then((res) => {
            if (res.next) {
                runApp();
            }
            else {
                //kill connection and function
                connection.end();
            }
        })
    })
}
function employeeAdd(){
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        inquirer.prompt([{
            name: "firstName",
            type: "input",
            message: "first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "last name?",
        }, {
            name: "managerId",
            type: "input",
            message: "manager Id?",
        }, {
            name: "roleId",
            type: "list",
            message: "Which role?",
            choices: function () {
                //return response from connection
                return res.map(role => ({
                    name: role.roleName,
                    value: role.id,
                }))
            }
        }]).then(function(answer){
            connection.query("INSERT INTO employees SET ?",{
                firstName: answer.firstName,
                lastName: answer.lastName,
                managerId: answer.managerId,
                roleId: answer.roleId,
            },
            function(err){
                if (err) throw err;
                runApp()
            }
            )
        }
        )
    })
}
function employeeUpdate(){
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        inquirer.prompt([{
            name: "empId",
            type: "input",
            message: "what is emp id?",
        },
        {
            name: "updateRole",
            type: "list",
            message: "What is the new role?",
            choices: function () {
                //return response from connection
                return res.map(role => ({
                    name: role.roleName,
                    value: role.id,
                }))
            }
        }]).then(function(answer){
            connection.query("UPDATE employees SET ? WHERE ?",[
                {
                    roleId: answer.updateRole
                },
                {
                    id: answer.empId
                }
            ],
            function(err){
                if (err) throw err;
                runApp()
            }
            )
        }
        )
    })
}
//call function for node start
runApp()