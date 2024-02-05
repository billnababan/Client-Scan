import logo from "../assets/logo-login.png";
import fbImg from "../assets/FB.png";
import Instagram from "../assets/IG.png";
import LinkedIn from "../assets/LI.png";

const Footer = () => {
  return (
    <div className="bg-[#010851] md:px-14 p-4 max-w-screen-2xl mx-auto text-white">
      <div className="my-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 space-y-8">
          <a href="/" className="text-2xl font-semibold flex items-center space-x-3 text-primary">
            <img src={logo} alt="" className="w-10 inline-block items-center" /> <span className="text-white">BILJEFF</span>
          </a>

          <div>
            <input type="email" name="email" id="email" placeholder="Your Email" className="bg-[#9a7af159] py-2 px-4 rounded-md focus:outline-none" />
            <input type="submit" value="Follow" className="px-4 py-2 bg-secondary rounded-md -ml-2 cusor-pointer hover:bg-white hover:text-primary duration-300 transition-all" />
          </div>
        </div>
        {/* Footer navigati */}
        <div className="md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start">
          <div className="space-y-4 mt-5">
            <h4 className="text-xl">Platform</h4>
            <ul className="space-y-3">
              <a href="/" className="block hover:text-gray-300">
                Overview
              </a>
              <a href="/" className="block hover:text-gray-300">
                Features
              </a>
            </ul>
          </div>
          <div className="space-y-4 mt-5">
            <h4 className="text-xl">Help</h4>
            <ul className="space-y-3">
              <a href="/" className="block hover:text-gray-300">
                Contact Me!!
              </a>
            </ul>
          </div>
          <div className="space-y-4 mt-5">
            <h4 className="text-xl">Contact</h4>
            <ul className="space-y-3">
              <p className=" hover:text-gray-300">(0812 - 2121 - 2122)</p>
              <p className=" hover:text-gray-300">billnbbn@gmail.com</p>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8">
        <p>@ BILLJEFF --- 2024. All rights reserved.</p>
        <div className="flex items-center space-x-5">
          <img src={fbImg} alt="" className="w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300" />
          <img src={Instagram} alt="" className="w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300" />
          <img src={LinkedIn} alt="" className="w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
