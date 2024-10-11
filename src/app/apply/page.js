"use client";
import React, { useState, useEffect } from "react";

// Save form data to localStorage
const saveToLocalStorage = (data) => {
  localStorage.setItem("homeCareForm", JSON.stringify(data));
};

// Get form data from localStorage
const getFromLocalStorage = () => {
  const data = localStorage.getItem("homeCareForm");
  return data ? JSON.parse(data) : {
    personalDetails: {
      name: "",
      email: "",
      phone: "",
    },
    qualifications: "",
    skills: "",
    experience: {
      years: "",
      months: "",
      details: "",
    },
  };
};

const ApplicationForm = () => {
  const tabs = ["Personal Details", "Qualifications", "Skills", "Experience"];

  const [formData, setFormData] = useState(getFromLocalStorage());
  const [currentTab, setCurrentTab] = useState(0);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedData = getFromLocalStorage();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleExperienceChange = (field, value) => {
    setFormData({
      ...formData,
      experience: {
        ...formData.experience,
        [field]: value,
      },
    });
  };

  const handleTabChange = (newTab) => {
    saveToLocalStorage(formData); // Save data on tab change
    setCurrentTab(newTab);
    setIsDropdownOpen(false); // Close dropdown on tab change
  };

  const handleSave = () => {
    saveToLocalStorage(formData); // Save data on explicit save
    setIsFormSaved(true); // Show confirmation message
    setTimeout(() => setIsFormSaved(false), 2000); // Hide message after 2 seconds
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Tab Headers */}
      <div className="mb-4 border-b-2 flex flex-col sm:flex-row">
        <div className="sm:hidden mb-4">
          <button
            className="p-2 w-full text-center border rounded bg-blue-500 text-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {tabs[currentTab]}
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 bg-white shadow-lg">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${currentTab === index ? "font-bold" : ""}`}
                  onClick={() => handleTabChange(index)}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex flex-grow">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`p-2 w-1/4 text-center ${currentTab === index
                ? "border-b-4 border-blue-500 font-bold"
                : ""
                }`}
              onClick={() => handleTabChange(index)} // Save on tab change
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {currentTab === 0 && (
          <div className="grid grid-rows-auto grid-cols-2 gap-x-2">
            <h2 className="text-xl font-bold mb-4 col-span-2">Personal Details</h2>
            <div className="mb-4 col-span-2">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border"
                value={formData.personalDetails.name}
                onChange={(e) =>
                  handleInputChange("personalDetails", "name", e.target.value)
                }
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border"
                value={formData.personalDetails.email}
                onChange={(e) =>
                  handleInputChange("personalDetails", "email", e.target.value)
                }
                required
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                className="w-full p-2 border"
                value={formData.personalDetails.phone}
                onChange={(e) =>
                  handleInputChange("personalDetails", "phone", e.target.value)
                }
                required
              />
            </div>
            <div className="mb-4 col-span-1">
              <label className="block mb-2">Age</label>
              <input
                type="number"
                className="w-full p-2 border"
                value={formData.personalDetails.age}
                onChange={(e) =>
                  handleInputChange("personalDetails", "age", e.target.value)
                }
                required
              />
            </div>
            <div className="mb-4 col-start-2">
              <label className="block mb-2">Gender</label>
              <select
                className="w-full p-2 border"
                value={formData.personalDetails.gender}
                onChange={(e) =>
                  handleInputChange("personalDetails", "gender", e.target.value)
                }
                required
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="mb-4 col-span-2">
              <label className="block mb-2">Photo</label>
              <input
                type="file"
                className="w-full p-2 border"
                required
              />
            </div>
          </div>
        )}

        {currentTab === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Qualifications</h2>
            <div className="mb-4">
              <label className="block mb-2">Qualifications</label>
              <textarea
                className="w-full p-2 border"
                value={formData.qualifications}
                onChange={(e) =>
                  setFormData({ ...formData, qualifications: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {currentTab === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <div className="mb-4">
              <label className="block mb-2">Skills</label>
              <textarea
                className="w-full p-2 border"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
              />
            </div>
          </div>
        )}

        {currentTab === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            <div className="mb-4">
              <label className="block mb-2">Years of Experience</label>
              <input
                type="number"
                className="w-full p-2 border"
                value={formData.experience.years}
                onChange={(e) => handleExperienceChange("years", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Months of Experience</label>
              <input
                type="number"
                className="w-full p-2 border"
                value={formData.experience.months}
                onChange={(e) =>
                  handleExperienceChange("months", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Details of Experience</label>
              <textarea
                className="w-full p-2 border"
                value={formData.experience.details}
                onChange={(e) =>
                  handleExperienceChange("details", e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Save and Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className={`p-2 px-4 border bg-blue-500 text-white ${currentTab === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => handleTabChange(currentTab - 1)}
          disabled={currentTab === 0}
        >
          Previous
        </button>
        <button
          className={`p-2 px-4 border bg-blue-500 text-white ${currentTab === tabs.length - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => handleTabChange(currentTab + 1)}
          disabled={currentTab === tabs.length - 1}
        >
          Next
        </button>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        {isFormSaved && (
          <p className="mt-2 text-green-500">Form saved successfully!</p>
        )}
        <button
          className="p-3 px-6 bg-green-500 text-white font-bold"
          onClick={handleSave}
        >
          Save Form
        </button>
        <button
          type="submit"
          className="ml-12 p-3 px-6 bg-green-500 text-white font-bold"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;
