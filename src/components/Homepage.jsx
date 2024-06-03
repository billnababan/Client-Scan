import React from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import logoHome from "../../src/assets/homepage.png";
import logoHome2 from "../../src/assets/slide2.png";
import logoHome3 from "../../src/assets/slide3.png";

const Homepage = () => {
  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto  h-auto bg-neutralSilver">
      <div className="w-full mx-auto">
        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse   items-center justify-between gap-12 ">
          <div>
            <img src={logoHome} alt="" />
          </div>
          <div className="md:w=1/2">
            <h1 className="text-4xl font-semibold mb-4 text-gray-800 md:w-3/4 leading-snug">
              Check Your Repository by<span className="text-teal-400 leading-snug text-3xl"> TRUFFLEHOG</span>
            </h1>
            <p className="text-gray-800  text-base mb-8 ">Detect your Repository here, for the Security of your data</p>
            <button className="btnSecondary">
              <Link to="/user-dashboard">Scan Here!!!</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
