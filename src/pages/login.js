// src/components/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Validate username (email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError('Invalid email format');
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@]+$/;
    if (!passwordRegex.test(password)) {
      setError('Invalid password format');
      return;
    }

    // Check if password is correct
    if (password === 'SmartServTest@123') {
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      setError('Incorrect password');
    }
  };

  const handleForgotPassword = () => {
    window.location.href = 'mailto:support@smartserv.io?subject=Password Reset';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white  rounded shadow-md p-4 md:p-8 md:w-96 md:h-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          {/* <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label> */}
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username'
          />
        </div>
        <div className="mb-4">
          {/* <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label> */}
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-2 text-blue-500 cursor-pointer underline text-center text-sm" onClick={handleForgotPassword}>
          Forgot your password?
        </p>
      </div>
    </div>
  );
};

export default Login;
