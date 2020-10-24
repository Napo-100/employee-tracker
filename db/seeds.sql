INSERT INTO departments (dept_name)
VALUES 
("Middle Earth"),
("The Shire"),
("Rivendell"),
("Gondor"),
("Khazad-dum"),
("Mordor");

INSERT INTO roles (empl_title, empl_salary, dept_id)
VALUES 
("Wizard", 100000.00, 1),
("Hobbit", 50000.00, 2),
("Elf", 80000.00, 3),
("Man", 40000.00, 4),
("Dwarf", 150000.00, 5),
("Evil", 20000.00, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Gandalf", "Grey Beard", 1, null),
("Sauron", "The Deceiver", 6, null),
("Aragorn", "Elessar", 4, null),
("Elrond", "Peredhel", 3, null),
("Frodo", "Baggins", 2, null),
("Saruman", "The White", 6, 2),
("Legolas", "Greenleaf", 3, 1),
("Gimli", "Son of Gloin", 5, 1),
("Arwen", "Undomiel", 3, 4),
("Samwise", "Gamgee", 2, 5),
("Pippin", "Took", 2, 5),
("Merry", "Brandybuck", 2, 5),
("Boromir", "Son of Denethor", 4, 3),
("Theoden", "Ednew", 4, 2),
("Eowyn", "NoMan", 4, 2),
("Gollum", "Smeagol", 2, 2),
("Nazgul", "Ringwraith", 6, 2),
("Uruk", "Hai", 6, 2),
("Orc", "Goblin", 6, 2);
