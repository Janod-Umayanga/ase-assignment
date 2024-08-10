import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validateForm(username, password) {
    if(username === '' || password === '') {
        setErrorMessage('Please fill in all the details');
        return false;
    } else {
        setErrorMessage('');
        return true;
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateForm(username, password)) {
      axios.post('http://localhost:8080/api/login', {username, password}).then((res) => {
        if (res.status === 200) {
          const token = res.data.token;

          localStorage.setItem('token', token);
          localStorage.setItem('username', username);

          dispatch(login({
            username: username,
            token: token
          }));

          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
    }
  };

  const user = useSelector(selectUser);

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>Login</h2>
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
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button><br/>
        <span style={styles.span}>{errorMessage}</span>
      </div>
    );
  } else {
    return (
      <div style={styles.container}>
        <h2>Already Logged In</h2>
      </div>
    );
  }
}

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

export default LoginPage;