import React, { useState } from "react";
import axios from "axios";
import logoProfile from "../../../src/assets/user.png";

const CardProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const userDataString = localStorage.getItem("user");
  const userexist = JSON.parse(userDataString);
  const [userId, setUserId] = useState(null);
  const [fileInput, setFileInput] = useState(null);

  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();
    try {
      const userDataString = localStorage.getItem("user");
      const userData = JSON.parse(userDataString);

      if (userData && userData.id && fileInput) {
        // Pastikan data pengguna ada dan memiliki properti id
        const userIdFromStorage = parseInt(userData.id);

        console.log("User ID:", userIdFromStorage);

        // Simpan userId ke dalam state lokal
        setUserId(userIdFromStorage);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(`http://localhost:4000/api/auth/uploadProfileImage/${userIdFromStorage}`, { config, userId: userIdFromStorage });
        console.log(userId);

        console.log("Profile picture uploaded successfully", response.data);

        setSelectedFile(fileInput);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleFileInputChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  return (
    <div className="w-[450px] mx-4 mt-[43px] h-[270] bg-gray-100 overflow-hidden rounded-t-lg">
      <img src={logoProfile} alt="profile-picture" className="w-[180px] mx-auto mt-3 rounded-lg duration-200 hover:rounded-xl" />
      <div className="p-1">
        <div className="flex items-center mx-5 mt-2 ">
          <h2 className="text-sm text-primary text-left mr-2 font-bold">NAME :</h2>
          <p className=" font-bold text-base py-3  textBg  ">{userexist.fullname}</p>
        </div>

        <div className="flex items-center mx-5 ">
          <h2 className="text-sm text-primary text-left mr-2 font-bold">EMAIL : </h2>
          <p className="font-bold text-base py-3  textBg ">{userexist.email}</p>
        </div>

        {/* <h3 className="text-base text-primary text-left mx-4 font-semibold mt-2 ">New Profile Picture</h3>
        <div className="flex items-center justify-center mx-3 mt-3">
          <label htmlFor="profilePicture" className="block text-white text-xs  px-1 py-2  justify-center hover:rounded-md cursor-pointer duration-200">
            <input id="profilePicture" className="w-full text-xs text-gray-900 border hover:bg-gray-400 border-gray-300  cursor-pointer bg-gray-50 font-bold" type="file" onChange={handleFileInputChange} />
          </label>
        </div>
        <button
          type="submit"
          className="block items-center text-white text-xs bg-blue-500 hover:bg-blue-600 px-2 py-2 text-center hover:rounded-md mt-2 cursor-pointer duration-200 transform hover:scale-105 w-32 mx-auto"
          onClick={handleProfilePictureUpload}
        >
          Save Image
        </button> */}
      </div>
    </div>
  );
};

export default CardProfile;
