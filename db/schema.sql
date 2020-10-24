DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departmentTBL (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR (100)
);

CREATE TABLE roleTBL(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    empl_title VARCHAR(100),
    empl_salary DECIMAL,
    dept_id INTEGER,
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departmentTBL(id) ON DELETE SET NULL
);

CREATE TABLE employeeTBL(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roleTBL(id) ON DELETE CASCADE,
    CONSTRAINT pk_manager FOREIGN KEY (manager_id) REFERENCES employeeTBL(id) ON DELETE SET NULL
);
