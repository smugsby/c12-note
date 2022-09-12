--import employee.sql
USE employeesDB;
--db/row
INSERT INTO departments (departmentName)
VALUES ("EXEC"),("TECH"),("FINANCE")
INSERT INTO roles (roleName,salary,departmentId)
--matching to 5-6
VALUES ("MANAGER",10,1),("SALES",5,3),("TRAINEE",1,2)
INSERT INTO employees (firstName,lastName,roleId,managerId)
--ceo role/ non CEO and any other assign manager of not NULL
VALUES ("Susan","Johsnon",1,NULL)
