import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between login and sign-up form

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy login check (you can replace this with real authentication logic)
    if (email === 'user@example.com' && password === 'password') {
      setErrorMessage('');
      alert('Login successful');
      localStorage.setItem('user', JSON.stringify({ email, avatar: '/path-to-avatar.jpg' })); // Simulating user info
      window.location.href = '/'; // Example redirect
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy sign-up check (you can replace this with real sign-up logic)
    if (email && password) {
      setErrorMessage('');
      alert('Account created successfully');
      // Handle further sign-up logic here
    } else {
      setErrorMessage('Please fill all fields');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Create Account' : 'Login'}</h2>

        {/* If it's the Sign-Up form, add the name field */}
        {isSignUp && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}

        <button type="submit" className="w-full py-2 bg-harmony-600 text-white rounded-md hover:bg-harmony-700">
          {isSignUp ? 'Create Account' : 'Login'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          {isSignUp ? (
            <>
              Already have an account? 
              <span 
                onClick={() => setIsSignUp(false)} 
                className="text-harmony-600 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account? 
              <span 
                onClick={() => setIsSignUp(true)} 
                className="text-harmony-600 hover:underline cursor-pointer"
              >
                Create one here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
