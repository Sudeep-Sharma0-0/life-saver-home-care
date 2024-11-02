"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for navigation
import { supabase } from '@/lib/supabase'; // Adjust the path to your Supabase client
import LoadingSpinner from '@/components/Loading';

const ApplicationReviewPage = ({ params }) => {
  const { id } = params;
  const router = useRouter(); // Initialize router for navigation
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the application details based on the id
  useEffect(() => {
    const fetchApplication = async () => {
      const { data: applicationData, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .single(); // Assuming 'id' is the unique identifier

      if (error) {
        setError(error.message);
      } else {
        setApplication(applicationData);
      }
      setLoading(false);
    };

    fetchApplication();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Reviewing: {application.name}</h1>

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
          {application.qualifications && application.qualifications.map((qualString, index) => {
            // Parse the qualification string if it's in JSON format
            let qual;
            try {
              qual = typeof qualString === 'string' ? JSON.parse(qualString) : qualString;
            } catch (e) {
              console.error("Error parsing qualification:", e);
              qual = {}; // fallback to an empty object if parsing fails
            }

            return (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Institution:</strong> {qual.institution || 'N/A'}</p>
                <p className="text-gray-700"><strong>Degree:</strong> {qual.degreeType || 'N/A'}</p>
                <p className="text-gray-700"><strong>Qualification:</strong> {qual.qualification || 'N/A'}</p>
                <p className="text-gray-700"><strong>Years:</strong> {qual.yearsFrom || 'N/A'} - {qual.yearsTo || 'N/A'}</p>
                {qual.certificate && (
                  <img
                    src={qual.certificate}
                    alt="Certificate"
                    className="mt-2 h-24 w-24 object-cover rounded-lg border-2 border-indigo-500"
                  />
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-indigo-600">Skills</h3>
        <ul className="list-disc list-inside text-gray-700">
          {application.skills && application.skills.map((skillString, index) => {
            // Parse the skill string if it's in JSON format
            let skill;
            try {
              skill = typeof skillString === 'string' ? JSON.parse(skillString) : skillString;
            } catch (e) {
              console.error("Error parsing skill:", e);
              skill = {}; // fallback to an empty object if parsing fails
            }

            return (
              <li key={index} className="ml-4">
                {skill.name || 'N/A'} - {skill.category || 'N/A'} ({skill.level || 'N/A'})
              </li>
            );
          })}

        </ul>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-indigo-600">Experience</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {application.experience && application.experience.map((expString, index) => {
            // Parse the experience string if it's in JSON format
            let exp;
            try {
              exp = typeof expString === 'string' ? JSON.parse(expString) : expString;
            } catch (e) {
              console.error("Error parsing experience:", e);
              exp = {}; // fallback to an empty object if parsing fails
            }

            return (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Position:</strong> {exp.position || 'N/A'}</p>
                <p className="text-gray-700"><strong>Company:</strong> {exp.company || 'N/A'}</p>
                <p className="text-gray-700"><strong>Period:</strong> {exp.startDate || 'N/A'} to {exp.endDate || 'N/A'}</p>
                <p className="text-gray-700"><strong>Details:</strong> {exp.details || 'N/A'}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          // Handle accepting the application (implement your logic here)
          onClick={async () => {
            setLoading(true);
            const { error: deleteError } = await supabase
              .from('applications')
              .delete()
              .eq('id', application.id);

            if (deleteError) {
              console.error('Error deleting application:', deleteError.message);
              setLoading(false);
              return;
            }

            const { error: insertError } = await supabase
              .from('staff_primary')
              .insert([application]); // Insert the entire application data

            if (insertError) {
              console.error('Error inserting to staff_primary:', insertError.message);
              setLoading(false);
              return;
            }

            setLoading(false);
            // Step 4: Optionally, show a success message or refresh the application list
            alert('Application accepted and added to staff!');
            router.back();
          }}
        >
          Accept Application
        </button>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
          // Use router to go back to the previous page
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ApplicationReviewPage;
