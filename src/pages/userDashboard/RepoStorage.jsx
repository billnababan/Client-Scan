import React from "react";
import Navbar from "../../components/Navbar";
import Modal from "../../components/RepoModal";
// import Modal from "../../components/ModalRepo";
import Footer from "../../components/Footer";

const RepoStorage = () => {
  return (
    <div>
      <Navbar />
      {/* <Modal /> */}
      <Modal />
      <Footer />
    </div>
  );
};

export default RepoStorage;
