DROP DATABASE IF EXISTS employeesDB; 
CREATE DATABASE employeesDB;

USE employeesDB;
-- creates dept table
CREATE TABLE departments(
    -- if id is not blank auto increase
    id INT NOT NULL AUTO_INCREMENT,
    --pw.lentght
    departmentName VARCHAR(10) NOT NULL,
    PRIMARY KEY (id) 
);
CREATE TABLE roles(
    -- if id is not blank auto increase
    id INT NOT NULL AUTO_INCREMENT,
    --pw.lentght
    roleName VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departmentId INT NOT NULL,    
    PRIMARY KEY (id) 
);
CREATE TABLE employees(
    -- if id is not blank auto increase
    id INT NOT NULL AUTO_INCREMENT,
    --pw.lentght
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT NOT NULL,
    --leave NOT NULL because of no manager situations- IE a manager
    managerId INT.
    PRIMARY KEY (id),
    --checks role id for reference vs id
    FOREIGN KEY (roleId) REFERENCE roles(id)
);
