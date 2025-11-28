// Start the server with: node src/components/server-side/server.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB_NAME,
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }
  console.log("Connected to MySQL");

  // Create tables
  const createListsTable = `
    CREATE TABLE IF NOT EXISTS lists (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      list_id INT NOT NULL,
      text VARCHAR(255) NOT NULL,
      completed TINYINT(1) NOT NULL DEFAULT 0,
      FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
    );
  `;

  db.query(createListsTable, (err) => {
    if (err) console.error("Error creating lists table:", err);
    else console.log("Lists table OK");
  });

  db.query(createTasksTable, (err) => {
    if (err) console.error("Error creating tasks table:", err);
    else console.log("Tasks table OK");
  });
});


// Lists endpoints

// Get all lists
app.get("/lists", (req, res) => {
  db.query("SELECT id, name FROM lists ORDER BY id", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add list
app.post("/lists", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO lists (name) VALUES (?)", [name || "New List"], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    const insertedId = result.insertId;
    res.status(201).json({ id: insertedId, name: name || "New List" });
  });
});

// Rename list
app.put("/lists/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  db.query("UPDATE lists SET name = ? WHERE id = ?", [name, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: Number(id), name });
  });
});

// Delete list
app.delete("/lists/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM lists WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});

// Tasks endpoints

// Get tasks for list
app.get("/lists/:id/tasks", (req, res) => {
  const listId = req.params.id;
  db.query("SELECT id, list_id AS listId, text, completed FROM tasks WHERE list_id = ? ORDER BY id", [listId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const tasks = results.map((r) => ({ id: r.id, text: r.text, completed: !!r.completed }));
    res.json(tasks);
  });
});

// Add task
app.post("/lists/:id/tasks", (req, res) => {
  const listId = req.params.id;
  const { text } = req.body;
  db.query("INSERT INTO tasks (list_id, text, completed) VALUES (?, ?, 0)", [listId, text], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    const insertedId = result.insertId;
    res.status(201).json({ id: insertedId, text, completed: false });
  });
});

// Toggle task completion / update task
app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { completed, text } = req.body;
  const updates = [];
  const params = [];
  if (typeof completed === "boolean") {
    updates.push("completed = ?");
    params.push(completed ? 1 : 0);
  }
  if (typeof text === "string") {
    updates.push("text = ?");
    params.push(text);
  }
  if (updates.length === 0) return res.status(400).json({ error: "Nothing to update" });
  params.push(taskId);
  const sql = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ?`;
  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: Number(taskId), ...(typeof completed === "boolean" ? { completed } : {}), ...(typeof text === "string" ? { text } : {}) });
  });
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});

// Delete completed tasks for a list
app.delete("/lists/:id/tasks/completed", (req, res) => {
  const listId = req.params.id;
  db.query("DELETE FROM tasks WHERE list_id = ? AND completed = 1", [listId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});

// Clear all tasks for a list
app.delete("/lists/:id/tasks", (req, res) => {
  const listId = req.params.id;
  db.query("DELETE FROM tasks WHERE list_id = ?", [listId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));