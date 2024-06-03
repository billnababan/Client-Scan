import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import ikon mata (eye) dari React Icons

import CardProfile from "./CardProfile";

const EditProfile = ({ user }) => {
  const [userData, setUserData] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const userDataString = localStorage.getItem("user");
  const userexist = JSON.parse(userDataString);
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState(""); // Definisikan fullName
  const [email, setEmail] = useState(""); // Definisikan email
  const [currentPassword, setCurrentPassword] = useState(""); // Definisikan currentPassword
  const [newPassword, setNewPassword] = useState(""); // Definisikan newPassword

  const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const closeSaveSuccessModal = () => {
    setIsSaveSuccessModalOpen(false);
  };

  const showSaveSuccessModal = () => {
    setIsSaveSuccessModalOpen(true);
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
      if (value.trim() === "") {
        setIsPasswordValid(true);
        setPasswordErrorMessage("");
      } else {
        const isValid = validatePassword(value);
        setIsPasswordValid(isValid);
        if (!isValid) {
          setPasswordErrorMessage("Passwords must consist of at least 8 characters, including uppercase letters, lowercase letters, numbers, and symbols.");
        } else {
          setPasswordErrorMessage("");
        }
      }
    }
    const isFormFilled = fullName.trim() !== "" && email.trim() !== "" && currentPassword.trim() !== "" && newPassword.trim() !== "";
    setIsFormValid(isFormFilled);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        fullname: fullName,
        email: email,
        password: currentPassword,
        newPassword: newPassword,
        role_id: 1,
      };

      const response = await axios.put(`http://localhost:4000/api/auth/updateUsers/${userexist.id}`, updatedUserData);
      setUserData(response.data);

      showSaveSuccessModal();

      toast.success("Update user profile is success");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Update is Failed", error);
    }
  };

  return (
    <div className="flex items-center h-screen  ">
      <div className="container mx-auto flex">
        <form onSubmit={handleSubmit} className="flex w-full ml-16 mr-16 mt-10 rounded-t-lg bg-gray-100">
          <div className="flex flex-col w-full gap-y-6 ">
            <p className="shadow-lg  text-center font-bold text-lg py-3 w-full textBg">UPDATE PROFILE</p>
            <div className="grid grid-cols-1 gap-y-6">
              <div className="flex items-center justify-between">
                <label htmlFor="fullname" className="text-sm font-medium  px-3 text-gray-700 hover:text-primary w-1/4 duration-200 transform ">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-sm focus:ring-indigo-500 focus:border-indigo-500 w-3/4 p-2   border-gray-300 rounded-md mr-14"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="text-sm font-medium px-3 text-gray-700 hover:text-primary w-1/4 duration-200 transform ">
                  Email
                </label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-sm focus:ring-indigo-500 focus:border-indigo-500 w-3/4 p-2   border-gray-300 rounded-md mr-14" />
              </div>
              <div className="flex items-center justify-between relative">
                <label htmlFor="currentPassword" className="text-sm font-medium px-3 text-gray-700 hover:text-primary w-1/4 duration-200 transform ">
                  Current Password
                </label>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={handleChangePassword}
                  className="text-sm focus:ring-indigo-500 focus:border-indigo-500 w-3/4 p-2  border-gray-300 rounded-md pr-10 mr-14"
                />
                {showCurrentPassword ? (
                  <AiFillEyeInvisible className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mr-14" onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
                ) : (
                  <AiFillEye className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mr-14" onClick={() => setShowCurrentPassword(!showCurrentPassword)} />
                )}
              </div>
              <div className="flex items-center justify-between relative">
                <label htmlFor="newPassword" className="text-sm font-medium text-gray-700 px-3 hover:text-primary w-1/4 duration-200 transform ">
                  New Password
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChangePassword}
                  className={`text-sm focus:ring-indigo-500 focus:border-indigo-500 w-3/4 p-2 mr-14 border-gray-300 rounded-md pr-10 ${isPasswordValid ? "" : "border-red-500"}`}
                />
                {showNewPassword ? (
                  <AiFillEyeInvisible className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mr-14" onClick={() => setShowNewPassword(!showNewPassword)} />
                ) : (
                  <AiFillEye className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mr-14" onClick={() => setShowNewPassword(!showNewPassword)} />
                )}
              </div>
              {!isPasswordValid && <p className="text-lg text-red-500 px-10 text-left">{passwordErrorMessage}</p>}
            </div>
            <div className="flex justify-end mb-5">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`bg-blue-500 ${!isFormValid ? "opacity-50 cursor-not-allowed" : "hover:bg-primary"} text-white px-4 mr-14 py-3 text-lg hover:rounded-md duration-200 transform hover:scale-110`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <CardProfile />
      </div>
      {isSaveSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg font-semibold text-center">Save User is Success!!</p>
            <button onClick={closeSaveSuccessModal} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
