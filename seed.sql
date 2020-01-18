INSERT INTO department (name)
VALUES ("Operations");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Human Resources");
INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Director of Operations", 95000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 75000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("CFO", 12000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Marketing Manager", 95000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Cory", "Marshman", 1)