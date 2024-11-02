"use client";
import LogoutButton from '@/components/LogoutBtn';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Adjust the path to your Supabase client
import { useRouter } from 'next/navigation'; // Import useRouter
import LoadingSpinner from '@/components/Loading';

const ReviewPage = () => {
  const router = useRouter(); // Initialize useRouter
  const [applications, setApplications] = useState([]); // State for applications
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch applications from Supabase
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('applications').select('*');
      if (error) {
        setError(error.message);
      } else {
        setApplications(data);
      }
      setLoading(false);
    };

    fetchApplications();
  }, []); // Empty dependency array to run only on mount

  const handleReviewClick = (applicationId) => {
    // Navigate to the application review page using the application's ID
    router.push(`review/${applicationId}`);
    setLoading(true);
  };

  return (
    <div className="container mx-auto p-8">
      {loading ? <LoadingSpinner /> : ""}
      <LogoutButton />
      <h1 className="text-3xl font-bold mb-4">Applications</h1>

      {loading && <p>Loading applications...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {applications.len > 0 ?
          applications.map((app) => (
            <li key={app.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{app.name}</h2>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <button
                onClick={() => handleReviewClick(app.id)} // Pass application ID
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
              >
                Review Application
              </button>
            </li>
          )) : "No Applications Submitted!"}
      </ul>
    </div>
  );
};

export default ReviewPage;
