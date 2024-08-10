const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user by ID
      const sql = 'SELECT id, firstname, lastname, username FROM users WHERE id = ?';
      db.execute(sql, [decoded.id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(401).send({ message: 'Not authorized' });
        req.user = results[0];
        next();
      });
    } catch (error) {
      return res.status(401).send({ message: 'Not authorized' });
    }
  }
  
  if (!token) {
    return res.status(401).send({ message: 'Not authorized, no token' });
  }
};