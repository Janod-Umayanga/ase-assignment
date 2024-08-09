const db = require('../config/db');

// Create a new user
exports.createUser = (req, res) => {
  const { firstname, lastname } = req.body;
  const query = 'INSERT INTO users (firstname, lastname) VALUES (?, ?)';
  db.query(query, [firstname, lastname], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, firstname, lastname });
  });
};

// Get all users
exports.getAllUsers = (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(result[0]);
  });
};

// Update a user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;
  const query = 'UPDATE users SET firstname = ?, lastname = ? WHERE id = ?';
  db.query(query, [firstname, lastname, id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ id, firstname, lastname });
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  });
};