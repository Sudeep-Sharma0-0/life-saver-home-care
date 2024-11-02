"use client";

import React, { useState, useEffect } from 'react';
import StaffList from '@/components/StaffList';
import { supabase } from '@/lib/supabase';
import LoadingSpinner from '@/components/Loading';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch staff data from Supabase
  useEffect(() => {
    const fetchStaff = async () => {
      let { data, error } = await supabase
        .from('staff_primary')
        .select('*');

      if (error) {
        console.error('Error fetching staff:', error);
      } else {
        setStaff(data);
        setFilteredStaff(data); // Initialize with all staff members
      }
      setIsLoading(false);
    };

    fetchStaff();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterStaff(term, filter);
  };

  // Handle filtering
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    filterStaff(searchTerm, value);
  };

  // Filter staff based on search term and filter
  const filterStaff = (term, filter) => {
    const filtered = staff.filter((person) => {
      const matchesSearch = person.name.toLowerCase().includes(term);
      const matchesFilter = filter
        ? person.job_title === filter || person.qualifications.some(q => q.specificQualification === filter)
        : true;
      return matchesSearch && matchesFilter;
    });
    setFilteredStaff(filtered);
  };

  return (
    <main className="p-4 min-h-screen max-h-full">
      {isLoading ? <LoadingSpinner /> : ""}
      <h1 className="text-2xl font-bold mb-4">Our Staff Members</h1>

      <div className="flex flex-col sm:flex-row mb-4 gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search staff..."
          className="border rounded-lg p-2 flex-1"
        />

        <select value={filter} onChange={handleFilter} className="border rounded-lg p-2">
          <option value="">All Titles and Qualifications</option>
          <option value="Doctor">Doctor</option>
          <option value="HA">HA</option>
          <option value="CMA">CMA</option>
          <option value="Staff Nurse">Staff Nurse</option>
          <option value="ANM">ANM</option>
          <option value="BN Nursing">BN Nursing</option>
          <option value="Lab Assistant">Lab Assistant</option>
          <option value="Lab Technician">Lab Technician</option>
          <option value="D Pharmacy">D Pharmacy</option>
          <option value="Others">Others</option>
          {/* Add more titles/qualifications as needed */}
        </select>
      </div>

      <StaffList staff={filteredStaff} />
    </main>
  );
};

export default StaffPage;
