import React from "react";
// import banner from "../assets/Group.png";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <div className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-24">
      <div className="gradientBg rounded-xl rounded-br-[80px] md:p-9 px-4 py-9">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
          <div>{/* <img src={banner} alt="" className="lg:h-[386px]" /> */}</div>
          {/* content home */}
          <div className="md:w-3/5">
            <h2 className="md:text-7xl text-4xl font-bold text-white mb-6 leading-relaxed">
              <TypeAnimation sequence={["Find Your secret key Kredensial", 600, "Scan your Repo Here!!", 400]} cursor={true} repeat={Infinity} />
            </h2>
            <p className="text-[#EBEBEB] text-2x; mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis cumque expedita consequatur amet quisquam!</p>
            <div className="space-x-5 space-y-4">
              <button className="btnPrimary">Get Started</button>
              <button className="btnPrimary">Detect Your repo Here!!</button>
            </div>
          </div>

          {/* home image */}
        </div>
      </div>
    </div>
  );
};

export default Home;
