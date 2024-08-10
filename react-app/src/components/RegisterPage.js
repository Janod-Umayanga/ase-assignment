import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validateForm(firstname, lastname, username, password) {
    if(firstname === '' || lastname === '' || username === '' || password === '') {
        setErrorMessage('Please fill in all the details');
        return false;
    } else {
        setErrorMessage('');
        return true;
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if (validateForm(firstname, lastname, username, password)) {
        axios.post('http://localhost:8080/api/register', {firstname, lastname, username, password}).then((res) => {
            if(res.status === 201) {
                //navigate('/');
                alert('Register Successful');
            } else {
                alert('Register Failed');
            }
        }).catch((error) => {
            console.error('Register failed:', error);
        });
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleRegister} style={styles.button}>
        Register
      </button><br/>
      <span style={styles.span}>{errorMessage}</span>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  input: {
    display: 'block',
    margin: '10px auto',
    padding: '10px',
    width: '80%',
    maxWidth: '300px',
  },
  button: {
    padding: '10px 20px',
    background: '#28a745',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
  },
  span: {
    color: '#f56565',
    display: 'inline-block',
  }
};

export default RegisterPage;