import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // For React Router v5

const Dashboard = () => {
  const [showPlot, setShowPlot] = useState(false);
  const history = useHistory();
 const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // 🔴 new state for popup


  const handleGeneratePlot = () => {
    setShowPlot(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear the token
    history.push("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* ✅ Top Bar with Logout button */}
      <div className="flex justify-end p-4 bg-white shadow">
        <button
          onClick={() => setShowLogoutConfirm(true)} // open confirmation modal
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* ✅ Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Dashboard main content */}
      <div className="text-center p-8">
        <h2
          style={{
            fontWeight: "700",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "2rem",
            marginBottom: "20px",
          }}
        >
          Welcome to the Dashboard
        </h2>

        <button
          onClick={handleGeneratePlot}
          className="px-6 py-2 my-5 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Generate Plot
        </button>

        {showPlot && (
          <iframe
            title="Dash Plot"
            src="http://localhost:8050"
            width="100%"
            height="500px"
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;