import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-8">
      <div className="bg-gray-700 rounded-xl shadow-lg p-10 max-w-3xl w-full text-white">
        <h1 className="text-5xl font-bold text-center mb-6">
          Welcome to <span className="text-teal-400">Blade Runner</span>
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Your one-stop solution for managing your tasks efficiently.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <button
            onClick={() => history.push('/login')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-10 rounded-lg shadow transition transform hover:scale-105"
          >
            Login
          </button>

          <button
            onClick={() => history.push('/signup')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-10 rounded-lg shadow transition transform hover:scale-105"
          >
            Sign Up
          </button>

          <button
            onClick={() => history.push('/AdminLogin')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-10 rounded-lg shadow transition transform hover:scale-105"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


