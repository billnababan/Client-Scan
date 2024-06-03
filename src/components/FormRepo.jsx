import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const FormRepo = () => {
  const navigate = useNavigate();
  const [url, setRepositoryLink] = useState("");

  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDataString = localStorage.getItem("user");
      const userData = JSON.parse(userDataString);

      if (userData && userData.id) {
        // Pastikan data pengguna ada dan memiliki properti id
        const userIdFromStorage = parseInt(userData.id);

        console.log("User ID:", userIdFromStorage);

        // Simpan userId ke dalam state lokal
        setUserId(userIdFromStorage);

        const response = await axios.post(`http://localhost:4000/api/detectt/deteksi`, { url, userId: userIdFromStorage });
        navigate("/repo");
        toast.success("Scanning Is Success!!");
      } else {
        console.log("Data pengguna tidak lengkap atau tidak ditemukan.");
        toast.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Scan Failed");
    }
  };

  return (
    <div className="  bg-white w-full h-screen mt-[67px]  sm:p-12 lg:p-24">
      <div className="w-full md:w-[900px] mx-auto bg-gray-200 p-12 border hover:rounded-md shadow-lg h-auto md:h-[400px]">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4 md:mb-7 text-center border-b-2 border-blue-500 text-black px-1 py-1 shadow-md">Scan Your Repository</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative inline-block border mt-5 w-full">
            <input
              type="text"
              id="repositoryLink"
              name="repositoryLink"
              value={url}
              onChange={(e) => setRepositoryLink(e.target.value)}
              placeholder="Repository Url"
              className=" px-4 py-2 w-full border-2 border-tartiarty text-sm hover:border-blue-500 duration-200 "
            />
          </div>

          <div className="flex justify-start mt-2 ">
            <button type="submit" disabled={!url} className={` hover:bg-blue-500  hover:scale-110 hover:text-white duration-300 transition-all bg-primary hover:rounded-md text-white px-10 py-2  ${!url && " cursor-not-allowed"}`}>
              Scan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRepo;
