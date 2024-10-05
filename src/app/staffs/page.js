"use client";

import React, { useState, useEffect } from 'react';
import StaffList from '@/components/StaffList';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [filterExp, setFilterExp] = useState(''); // Example: filtering by experience level

  // Simulate fetching from a database
  useEffect(() => {
    const fetchStaff = async () => {
      const data = [
        { name: 'John Doe', qualifications: 'MSc Nursing', experience: 5, photo: '/images/john.jpg' },
        { name: 'Jane Smith', qualifications: 'BSc Nursing', experience: 3, photo: '/images/jane.jpg' },
        { name: 'Michael Brown', qualifications: 'Diploma in Care', experience: 8, photo: '/images/michael.jpg' },
      ];
      setStaff(data);
      setFilteredStaff(data); // Initialize with all staff members
    };
    
    fetchStaff();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = staff.filter((person) =>
      person.name.toLowerCase().includes(term) ||
      person.qualifications.toLowerCase().includes(term)
    );
    setFilteredStaff(filtered);
  };

  // Handle sorting by experience
  const handleSort = () => {
    const sorted = [...filteredStaff].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.experience - b.experience;
      }
      return b.experience - a.experience;
    });
    setFilteredStaff(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle filtering by experience
  const handleFilter = (e) => {
    const exp = e.target.value;
    setFilterExp(exp);
    
    const filtered = staff.filter((person) => {
      if (exp === '') return true; // No filter applied
      return person.experience.toString() === exp;
    });

    setFilteredStaff(filtered);
  };

  return (
    <main className="p-4 h-full">
      <h1 className="text-2xl font-bold mb-4">Our Staff Members</h1>

      <div className="flex flex-col sm:flex-row mb-4 gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search staff..."
          className="border rounded-lg p-2 flex-1"
        />

        <select value={filterExp} onChange={handleFilter} className="border rounded-lg p-2">
          <option value="">All Experience Levels</option>
          <option value="1">1 Year</option>
          <option value="3">3 Years</option>
          <option value="5">5 Years</option>
          <option value="8">8 Years</option>
        </select>

        <button onClick={handleSort} className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600">
          Sort by Experience ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      <StaffList staff={filteredStaff} />
    </main>
  );
};

export default StaffPage;
