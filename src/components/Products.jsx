import React from "react";
import Product from "../../src/assets/product.jpg";
import docker from "../../src/assets/docker.png";
import python from "../../src/assets/python.png";
import aws from "../../src/assets/aws.png";
import social from "../../src/assets/social.png";
import key from "../../src/assets/key.png";
import secret from "../../src/assets/secret1.png";

const Products = () => {
  return (
    <div>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between">
          <div>
            <img src={Product} alt="" />
          </div>
          <div className="md:w-3/5 mx-auto">
            <h2 className="text-3xl text-gray-800 font-semibold mb-4 md:w-4/5">
              {" "}
              Learn more about Hard-coded <span className="textBg"> Credentials</span> ?
            </h2>
            <p className="md:w-3/4 text-sm text-gray-800 mb-8 text-justify">
              Hard-coding credentials is the software development practice of embedding authentication data -- user IDs and passwords -- directly into the source code of a program or other executable object. This is as opposed to
              obtaining the credentials from external sources or generating them at runtime. The CERN Computer Security Team observed that "hardcoding passwords is a short name for putting non-encrypted (plain text) passwords and
              other secret data (like private keys etc.) into the source code."
            </p>
            <a href="https://www.techtarget.com/searchsecurity/tip/How-hard-coded-credentials-threaten-industrial-control-systems" target="_blank" className="btnPrimary">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Grafik Kebocoran data */}
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-neutralSilver py-16 ">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/3">
            <img src={secret} alt="" />
          </div>

          {/* stats */}
          <div className="md:w-2/3 mx-auto">
            <div>
              <p className="md:w-4/5 text-sm text-gray-800 mb-8 leading-7 text-justify">
                Bill Jefferson, a highly skilled full-stack JavaScript developer, boasts mastery in ReactJS, ExpressJS, and MySQL, showcasing profound expertise in crafting dynamic and efficient web applications. With a robust
                command over frontend and backend technologies, Bill excels in architecting seamless user experiences and scalable server-side solutions. His adeptness extends beyond mere coding proficiency, encompassing a deep
                understanding of software architecture and best practices.
              </p>
              <h5 className="text-primary text-xl font-semibold mb-2">Bill Jeff</h5>
              <p>Full Stack Developer </p>
              <div>
                <div className="flex items-center gap-8 flex-wrap">
                  <img src={aws} alt="" className="pointer  hover:scale-110 duration-200 transition-all hover:translate-y-3" />
                  <img src={docker} alt="" className="pointer  hover:scale-110 duration-200 transition-all hover:translate-y-3" />
                  <img src={social} alt="" className="pointer  hover:scale-110 duration-200 transition-all hover:translate-y-3" />
                  <img src={python} alt="" className="pointer  hover:scale-110 duration-200 transition-all hover:translate-y-3" />
                  <img src={key} alt="" className="pointer  hover:scale-110 duration-200 transition-all hover:translate-y-3" />
                  <div>
                    <a href="https://www.instagram.com/bill_jeferson/" className="font-bold text-primary hover:text-secondary" target="_blank">
                      Contact Me Here!!!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
