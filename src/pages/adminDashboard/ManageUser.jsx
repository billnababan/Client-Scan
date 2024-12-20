import React, { useState } from "react";
import SidebarAdmin from "../../components/NewSidebar";
import ManageUserProfile from "./ManageUserProfile";
import AdminView from "../../components/AdminView";

const ManageUser = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid grid-cols-[auto,1fr] overflow-hidden">
      {/* SidebarAdmin */}
      <div className="col-span-1">
        <SidebarAdmin isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
      </div>

      {/* Main content */}
      <div className={`col-span-1 grid grid-rows-[auto,1fr] ${isSidebarOpen ? "" : ""}`}>
        {/* AdminView */}
        <div className="row-span-1 bg-gray-200">
          <AdminView />
        </div>

        {/* AdminMain */}
        <div className="row-span-1 overflow-auto">
          <ManageUserProfile />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
