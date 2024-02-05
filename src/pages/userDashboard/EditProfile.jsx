import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EditProfile = ({ user, onClose, onUpdate }) => {
  const [userData, setUserData] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const eyeIconCurrentPassword = showCurrentPassword ? faEye : faEyeSlash;
  const eyeIconNewPassword = showNewPassword ? faEye : faEyeSlash;

  // console.log("show user data", userData);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState();
  // console.log(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const userDataString = localStorage.getItem("user");
  const userexist = JSON.parse(userDataString);
  // console.log(userexist[0].id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        fullname: fullname.value,
        email: email,
        password: currentPassword,
        newPassword: newPassword,
        role_id: 1,
      };
      // console.log(updatedUserData);
      const response = await axios.put(`http://localhost:4000/api/auth/updateUsers/${userexist[0].id}`, updatedUserData);
      setUserData(response.data);
      onUpdate(response.data); // Pass updated user data to parent component
      onClose(); // Close the pop up after updating
      toast.success("Update user profile is success");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Update is Failed", error);
    }
  };

  return (
    <div className="relative inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50">
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
              id="email"
              name="email"
              value={userData.email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={handleChangePassword}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pr-10"
            />
            <FontAwesomeIcon icon={eyeIconCurrentPassword} className="absolute right-3 top-8 transform -translate-y-1/2 cursor-pointer" onClick={toggleShowCurrentPassword} />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleChangePassword}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pr-10"
            />
            <FontAwesomeIcon icon={eyeIconNewPassword} className="absolute right-3 top-8 transform -translate-y-1/2 cursor-pointer" onClick={toggleShowNewPassword} />
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

export default EditProfile;
