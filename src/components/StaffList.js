import React from 'react';

const StaffList = ({ staff }) => {
  if (staff.length === 0) {
    return <p>No staff members found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 z-10">
      {staff.map((person, index) => (
        <div key={index} className="p-4 border rounded-lg flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src={person.photo}
            alt={person.name}
            className="w-32 h-32 object-cover mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold">{person.name}</h2>
          <p className="text-sm text-gray-600">{person.qualifications}</p>
          <p className="text-sm text-gray-600">{person.experience} years of experience</p>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
