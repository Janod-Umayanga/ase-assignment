const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  
  try {

    // Log the input data for debugging
    console.log("Received data:", { firstname, lastname, username, password });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // SQL query to insert a new user
    const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?)';
    db.execute(sql, [firstname, lastname, username, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          // Handle duplicate username error (for MySQL)
          return res.status(409).send('Username already exists');
        } else {
          return res.status(500).send('An unexpected error occurred');
        }
        //return res.status(500).send(err);
      }
      res.status(201).send({ message: 'User registered successfully!' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Login a user
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  
  const sql = 'SELECT * FROM users WHERE username = ?';
  
  db.execute(sql, [username], async (err, results) => {
    if (err) return res.status(500).send(err);
    
    if (results.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    const user = results[0];
    
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    
    // Generate JWT and respond
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
  });
};

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