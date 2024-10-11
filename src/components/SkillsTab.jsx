export default function SkillsTab(props) {
  const handleAddSkill = () => {
    props.setFormData({
      ...props.formData,
      skills: [
        ...props.formData.skills,
        { name: '', category: '', level: '' },
      ],
    });
  };

  const handleInputChange = (index, field, value) => {
    const updatedSkills = [...props.formData.skills];
    updatedSkills[index][field] = value;
    props.setFormData({ ...props.formData, skills: updatedSkills });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = props.formData.skills.filter((_, i) => i !== index);
    props.setFormData({ ...props.formData, skills: updatedSkills });
  };

  return (
    <form method="POST" id="applyForm" >
      <h2 className="text-xl font-bold mb-4">Skills</h2>

      {props.formData.skills.map((skill, index) => (
        <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-100 shadow-sm">
          {/* Skill Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Skill Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={skill.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              placeholder="Enter skill name"
              required
            />
          </div>

          {/* Skill Category */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Category <span className="text-red-500">*</span></label>
            <select
              className="w-full p-2 border rounded-md"
              value={skill.category}
              onChange={(e) => handleInputChange(index, 'category', e.target.value)}
              required
            >
              <option value="" disabled>Select Skill Category</option>
              <option value="Medical">Medical</option>
              <option value="Technical">Technical</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Languages">Languages</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Skill Level */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Skill Level <span className="text-red-500">*</span></label>
            <select
              className="w-full p-2 border rounded-md"
              value={skill.level}
              onChange={(e) => handleInputChange(index, 'level', e.target.value)}
              required
            >
              <option value="" disabled>Select Skill Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Remove Skill Button */}
          <div className="flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              onClick={() => handleRemoveSkill(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      {/* Add More Skills Button */}
      <div className="flex justify-center">
        <button
          className="flex gap-2 items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
          onClick={handleAddSkill}
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
          Add Skill
        </button>
      </div>
    </form>
  );
}
