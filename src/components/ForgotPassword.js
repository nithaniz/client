import React, { useState } from 'react';
import api from '../services/api';
import { BASE_URL, apiEndpoints } from '../services/constants';
import { useHistory,  Link  } from 'react-router-dom';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}${apiEndpoints.forgotPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      setMessage(data.message || 'Check your email for reset instructions.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Enter your email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
         
          <Link to="/ResetPassword" className="text-sky-700 hover:underline">
            Reset
          </Link>
        
      </div>
    </div>
  );
}

export default ForgotPassword;
