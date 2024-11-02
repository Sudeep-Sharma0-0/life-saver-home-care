"use client";
import ExpTab from "@/components/ExpTab";
import PersonalTab from "@/components/PersonalTab";
import QualiTab from "@/components/QualiTab";
import SkillsTab from "@/components/SkillsTab";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import LoadingSpinner from "@/components/Loading";

// Save form data to localStorage
const saveToLocalStorage = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("homeCareForm", JSON.stringify(data));
  }
};

// Get form data from localStorage
const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("homeCareForm");
    return data
      ? JSON.parse(data)
      : {
        openTab: 0,
        personalDetails: {
          name: "",
          email: "",
          phone: "",
          age: "",
          gender: "",
          image: null,
        },
        qualifications: [
          {
            institution: "",
            yearsFrom: "",
            yearsTo: "",
            degreeType: "",
            qualification: "",
          },
        ],
        skills: [
          {
            name: "",
            category: "",
            level: "",
          },
        ],
        experience: [
          {
            position: "",
            company: "",
            startDate: "",
            endDate: "",
            details: "",
          },
        ],
      };
  }

  // Default structure if no local storage data exists
  return {
    openTab: 0,
    personalDetails: {
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      image: null,
    },
    qualifications: [
      {
        institution: "",
        yearsFrom: "",
        yearsTo: "",
        degreeType: "",
        qualification: "",
      },
    ],
    skills: [
      {
        name: "",
        category: "",
        level: "",
      },
    ],
    experience: [
      {
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        details: "",
      },
    ],
  };
};

