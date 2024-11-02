export default function PersonalTab(props) {
  // Handler for changing input values
  const handleInputChange = (field, value) => {
    const updatedPersonalDetails = props.formData.personalDetails;
    updatedPersonalDetails[field] = value;
    props.setFormData({ ...props.formData, personalDetails: updatedPersonalDetails });
  };

  const handleFileChange = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // Create a shallow copy and update the image with the Base64 string
        const updatedPersonalDetails = { ...props.formData.personalDetails, [field]: reader.result };
        props.setFormData({ ...props.formData, personalDetails: updatedPersonalDetails });
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    }
  };

  return (
    <form method="POST" id="applyForm" className="grid grid-rows-auto grid-cols-2 gap-x-2">
      <h2 className="text-xl font-bold mb-4 col-span-2">Personal Details</h2>
      <div className="mb-4 col-span-2">
        <label className="block mb-2">Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full p-2 border"
          value={props.formData.personalDetails.name}
          onChange={(e) =>
            handleInputChange("name", e.target.value)
          }
          required
        />
      </div>
      <div className="mb-4 col-span-1">
        <label className="block mb-2">Email <span className="text-red-500">*</span></label>
        <input
          type="email"
          className="w-full p-2 border"
          value={props.formData.personalDetails.email}
          onChange={(e) =>
            handleInputChange("email", e.target.value)
          }
          required
        />
      </div>
      <div className="mb-4 col-span-1">
        <label className="block mb-2">Phone <span className="text-red-500">*</span></label>
        <input
          type="tel"
          className="w-full p-2 border"
          value={props.formData.personalDetails.phone}
          onChange={(e) =>
            handleInputChange("phone", e.target.value)
          }
          required
        />
      </div>
      <div className="mb-4 col-span-1">
        <label className="block mb-2">Age <span className="text-red-500">*</span></label>
        <input
          type="number"
          className="w-full p-2 border"
          value={props.formData.personalDetails.age}
          onChange={(e) =>
            handleInputChange("age", e.target.value)
          }
          required
        />
      </div>
      <div className="mb-4 col-start-2">
        <label className="block mb-2">Gender <span className="text-red-500">*</span></label>
        <select
          className="w-full p-2 border"
          value={props.formData.personalDetails.gender}
          onChange={(e) =>
            handleInputChange("gender", e.target.value)
          }
          required
        >
          <option selected="selected">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <div className="mb-4 col-span-2">
        <label className="block mb-2">Photo <span className="text-red-500">*</span></label>
        <input
          type="file"
          className="w-full p-2 border"
          accept="image/*"
          required
          onChange={(e) => handleFileChange("image", e.target.files[0])}
        />
      </div>
    </form>
  );
}
