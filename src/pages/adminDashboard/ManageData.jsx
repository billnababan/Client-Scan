// ManageDataContainer.jsx
import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/NewSidebar";
import ManageDataContent from "../../components/ManageDataContent";
import AdminView from "../../components/AdminView";

const ManageDataContainer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid grid-cols-[auto,1fr] overflow-hidden ">
      {/* SidebarAdmin */}
      <div className=" ">
        <SidebarAdmin isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
      </div>

      {/* Main content */}
      <div className={`col-span-1 grid grid-rows-[auto,1fr] ${isSidebarOpen ? "" : ""}`}>
        {/* AdminView */}
        <div className="row-span-1 bg-gray-200">
          <AdminView />
        </div>

        {/* AdminMain */}
        <div className=" overflow-auto">
          <ManageDataContent />
        </div>
      </div>
    </div>
  );
};

export default ManageDataContainer;
