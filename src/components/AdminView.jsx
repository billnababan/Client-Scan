import React from "react";
import { FaSearch } from "react-icons/fa";
import profile from "../assets/avatar.jpg";

const AdminView = () => {
  return (
    <div className="flex items-center justify-between h-16 md:h-20 md:shadow-lg md:px-6">
      <div className="flex items-center rounded-[5px] w-full md:w-auto">
        <input type="text" className="bg-[#F8F9FC] h-[40px]   outline-none pl-[13px] w-full md:w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal" placeholder="Search for..." />
        <div className="bg-primary h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
          <FaSearch color="white" />
        </div>
      </div>

      <div className="flex items-center gap-[15px] relative">
        <p className="font-sans font-bold">Admin</p>
        <div className="h-[40px] w-[50px] rounded-full bg-primary cursor-pointer flex items-center justify-center relative">
          <img src={profile} alt="Profile" className="rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default AdminView;
