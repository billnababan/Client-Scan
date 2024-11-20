import React, { useState } from "react";

import axiosInstance from "../hooks/axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/resetpassword", { userId: email }); // Sesuaikan dengan ID pengguna atau data lain yang diperlukan
      console.log(response.data); // Tampilkan pesan sukses atau error
    } catch (error) {
      console.error("Error:", error.response.data.message);
    }
  };

  return (
    <div className="loginBg min-h-screen flex items-center justify-center bg-gray-100">
      <div className="px-4 py-8 bg-white rounded-lg shadow-xl w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="my-5 relative">
            <label htmlFor="email" className="block mb-2">
              Send To E-mail
            </label>
            <input
              onChange={handleChange}
              value={email}
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border hover:rounded-md focus:outline-none hover:border-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="grid place-items-center mt-4">
            <button
              type="submit"
              className="py-2 px-4 border border-transparent hover:bg-blue-500 hover:ring-blue-500 hover:dark:ring-offset-blue-800 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-blue-200 dark:focus:ring-offset-blue-800 bg-blue-600 text-white hover:rounded-md shadow-sm duration-200"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
