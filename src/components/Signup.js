import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../services/api';
import { apiEndpoints } from '../services/constants';
import FAIcons from './ui/Icons';


function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await api.post(apiEndpoints.signup, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
         role: 'user'
      });
      history.push('/Login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex teal-500">
      {/* Left Side */}
      <div className="flex-1 flex flex-col items-center justify-center bg-sky-700 text-white p-4">
        <h1 className="text-4xl font-bold mb-4">BladeRunner </h1>
        <p className="text-lg text-center">
          register your Account here!
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create an Account</h2>

        {error && (
          <p className="text-red-600 mb-4 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="flex items-center border rounded-md px-3 py-2">
            <FAIcons.FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            </div>
          </div>
          

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

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="flex items-center border rounded-md px-3 py-2">
            <FAIcons.FaUserShield className="text-gray-400 mr-3" />
            <input
              type="password"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-gray-500"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Signup;

