import React from 'react';
import { useHistory } from 'react-router-dom';


const LandingPage = () => {
  const history = useHistory();

  const goToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Blade Runner</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore drone operations and analytics in one place.
      </p>
      <button
        onClick={goToDashboard}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Explore Dashboard
      </button>
    </div>
  );
};

export default LandingPage;

