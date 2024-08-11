import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import UserManagementPage from './components/UserManagementPage';

import { useDispatch } from 'react-redux';
import { login } from './redux/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      dispatch(login({
        username: username,
        token: token
      }));
    }
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UserManagementPage />} />
      </Routes>
    </Router>
  );
};

export default App;