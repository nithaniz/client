import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { BASE_URL, apiEndpoints } from '../services/constants';


function ResetPassword() {
  const { token } = useParams(); // get token from URL
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
 const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}${apiEndpoints.resetPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, token }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
  setTimeout(() => history.push('/login'), 3000);
}
      
    } catch (error) {
      setMessage('Error resetting password. Try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
