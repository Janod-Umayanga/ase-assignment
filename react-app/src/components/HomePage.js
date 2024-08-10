import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../redux/slices/userSlice';

const HomePage = () => {

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('token');
    localStorage.removeItem('username');

    dispatch(logout());
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to the User Management System! {user ? user.username : "Please Login"}</h1>
      <div style={styles.links}>
        {user ? <button onClick={handleLogout} style={styles.button}>Logout</button> : <Link to="/login" style={styles.link}>Login</Link>}
        {user ? <Link to="/users" style={styles.link}>User Management</Link> : <Link to="/register" style={styles.link}>Register</Link>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  links: {
    marginTop: '20px',
  },
  link: {
    margin: '10px',
    padding: '10px 20px',
    textDecoration: 'none',
    background: '#28a745',
    color: '#FFF',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    background: '#28a745',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
  }
};

export default HomePage;