import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BASE_URL, apiEndpoints } from '../services/constants';
import FAIcons from './ui/Icons';

const AdminLogin = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
       const response = await fetch(`${BASE_URL}${apiEndpoints.adminLogin}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
  
    
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin', 'true');
        history.push('/AdminPanel');
      } else {
        setError(data.message || 'Admin login failed.');
      }
    } catch {
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email field with icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FAIcons.FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="flex-1 outline-none"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password field with icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FAIcons.FaLock className="text-gray-400 mr-3" />
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="flex-1 outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  </div>
);
}
export default AdminLogin;

