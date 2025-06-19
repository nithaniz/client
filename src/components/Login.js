import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../services/api';
import { apiEndpoints } from '../services/constants';
import FAIcons from './ui/Icons';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      
     const response = await api.post(apiEndpoints.login, formData);


      
      const { user, token } = response.data;

      // Store token or user info if needed
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('username', user.username);

      // Redirect
      user.role === 'admin' ? history.push('/AdminPanel') : history.push('/LandingPage');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div className="min-h-screen flex teal-800">
      {/* Left Side */}
      <div className="flex-1 flex flex-col items-center justify-center bg-teal-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-4">BladeRunner Login</h1>
        <p className="text-lg text-center">
          Welcome back!<br></br> enter your credentials to access your account.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

          {error && (
            <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center border rounded-md px-3 py-2">
            <FAIcons.FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center border rounded-md px-3 py-2">
            <FAIcons.FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-600 hover:bg-teal-900 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal-700 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-4 text-sm text-center text-gray-600">
            {' '}
            <Link to="/ForgotPassword" className="text-teal-700 hover:underline">
              ForgotPassword ?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Login;
