import React from 'react';

const StaffList = ({ staff }) => {
  console.log(staff);
  if (staff.length === 0) {
    return <p>Leading Staff Members...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {staff.map((person, index) => (
        <div key={index} className="p-4 border rounded-lg flex flex-col justify-between items-center shadow-md hover:shadow-lg transition-shadow duration-300">
          <img
            src={person.image}
            alt={person.name}
            className="w-32 h-32 object-cover mb-4 rounded-full"
          />
          <h2 className="text-xl font-semibold">{person.name}</h2>
          {person.experiences.map((exp, index) => {
            if (index < 3) return <p key={index} className="text-sm overflow-hidden whitespace-nowrap text-ellipsis max-w-64 text-center text-gray-600">{index+1}. {exp}</p>
          })}
          <p className="">{parseInt(person.experience_year) >= 12 ? `${person.experience_year / 12} years of experience` : `${person.experience_year} months of experience`}</p>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
