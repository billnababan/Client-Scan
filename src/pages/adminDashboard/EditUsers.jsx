import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUsers = ({ user, onClose, onUpdate }) => {
  const [userData, setUserData] = useState(user);
  console.log(userData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:4000/api/auth/updateUsers/${userData.id}`, userData);
      setUserData(response.data);
      onUpdate(response.data); // Pass updated user data to parent component
      onClose(); // Close the pop up after updating
      toast.success("Update user is Success");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Update user is Failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-300 w-96">
        <h2 className="text-lg font-semibold bg-blue-500 text-white py-5 px-6">Edit User</h2>
        <form onSubmit={handleSubmit} className="p-9">
          <div className="mb-6">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={userData.fullname}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="emailuser"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUsers;
