-- Insert secretaries into the `employees` table
INSERT INTO employees (user_id, departement_id, job, is_secretary, created_at, updated_at)
VALUES 
((SELECT id FROM users WHERE email = 'john.doe@example.com'), (SELECT id FROM departments WHERE name = 'HR'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'jane.smith@example.com'), (SELECT id FROM departments WHERE name = 'Finance'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'mike.jones@example.com'), (SELECT id FROM departments WHERE name = 'IT'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'lisa.wong@example.com'), (SELECT id FROM departments WHERE name = 'Marketing'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'david.lee@example.com'), (SELECT id FROM departments WHERE name = 'Sales'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'susan.park@example.com'), (SELECT id FROM departments WHERE name = 'Customer Service'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'kevin.brown@example.com'), (SELECT id FROM departments WHERE name = 'Operations'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'nancy.wilson@example.com'), (SELECT id FROM departments WHERE name = 'R&D'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'george.miller@example.com'), (SELECT id FROM departments WHERE name = 'Legal'), 'Secretary', 1, '2024-09-04', '2024-09-04'),
((SELECT id FROM users WHERE email = 'emma.davis@example.com'), (SELECT id FROM departments WHERE name = 'Admin'), 'Secretary', 1, '2024-09-04', '2024-09-04');
