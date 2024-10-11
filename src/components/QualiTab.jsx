export default function QualiTab(props) {
  // Add a handler for adding more qualifications
  const handleAddQualification = () => {
    props.setFormData({
      ...props.formData,
      qualifications: [
        ...props.formData.qualifications,
        { institution: '', yearsFrom: '', yearsTo: '', degreeType: '', qualification: '', certificate: null },
      ],
    });
  };

  // Handler for changing input values
  const handleInputChange = (index, field, value) => {
    const updatedQualifications = [...props.formData.qualifications];
    updatedQualifications[index][field] = value;
    props.setFormData({ ...props.formData, qualifications: updatedQualifications });
  };

  // Handler for removing a qualification
  const handleRemoveQualification = (index) => {
    const updatedQualifications = props.formData.qualifications.filter(
      (_, i) => i !== index
    );
    props.setFormData({ ...props.formData, qualifications: updatedQualifications });
  };

  // Handler for attaching an image file
  const handleFileChange = (index, file) => {
    const updatedQualifications = [...props.formData.qualifications];
    updatedQualifications[index].certificate = file;
    props.setFormData({ ...props.formData, qualifications: updatedQualifications });
  };

  return (
    <form method="POST" id="applyForm">
      <h2 className="text-xl font-bold mb-4">Qualifications</h2>
      {props.formData.qualifications.map((qualification, index) => (
        <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-100 shadow-sm">
          <div className="mb-4">
            <label className="block mb-2 font-medium">Institution Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={qualification.institution}
              onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
              placeholder="Enter institution name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Years Attended</label>
            <div className="flex gap-4">
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={qualification.yearsFrom}
                onChange={(e) => handleInputChange(index, 'yearsFrom', e.target.value)}
                placeholder="From"
              />
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={qualification.yearsTo}
                onChange={(e) => handleInputChange(index, 'yearsTo', e.target.value)}
                placeholder="To"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Degree Type <span className="text-red-500">*</span></label>
            <select
              className="w-full p-2 border rounded-md"
              value={qualification.degreeType}
              onChange={(e) => handleInputChange(index, 'degreeType', e.target.value)}
              required
            >
              <option value="" disabled selected="selected">Select Degree Type</option>
              <option value="Masters">Master's</option>
              <option value="Bachelors">Bachelor's</option>
              <option value="Diploma">Diploma</option>
              <option value="Certificate">Certificate</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Qualification <span className="text-red-500">*</span></label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={qualification.qualification}
              onChange={(e) => handleInputChange(index, 'qualification', e.target.value)}
              placeholder="Enter the qualification details"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Attach Certificate (Optional)</label>
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              accept="image/*"
            />
            {qualification.certificate && (
              <p className="text-green-500 mt-2">Certificate attached: {qualification.certificate.name}</p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl"
              onClick={() => handleRemoveQualification(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          className="flex gap-2 items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl mt-4"
          onClick={handleAddQualification}
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
