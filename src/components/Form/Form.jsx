import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import formatDate from "../FormatDate/FormatDate";


// eslint-disable-next-line react/prop-types
const Form = ({ handleModal }) => {
  const navigate = useNavigate();
  const [errors,setErrors]=useState('')
  const initialFormData = {
    name: "",
    address: "",
    phoneNumber: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    picture: "",
    availabilityDate: "",
    rentPerMonth: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  
  
  const validateForm = () => {
    const validationErrors = {};
    ["name", "address", "city", "description"].forEach((field) => {
      if (!formData[field].trim()) {
        validationErrors[field] = "This field is required";
      }
    });
    
    ["bedrooms", "bathrooms", "rentPerMonth"].forEach((field) => {
      if (!formData[field] || isNaN(formData[field]) || formData[field] < 0) {
        validationErrors[field] = "Please enter a valid positive number";
      }
    });
    
    const phoneRegex = /^(\+?88)?01[0-9]{9}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Please provide a valid Bangladeshi phone number";
    }
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
     await handleModal(formData);
      setFormData(initialFormData);
      setErrors({});
      toast.success("House Data Successfully added")
      navigate("/")
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    
    <form onSubmit={handleSubmit} className="max-w-xs flex flex-wrap">
      <div className="w-full">
      
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name:
        </label>
        
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          // 
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}
      </div>

      <div className="w-full">
      
        <label
          htmlFor="address"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.address && <div className="text-red-500">{errors.address}</div>}
      </div>

      <div className="w-1/2 pr-2">
      
        <label
          htmlFor="city"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          City:
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.city && <div className="text-red-500">{errors.city}</div>}
      </div>

      <div className="w-1/2 pl-2">
        <label
          htmlFor="bedrooms"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Bedrooms:
        </label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.bedrooms && <div className="text-red-500">{errors.bedrooms}</div>}
      </div>

      <div className="w-1/2 pr-2">
        <label
          htmlFor="bathrooms"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Bathrooms:
        </label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.bathrooms && <div className="text-red-500">{errors.bathrooms}</div>}
      </div>

      <div className="w-1/2 pl-2">
        <label
          htmlFor="roomSize"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Room Size:
        </label>
        <input
          type="text"
          id="roomSize"
          name="roomSize"
          value={formData.roomSize}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.bathrooms && <div className="text-red-500">{errors.bathrooms}</div>}
      </div>

      <div className="w-full">
        <label
          htmlFor="picture"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Picture:
        </label>
        <input
          type="text"
          id="picture"
          name="picture"
          value={formData.picture}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.picture&& <div className="text-red-500">{errors.picture}</div>}
      </div>

      <div className="w-1/2 pr-2">
        <label
          htmlFor="availabilityDate"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Availability Date:
        </label>
        <input
          type="date"
          id="availabilityDate"
          name="availabilityDate"
          value={formatDate(formData.availabilityDate)}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.availabilityDate && <div className="text-red-500">{errors.availabilityDate}</div>}
      </div>

      <div className="w-1/2 pl-2">
        <label
          htmlFor="rentPerMonth"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Rent Per Month:
        </label>
        <input
          type="number"
          id="rentPerMonth"
          name="rentPerMonth"
          value={formData.rentPerMonth}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.rentPerMonth && <div className="text-red-500">{errors.rentPerMonth}</div>}
      </div>

      <div className="w-full">
        <label
          htmlFor="phoneNumber"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
        {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
      </div>

      <div className="w-full">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-1 rounded focus:outline-none focus:ring focus:ring-blue-500"
        ></textarea>
        {errors.description && <div className="text-red-500">{errors.description}</div>}
      </div>
      <div className="">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
        >
          Add House
        </button>
      </div>
    </form>
  );
};

export default Form;
