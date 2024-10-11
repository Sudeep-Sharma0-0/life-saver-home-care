import { useState } from 'react';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      // Redirect to login page or handle successful logout
      window.location.href = '/admin/login'; // Redirecting to login page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleLogout}
        disabled={loading}
        className={`bg-red-500 text-white font-bold py-2 px-4 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

export default LogoutButton;
