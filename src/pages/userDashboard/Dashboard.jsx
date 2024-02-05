import React from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import FormRepo from "../../components/FormRepo";

const Dashboard = () => {
  return (
    <div>
      <div className="h-screen">
        <Navbar />
        <FormRepo />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
