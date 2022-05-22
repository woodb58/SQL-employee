USE employeeTracker;

INSERT INTO departments (id, name)
VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'Salesperson', '80000', 1),
(2, 'Sales Manager', '160000', 1),
(3, 'Senior Engineer', '150000', 2),
(4, 'Junior Engineer', '120000', 2),
(5, 'Manager Software', '180000', 2),
(6, 'Accountant', '125000', 3),
(7, 'Lawyer', '200000', 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Ted', 'Teddington', 4, 5),
(2, 'Fred', 'Freddington', 1, 2),
(3, 'Jed', 'Jeddington', 1, 2),
(4, 'Ned', 'Neddington', 3, 5),
(5, 'Zed', 'Zeddifer', 6, 6),
(6, 'Led', 'McLedough', 5, 5),
(7, 'Bred', 'Sourdough', 7, 7),
(8, 'Ged', 'Gederson', 2, 3),
(9, 'Unled', 'Gasington', 3, 5),
(10, 'Kevin', 'McCallister', 4, 5);