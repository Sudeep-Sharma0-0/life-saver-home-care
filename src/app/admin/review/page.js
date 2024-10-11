"use client";
import LogoutButton from '@/components/LogoutBtn';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Adjust the path to your supabase client

const ReviewModal = ({ application, closeModal, acceptApplication }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-auto max-h-[90vh] overflow-auto p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Reviewing: {application.name}
        </h2>

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-600">Personal Details</h3>
            <p className="text-gray-700"><strong>Name:</strong> {application.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {application.email}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {application.phone}</p>
            <p className="text-gray-700"><strong>Age:</strong> {application.age}</p>
            <p className="text-gray-700"><strong>Gender:</strong> {application.gender}</p>
          </div>
          <div className="flex items-center justify-center">
            {application.image && (
              <img
                src={application.image}
                alt="Applicant"
                className="h-32 w-32 object-cover rounded-full border-2 border-indigo-500"
              />
            )}
          </div>
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-indigo-600">Qualifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {application.qualifications.map((qual, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Institution:</strong>qual.institution</p>
                <p className="text-gray-700"><strong>Degree:</strong> {qual.degreeType}</p>
                <p className="text-gray-700"><strong>Qualification:</strong> {qual.qualification}</p>
                <p className="text-gray-700"><strong>Years:</strong> {qual.yearsFrom} - {qual.yearsTo}</p>
                {qual.certificate && (
                  <img
                    src={qual.certificate}
                    alt="Certificate"
                    className="mt-2 h-24 w-24 object-cover rounded-lg border-2 border-indigo-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-indigo-600">Skills</h3>
          <ul className="list-disc list-inside text-gray-700">
            {application.skills.map((skill, index) => (
              <li key={index} className="ml-4">{skill.name} - {skill.category} ({skill.level})</li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-indigo-600">Experience</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {application.experience.map((exp, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Position:</strong> {exp.position}</p>
                <p className="text-gray-700"><strong>Company:</strong> {exp.company}</p>
                <p className="text-gray-700"><strong>Period:</strong> {exp.startDate} to {exp.endDate}</p>
                <p className="text-gray-700"><strong>Details:</strong> {exp.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
            onClick={acceptApplication}
          >
            Accept Application
          </button>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
            onClick={closeModal}
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewPage = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState([]); // State for applications
  const [error, setError] = useState(null); // State for errors

  // Fetch applications from Supabase
  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase.from('applications').select('*');
      if (error) {
        setError(error);
      } else {
        setApplications(data);
      }
    };

    fetchApplications();
  }, []); // Empty dependency array to run only on mount

  console.log(applications);

  const handleReviewClick = (application) => {
    setSelectedApplication(application);
  };

  const closeModal = () => {
    setSelectedApplication(null);
  };

  const handleAcceptApplication = () => {
    closeModal();
  };

  return (
    <div className="container mx-auto p-8">
      <LogoutButton />
      <h1 className="text-3xl font-bold mb-8">Application Review</h1>

      {/* Application List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {applications.map((app, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">{app.name}</h2>
            <p>Email: {app.email}</p>
            <p>Phone: {app.phone}</p>
            <p>Age: {app.age}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleReviewClick(app)}
            >
              Review Application
            </button>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedApplication && (
        <ReviewModal 
          acceptApplication={handleAcceptApplication} 
          application={selectedApplication} 
          closeModal={closeModal} 
        />
      )}
    </div>
  );
};

export default ReviewPage;
