import { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "../assets/Logo-web.jpeg";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Profile from "../assets/user.png";
import { RiLoginBoxFill } from "react-icons/ri";
import useAuth from "../hooks/useAuth";

import logout from "../tokenremove/LogoutRemove";
import UpdateProfile from "../pages/userDashboard/CardProfile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [profil, setProfil] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { auth, refreshAuth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!auth.user;
  const [userRoles, setUserRoles] = useState([]);
  const isPublicPage = location.pathname === "/";

  const [users, setUsers] = useState([]);

  const profileMenuRef = useRef();

  const profileMenu = () => {
    setProfil(!profil);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setAuth({});
    navigate("/login");
    toast.success("Logout successful!");
  };

  const handleOutsideClick = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file); // Simpan file gambar profil yang dipilih dalam state
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setProfil(false); // Tutup menu profil saat logout
    }
  }, [isLoggedIn]);

  return (
    <>
      <nav className="bg-white md:px-6 max-w-screen-2xl mx-auto text-white fixed top-0 right-0 left-0 shadow-xl space-x- flex">
        <div className="text-xl container mx-auto flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <a href="/" className="text-2xl font-semibold flex items-center">
              <img src={logo} alt="" className="w-[90px] inline-block items-center  hover:rounded transition duration-300" />
            </a>

            {/* Nav bar showing */}
            <ul className="md:flex space-x-4 hidden  flex-col md:flex-row justify-start items-start">
              <li
                className={`rounded-xl  border-blue-700 px-3 py-5  font-semibold uppercase text-primary transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:rounded-md hover:shadow-[3px_3px_0px_fuchsia] text-[12px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none ${
                  location.pathname === "/" ? "text-fuchsia-400 active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none translate-y-[-2px] translate-x-[-2px] shadow-[3px_3px_0px_fuchsia]" : ""
                }`}
              >
                <Link to="/">HOMEPAGE</Link>
              </li>
              <li
                className={`rounded-xl  border-blue-700 px-3 py-5  font-semibold uppercase text-primary transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:rounded-md hover:shadow-[3px_3px_0px_teal] text-[12px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none ${
                  location.pathname === "/user-dashboard"
                    ? "text-teal-400 active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none translate-y-[-2px] translate-x-[-2px] shadow-[3px_3px_0px_teal]"
                    : ""
                }`}
              >
                <Link to="/user-dashboard">TRUFFLEHOG</Link>
              </li>
              <li
                className={`rounded-xl  border-blue-700 px-3 py-5  font-semibold uppercase text-primary transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:rounded-md hover:shadow-[3px_3px_0px_orange] text-[12px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none${
                  location.pathname === "/repo" ? "text-orange-400 active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none translate-y-[-2px] translate-x-[-2px] shadow-[3px_3px_0px_orange]" : ""
                }`}
              >
                <Link to="/repo">RESULT SCANNING</Link>
              </li>
            </ul>
          </div>
          <div className="space-x-4 hidden md:flex items-center relative">
            {isLoggedIn ? (
              <div className="relative flex items-center" ref={profileMenuRef}>
                <div className="absolute h-full right-16 top-0 bg-gray-300 w-px"></div>

                {/* Logo Profil */}
                <img src={Profile} alt="Profile Icon" className="ml-2 w-9 hover:rounded cursor-pointer transition duration-200 transform hover:scale-110" onClick={profileMenu} />

                {profil && (
                  <div className="absolute right-0 mt-[150px] w-40 bg-white shadow-lg rounded-lg py-1 z-10">
                    <ul>
                      <li className="px-4 text-[13px]  py-2 cursor-pointer hover:bg-gray-100 text-black">
                        <Link to="/profile">PROFILE</Link>
                      </li>
                      <li className="px-4 text-[13px]  py-2 cursor-pointer hover:bg-gray-100 text-black" onClick={handleLogout}>
                        LOGOUT
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                {isPublicPage && (
                  <>
                    <Link to="/login">
                      <button className="py-2 px-2 text-[13px] transition-all text-secondary rounded hover:text-white hover:bg-blue-500 transform hover:scale-95 duration-200">
                        <RiLoginBoxFill className="inline-block size-5" /> LOGIN {/* Ikon login */}
                      </button>
                    </Link>
                    <Link to="/register">
                      <button className="py-2 text-[13px]   px-2 transition-all  rounded hover:text-white text-white bg-blue-700 hover:bg-primary transform hover:scale-95 duration-200">REGISTER</button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <div className="md:hidden p-4">
            <button onClick={toggleMenu} className="text-primary focus:outline-none focus:text-gray-300">
              {isMenuOpen ? <FaXmark className="w-6 h-6 text-white" /> : <FaBars className="w-6 h-6 text-primary " />}
            </button>
          </div>
        </div>
      </nav>

      <div className={` space-y-4 px-4 pt-24 pb-5 bg-[#010851] text-[15px] text-white md:hidden ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
        <ul>
          <li className="border-transparent text-[13px] transition duration-300 hover:text-fuchsia-400 py-5">
            <Link to="/">HOMEPAGE</Link>
          </li>
          <li className="border-transparent text-[13px] transition duration-300 hover:text-teal-400 py-5">
            <Link to="/user-dashboard">TRUFFLEHOG</Link>
          </li>
          <li className="border-transparent text-[13px] transition duration-300 hover:text-orange-400 py-5">
            <Link to="/repo">SCANNING RESULT</Link>
          </li>
          {!isLoggedIn && (
            <>
              <li className="border-transparent text-[13px] transition duration-300 hover:text-orange-400 py-5">
                <Link to="/login"> LOGIN</Link>
              </li>
              <li className="border-transparent text-[13px] transition duration-300 hover:text-orange-400 py-5">
                <Link to="/register">REGISTER</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="border-transparent text-[13px] transition duration-300 hover:text-orange-400 py-5">
                <Link to="/profile">PROFILE</Link>
              </li>
              <li className="border-transparent text-[13px] transition duration-300 hover:text-orange-400 py-5" onClick={handleLogout}>
                LOGOUT
              </li>
            </>
          )}
        </ul>
      </div>

      {/* {isProfileOpen && <EditProfile user={auth.user} onClose={() => setIsProfileOpen(false)} onUpdate={(handleUpdateUser) => {}} />} */}
      {profileImage && <UpdateProfile profileImage={profileImage} onClose={() => setProfileImage(null)} onUpdate={handleUpdateUser} />}
    </>
  );
};

export default Navbar;
