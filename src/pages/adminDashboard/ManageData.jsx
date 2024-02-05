// ManageDataContainer.jsx
import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../components/NewSidebar";
import ManageDataContent from "../../components/ManageDataContent";

const ManageDataContainer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex md:flex-row h-screen gap-10">
      <SidebarAdmin isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
      <ManageDataContent />
    </div>
  );
};

export default ManageDataContainer;
