import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { BASE_URL, apiEndpoints } from '../services/constants';
import axios from 'axios';

const AdminPanel = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const history = useHistory();

  // Fetch all users function memoized
  const fetchAllUsers = useCallback(async () => {
    try {
       const res = await fetch(`${BASE_URL}${apiEndpoints.AdminPanel}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(res.data);
    } catch (err) {
      console.error('Error fetching all users:', err);
      setError(err.response?.data?.message || 'Failed to fetch all users');
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        history.push('/AdminPanel');
      }
    }
  }, [token, history]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('http://localhost:5000/api/admin/pending-users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingUsers(res.data);
      } catch (err) {
        console.error('Error fetching pending users:', err);
        setError(err.response?.data?.message || 'Something went wrong');
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          history.push('/AdminPanel');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
    fetchAllUsers();
  }, [fetchAllUsers, token, history]);

  // Approve user function
  const approveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve-user/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Refresh both lists after approval
      fetchAllUsers();
      const res = await axios.get('http://localhost:5000/api/admin/pending-users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingUsers(res.data);
    } catch (err) {
      console.error('Error approving user:', err);
      setError(err.response?.data?.message || 'Failed to approve user');
    }
  };

  const goToLanding = () => {
    history.push('/LandingPage');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow p-4 text-center text-2xl font-bold text-gray-800">
        Admin Panel
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
        {/* Error Message */}
        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</p>
        )}

        {/* Pending Users Section */}
        <section className="mb-10 w-full">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Pending Users</h2>
  {loading ? (
    <p>Loading...</p>
  ) : pendingUsers.length === 0 ? (
    <p className="text-gray-600">No pending users.</p>
  ) : (
    <div className="w-full">
      <ul className="space-y-4 w-full">
        {pendingUsers.map((user) => (
          <li
            key={user.id}
            className="w-full flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 shadow-sm"
          >
            <span className="text-gray-700">
              {user.username}{' '}
              <span className="text-sm text-gray-500">
                ({user.role || 'No role'})
              </span>
            </span>
            <button
              onClick={() => approveUser(user.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition"
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  )}
</section>

        {/* All Users Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">All Users</h2>
          {allUsers.length === 0 ? (
            <p className="text-gray-600">No users found.</p>
          ) : (
            <ul className="space-y-2 text-gray-700">
              {allUsers.map((user) => (
                <li key={user.id} className="border-b border-gray-200 pb-2">
                  <span className="font-medium">{user.email}</span> – {user.username} ({user.role})
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Landing Button */}
        <button
          onClick={goToLanding}
          className="block w-full bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md font-semibold transition"
        >
          Go to Landing Page
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md shadow-inner text-center p-3 text-sm text-gray-500 mt-6">
        &copy; {new Date().getFullYear()} Admin Panel
      </footer>
    </div>
  );
};

export default AdminPanel;