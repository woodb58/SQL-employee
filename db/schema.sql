-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS employeeTracker;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE employeeTracker;

USE employeeTracker;
-- create tables
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
)