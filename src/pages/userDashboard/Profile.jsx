import React from "react";
import Navbar from "../../components/Navbar";
import EditProfile from "./EditProfile";
import Footer from "../../components/Footer";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <EditProfile />
      <Footer />
    </div>
  );
};

export default Profile;
