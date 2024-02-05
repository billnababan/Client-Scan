import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineManageAccounts, MdOutlineLogout } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import logout from "../tokenremove/LogoutRemove";

const SidebarAdmin = ({ isOpen, onToggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [url, setUrl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, refreshAuth, setAuth } = useAuth();

  const handleLogout = () => {
    logout();
    setAuth({});
    navigate("/login");
    toast.success("Logout successful!");
  };

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Ubah ukuran sesuai kebutuhan
    };

    handleResize(); // Panggil fungsi saat komponen pertama kali dimuat

    window.addEventListener("resize", handleResize); // Tambahkan event listener untuk mengupdate state saat ukuran jendela berubah
    return () => {
      window.removeEventListener("resize", handleResize); // Hapus event listener saat komponen dibongkar
    };
  }, []);

  const handleSidebarToggle = () => {
    onToggleSidebar(); // Panggil fungsi untuk toggle sidebar
  };

  const Menus = [
    { title: "Dashboard", icon: <MdOutlineDashboard />, link: "/admin-dashboard" },
    { title: "Manage Data", icon: <MdOutlineManageAccounts />, gap: true, link: "/admin-dashboard/manage-data" },
    { title: "Manage User", icon: <MdOutlineManageAccounts />, link: "/admin-dashboard/manage-user" },
  ];

  return (
    <>
      <div className="absolute top-2 left-2 cursor-pointer z-10" onClick={handleSidebarToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <div className={`flex ${isOpen ? "w-48" : "w-12"} duration-300 py-[52px] pt-[67px] bg-primary relative h-screen `}>
        <ul className="pt-2">
          {Menus.map((Menu, index) => (
            <li key={index} className={`flex rounded-md p-2 cursor-pointer hover:bg-light text-white text-sm items-center gap-x-8 ${Menu.gap ? "mt-4" : "mt-2"} ${index === 0 && ""} `}>
              {Menu.link ? (
                <Link to={Menu.link} className="flex items-center gap-8">
                  {Menu.icon}
                  <span className={`${!isOpen && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                </Link>
              ) : (
                <>
                  {Menu.icon}
                  <span className={`${!isOpen && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                </>
              )}
            </li>
          ))}
          <div className="flex pt-6 p-2 items-center gap-[10px] cursor-pointer mt-10">
            <div className="flex items-center gap-[10px] ">
              <Link to="/login" className={`flex items-center gap-2 ${location.pathname === "/" ? "bg-primary-main px-4 py-2 rounded-lg text-white" : ""}`}>
                <MdOutlineLogout className="w-5 h-5" color="white" />
                <span className={`${!isOpen && "hidden "}origin-left duration-200 text-sm text-white `} onClick={handleLogout}>
                  Logout
                </span>
              </Link>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
};

export default SidebarAdmin;
