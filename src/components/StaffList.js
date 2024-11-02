import React from 'react';

const StaffList = ({ staff }) => {
  if (staff.length === 0) {
    return <p>No Staff Members...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {staff.map((person, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center p-4"> {/* Center the image */}
            <img
              className="rounded-full"
              src={person.image}
              alt={person.name}
              style={{ maxWidth: '150px', width: '100%', height: 'auto' }}
            />
          </div>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {person.name}
              </h5>
              <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                {person.age} year old {person.gender}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <ol className="flex gap-x-2 underline">
                {person.qualifications.map(qual => {
                  if (qual.specificQualification !== "Others") {
                    return <li key={qual.specificQualification}>{qual.specificQualification}</li>;
                  }
                  return null;
                })}
              </ol>
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <ol>
                {person.skills.map(skill => (
                  <li key={skill.name}>{skill.level} at {skill.name}</li>
                ))}
              </ol>
            </p>
            <a target="_blank" href={`https://wa.me/+9779761895927?text=Hello,%20I%20want%20to%20hire%20${encodeURIComponent(person.name)}.`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Contact
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
