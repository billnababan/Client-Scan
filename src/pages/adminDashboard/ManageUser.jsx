import React, { useState } from "react";
import SidebarAdmin from "../../components/NewSidebar";
import ManageUserProfile from "./ManageUserProfile";

const ManageUser = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <SidebarAdmin isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />

      <ManageUserProfile />
    </div>
  );
};

export default ManageUser;
