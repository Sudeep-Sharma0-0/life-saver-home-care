export default function ExpTab(props) {
  const handleAddExperience = () => {
    props.setFormData({
      ...props.formData,
      experience: [
        ...props.formData.experience,
        { position: '', company: '', startDate: '', endDate: '', details: '' },
      ],
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...props.formData.experience];
    updatedExperience[index][field] = value;
    props.setFormData({ ...props.formData, experience: updatedExperience });
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = props.formData.experience.filter((_, i) => i !== index);
    props.setFormData({ ...props.formData, experience: updatedExperience });
  };

  return (
    <form method="POST" id="applyForm" >
      <h2 className="text-xl font-bold mb-4">Experience</h2>

      {props.formData.experience.map((exp, index) => (
        <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-100 shadow-sm">
          {/* Position */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Position <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={exp.position}
              onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              placeholder="Enter position title"
              required
            />
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Company Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Start and End Date on the Same Line */}
          <div className="flex mb-4">
            <div className="flex-1 mr-2">
              <label className="block mb-2 font-medium">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
              />
            </div>
            <div className="flex-1 ml-2">
              <label className="block mb-2 font-medium">End Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
              />
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Details of Experience <span className="text-red-500">*</span></label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={exp.details}
              onChange={(e) => handleExperienceChange(index, 'details', e.target.value)}
              placeholder="Describe responsibilities and achievements"
              required
            />
          </div>

          {/* Remove Experience Button */}
          <div className="flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              onClick={() => handleRemoveExperience(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Add More Experience Button */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
          onClick={handleAddExperience}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="si-glyph si-glyph-plus"
            viewBox="0 0 17 17"
          >
            <path
              fillRule="evenodd"
              d="M16 6h-4V2a1 1 0 00-1-1H7a1 1 0 00-1 1v4H2a1 1 0 00-1 1v4a1 1 0 001 1h4v4a1 1 0 001 1h4a1 1 0 001-1v-4h4a1 1 0 001-1V7a1 1 0 00-1-1"
              className="si-glyph-fill"
            ></path>
          </svg>
          Another
        </button>
      </div>
    </form>
  );
}
