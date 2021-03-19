USE employees_DB;

INSERT INTO department(department_name)
VALUE ("Sales"), ("Web-Development"),("Human Resources");

INSERT INTO role(title, salary, department_id)
VALUE ("Sales Manager", 80000, 1),("Sales Rep", 90000, 1),("Senior Developer", 100000, 2), ("Junior Developer", 60000, 2),("HR Director", 80000, 3),("HR Manager", 70000, 3);

INSERT INTO employee(first_name, last_name, role_id)
VALUE ("John", "Smith", 1), ("John", "Paul", 2), ("Lisa", "Smith", 3), ("Nick", "Thomas", 1), ("Nicole", "Johnson", 4), ("Peter", "Parker", 5), ("Adam", "Wong", 6), ("Chris", "Hammer", 5), ("Hang", "Yu", 5), ("Allen", "Tang", 8), ("Vinh", "Huynh", 1), ("Michael", "Jackson", 4);