-- Create a new table
CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT 0,
);

-- Insert some tasks
INSERT INTO tasks (title, description, is_completed) VALUES
    ('Complete Project Report', 'Finish the project report for the upcoming deadline.', 0);

-- Update a task to completed
UPDATE tasks SET is_completed = 1 WHERE task_id = 1;

-- Get all tasks
SELECT * FROM tasks;

-- Delete a task
DELETE FROM tasks WHERE task_id = 1;

-- Not completed tasks
SELECT * FROM tasks WHERE is_completed = 0;

-- Completed tasks
SELECT * FROM tasks WHERE is_completed = 1;

-- Update a task
UPDATE tasks SET title = 'Complete Project Report' WHERE task_id = 1;

-- Delete all tasks
DELETE FROM tasks;

-- Drop the table
DROP TABLE tasks;