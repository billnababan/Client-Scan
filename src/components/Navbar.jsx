import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/logo-login.png";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Profile from "../assets/userprofil.jpeg";
import EditProfile from "../pages/userDashboard/EditProfile";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../../constants";
import logout from "../tokenremove/LogoutRemove";
import UpdateProfile from "../pages/userDashboard/ChangeProfile";

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

  const handleEditProfile = () => {
    setIsProfileOpen(true); // Show EditProfile modal when profile icon is clicked
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".edit-profile-modal")) {
      setIsProfileOpen(false); // Menutup modal EditProfile ketika area di luar form diklik
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
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/getAll");
        setUsers(response.data.roles);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <nav className="bg-[#010851] md:px-14 p-4 max-w-screen-2xl mx-auto text-white relative top-0 right-0 left-0">
        <div className="text-xl container mx-auto flex justify-between items-center">
          <div className="flex space-x-80 items-center">
            <a href="/" className="text-2xl font-semibold flex items-center space-x-3">
              <img src={logo} alt="" className="w-10 inline-block items-center rounded-full" />
            </a>

            {/* Nav bar showing */}
            <ul className="md:flex  space-x-28 hidden text-[18px]">
              <li className="hover:text-indigo-400">
                <Link to="/">Homepage</Link>
              </li>
              <li className="hover:text-indigo-400">
                <Link to="/about">About</Link>
              </li>
              <li className="hover:text-indigo-400">
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="space-x-12 hidden md:flex items-center relative">
            {isLoggedIn ? (
              <div className="relative">
                <img src={Profile} alt="Profile Icon" className="w-8 h-8 rounded-full cursor-pointer" onClick={profileMenu} />
                {profil && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-1 z-10">
                    <ul>
                      <li className="px-4 text-[15px] py-2 cursor-pointer hover:bg-gray-100 text-black" onClick={handleEditProfile}>
                        Edit Profile
                      </li>
                      <li className="px-4 text-[15px] py-2 cursor-pointer hover:bg-gray-100 text-black" onClick={handleLogout}>
                        Logout
                      </li>
                      <li className="px-4 text-[15px] py-2 cursor-pointer hover:bg-gray-100 text-black">
                        <input type="file" onChange={handleProfileImageChange} className="hidden" />
                        <label htmlFor="upload-profile-image">Change Profile</label>
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
                      <button className="py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-400">Login</button>
                    </Link>
                    <Link to="/register">
                      <button className="bg-blue-500 py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-400">Register</button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* menu button on mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none focus:text-gray-300">
              {isMenuOpen ? <FaXmark className="w-6 h-6 text-white" /> : <FaBars className="w-6 h-6 text-white " />}
            </button>
          </div>
        </div>
      </nav>

      <div className={`space-y-4 px-4 pt-24 pb-5 bg-[#010851] text-xl text-white  ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
        <ul>
          <li className="hover:text-indigo-400">
            <Link to="/">Homepage</Link>
          </li>
          <li className="hover:text-indigo-400">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-indigo-400">
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </div>
      {isProfileOpen && <EditProfile user={auth.user} onClose={() => setIsProfileOpen(false)} onUpdate={(handleUpdateUser) => {}} />}
      {profileImage && <UpdateProfile profileImage={profileImage} onClose={() => setProfileImage(null)} onUpdate={handleUpdateUser} />}
    </>
  );
};

export default Navbar;
