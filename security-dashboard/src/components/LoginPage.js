import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setAuth(true);
          localStorage.setItem('username', data.username);
          localStorage.setItem('auth', 'true');
          navigate('/');
        } else {
          setError('Invalid username or password');
        }
      });
  };

  return (
    <div className='container'>
    <div className="login-page">
      <h1 className="title">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <div className='input-icon'>
            <i className='fa fa-user'></i>
            <input
              id='username'
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-group">
          <div className='input-icon'>
            <i className='fa fa-lock'></i>
            <input
              id='password'
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}
    
        <button type="submit" className="login-button">Login</button>
        <p className='make-account'>Don't have an account? <a href="/create-user" className='create-user'>Create one</a></p>
      </form>
      
      
    </div>
    </div>
  );
};

export default LoginPage;