const ApplicationForm = () => {
  const tabs = ["Personal Details", "Qualifications", "Skills", "Experience"];

  const [formData, setFormData] = useState(getFromLocalStorage());
  const [currentTab, setCurrentTab] = useState(0);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // This effect ensures localStorage is accessed only on the client side
  useEffect(() => {
    const savedData = getFromLocalStorage();
    setFormData(savedData);
    setCurrentTab(savedData.openTab || 0);
  }, []);

  const handleTabChange = (newTab) => {
    setFormData({ ...formData, openTab: newTab });
    saveToLocalStorage(formData);
    setCurrentTab(newTab);
    setIsDropdownOpen(false);
  };

  const handleSave = () => {
    saveToLocalStorage(formData); // Save data on explicit save
    setIsFormSaved(true);
    setTimeout(() => setIsFormSaved(false), 2000); // Hide message after 2 seconds
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSave();

    setIsLoading(true); // Start loading

    const { name, email, phone, age, gender } = formData.personalDetails;
    if (!name || !email || !phone || !age || !gender) {
      setCurrentTab(0);
      alert("Please add complete personal details.");
      setIsLoading(false); // Stop loading
      return;
    }

    const qualificationsComplete = formData.qualifications.every((qualification) =>
      qualification.institution && qualification.yearsTo && qualification.specificQualification && qualification.degreeType
    );
    if (!qualificationsComplete) {
      setCurrentTab(1);
      alert("Please add qualifications.");
      setIsLoading(false); // Stop loading
      return;
    }

    const skillsComplete = formData.skills.every((skill) =>
      skill.name && skill.category && skill.level
    );
    if (!skillsComplete) {
      setCurrentTab(2);
      alert("Please add skills.");
      setIsLoading(false); // Stop loading
      return;
    }

    const experienceComplete = formData.experience.every((exp) =>
      exp.position && exp.company && exp.startDate && exp.endDate && exp.details
    );
    if (!experienceComplete) {
      setCurrentTab(3);
      alert("Please add experience.");
      setIsLoading(false); // Stop loading
      return;
    }

    const file = formData.personalDetails.image;
    if (file == {}) {
      setCurrentTab(0);
      alert("Please add profile picture.");
      setIsLoading(false); // Stop loading
      return;
    }
    const imageFile = new File(
      [Uint8Array.from(btoa(file), (m) => m.codePointAt(0))],
      'filename.png',
      { type: 'image/png' }
    );
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('profile_images')
      .upload(`${Math.floor(Math.random() * 1024)}_${imageFile.name}`, imageFile, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      setIsLoading(false); // Stop loading
      return;
    }

    const publicURL = `https://ufuoxgvmnchdcrfbilii.supabase.co/storage/v1/object/public/profile_images/${uploadData.path}`;

    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          name: formData.personalDetails.name,
          email: formData.personalDetails.email,
          phone: formData.personalDetails.phone,
          age: formData.personalDetails.age,
          gender: formData.personalDetails.gender,
          image: publicURL || "",
          qualifications: formData.qualifications,
          skills: formData.skills,
          experience: formData.experience,
        },
      ])
      .select();

    setIsLoading(false); // Stop loading after submission

    if (!data || error) {
      alert("Error! Contact Website Owner!");
      return;
    }

    alert("Application submitted successfully. Wait for manual review.");
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {isLoading ? <LoadingSpinner /> : ""}
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
                  className={`block w-full text-left p-2 hover:bg-gray-200 ${currentTab === index ? "font-bold" : ""
                    }`}
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
              className={`p-2 w-1/4 text-center ${currentTab === index ? "border-b-4 border-blue-500 font-bold" : ""
                }`}
              onClick={() => handleTabChange(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {currentTab === 0 && (
          <PersonalTab formData={formData} setFormData={setFormData} />
        )}

        {currentTab === 1 && (
          <QualiTab formData={formData} setFormData={setFormData} />
        )}

        {currentTab === 2 && (
          <SkillsTab formData={formData} setFormData={setFormData} />
        )}

        {currentTab === 3 && (
          <ExpTab formData={formData} setFormData={setFormData} />
        )}
      </div>

      {/* Save and Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className={`p-2 border rounded-full bg-blue-500 text-white ${currentTab === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => handleTabChange(currentTab - 1)}
          disabled={currentTab === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 512 512"
          >
            <path d="M197.4 129.3c-4.4 0-8.5 1.7-11.6 4.8L64 254.4l121.7 123.2c3.1 3.2 7.3 5 11.8 5 9.2.1 16.7-7.3 16.8-16.5v-61.6s21.4-10.7 57.4-10.7c42.1 0 104.4 14.5 176.3 77.5 0 0-33.4-166.9-233.7-166.9v-58.3c0-9.2-7.4-16.7-16.6-16.7-.1-.1-.2-.1-.3-.1m0-30c11.9 0 23.4 4.5 32.1 12.7 9.5 8.8 14.8 21.1 14.7 34.1v29.5c38.5 3.2 73.5 12.6 104.5 28 31.5 15.7 59.1 38 81 65.5 37.5 46.9 47.3 94.4 47.7 96.4 3.3 16.2-7.3 32.1-23.5 35.3-9.2 1.8-18.6-.7-25.7-6.8-66.1-57.9-121.6-70-156.5-70-9.2 0-18.4.9-27.5 2.7V366c.1 12.9-5.3 25.2-14.7 34-8.7 8.1-20.2 12.7-32.1 12.6-12.5 0-24.4-5-33.1-13.9L42.6 275.5c-11.6-11.8-11.5-30.8.3-42.4l121.8-120.3c8.7-8.6 20.5-13.5 32.7-13.5"></path>
          </svg>
        </button>
        <button
          className={`p-2 border rounded-full bg-blue-500 text-white ${currentTab === tabs.length - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => handleTabChange(currentTab + 1)}
          disabled={currentTab === tabs.length - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            data-name="Layer 1"
            viewBox="0 0 512 512"
          >
            <path d="M314.55 129.32a16.4 16.4 0 0111.62 4.84L448 254.45 326.32 377.68a16.33 16.33 0 01-11.76 5A16.68 16.68 0 01297.74 366v-61.46s-21.35-10.67-57.45-10.67c-42.13 0-104.36 14.52-176.29 77.45 0 0 33.39-166.95 233.74-166.95v-58.32a16.68 16.68 0 0116.81-16.73m0-30a46.85 46.85 0 00-32.1 12.68 46.1 46.1 0 00-14.71 34.06v29.53c-38.47 3.17-73.51 12.56-104.46 28a240.9 240.9 0 00-81 65.48C44.79 316 35 363.44 34.58 365.44a30 30 0 0049.18 28.46c66.15-57.89 121.63-70 156.53-70a138 138 0 0127.45 2.67V366a46.12 46.12 0 0014.72 34 46.92 46.92 0 0032.1 12.65 46.2 46.2 0 0033.1-13.92l121.69-123.2a30 30 0 00-.27-42.43L347.24 112.82a46.27 46.27 0 00-32.69-13.5"></path>
          </svg>
        </button>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center flex flex-row justify-center gap-4">
        {isFormSaved && (
          <p className="mt-2 text-green-500">Form saved successfully!</p>
        )}
        <button
          className="flex items-center gap-1 justify-center rounded-xl p-3 px-6 bg-green-500 text-white font-bold max-w-48"
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="icon flat-line"
            data-name="Flat Line"
            viewBox="0 0 24 24"
          >
            <path
              fill="#2ca9bc"
              strokeWidth="2"
              d="M16 3H5a1 1 0 00-1 1v16a1 1 0 001 1h3v-6h8v6h3a1 1 0 001-1V7z"
            ></path>
            <path
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7h2m6 8H8v6h8zm0-12H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V7z"
            ></path>
          </svg>
          Save
        </button>
        <button
          type="submit"
          form="applyForm"
          className="flex items-center gap-2 justify-center rounded-xl p-3 px-6 bg-blue-500 text-white font-bold max-w-48"
          onClick={handleSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="icon flat-color"
            data-name="Flat Color"
            viewBox="0 0 24 24"
          >
            <path
              fill="#2ca9bc"
              d="M16.71 6.29l-4-4a1 1 0 00-1.42 0l-4 4a1 1 0 101.42 1.42L11 5.41V16a1 1 0 002 0V5.41l2.29 2.3a1 1 0 001.42 0 1 1 0 000-1.42"
            ></path>
            <path d="M18.86 22H5.14A2.08 2.08 0 013 20v-4a1 1 0 012 0v4h13.86a.22.22 0 00.14 0v-4a1 1 0 012 0v4a2.08 2.08 0 01-2.14 2"></path>
          </svg>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;
