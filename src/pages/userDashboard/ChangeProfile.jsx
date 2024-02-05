import React, { useState } from "react";

const UpdateProfile = ({ onProfileImageChange }) => {
  const [updatedProfileImage, setUpdatedProfileImage] = useState(null);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUpdatedProfileImage(reader.result); // Menyimpan URL gambar profil yang diperbarui ke dalam state
      onProfileImageChange(file); // Memanggil fungsi yang diberikan oleh prop onProfileImageChange dengan file gambar profil sebagai argumen
    };
  };

  return (
    <div className="mb-6">
      <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
        Change Profile
      </label>
      <input type="file" onChange={handleProfileImageChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    </div>
  );
};

export default UpdateProfile;
