import React from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import FormRepo from "../../components/FormRepo";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <FormRepo />
      <Footer />
    </div>
  );
};

export default Dashboard;
