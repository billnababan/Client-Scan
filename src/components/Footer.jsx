import logo from "../assets/Logo-web.jpeg";
import fbImg from "../assets/FB.png";
import Instagram from "../assets/IG.png";
import LinkedIn from "../assets/LI.png";

const Footer = () => {
  return (
    <div className="bg-[#010851] md:px-14 p-4 max-w-screen-2xl mx-auto text-white">
      <div className="my-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 space-y-8">
          <a href="/" className="text-2xl font-semibold flex items-center space-x-3 text-primary">
            <img src={logo} alt="" className="w-14 inline-block items-center hover:rounded  hover:scale-110 duration-200" /> <span className="text-white text-[14px] textBg">BILJEFF</span>
          </a>

          <div>
            <input type="email" name="email" id="email" placeholder="Your Email" className=" bg-[#9a7af159] py-2 px-4 rounded-md focus:outline-none" />
            <input type="submit" value="Follow" className="text-[16px] px-4 py-2 bg-secondary rounded-md -ml-2 cursor-pointer hover:bg-white hover:text-primary duration-300 transition-all" />
          </div>
        </div>
        {/* Footer navigati */}
        <div className="md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start">
          <div className="space-y-4 mt-5">
            <h4 className="text-xl">Platform</h4>
            <ul className="space-y-3">
              <a href="/" className="block hover:text-gray-300 text-[15px]">
                Overview
              </a>
              <a href="/" className="block hover:text-gray-300 text-[15px]">
                Trufflehog
              </a>
            </ul>
          </div>
          <div className="space-y-4 mt-5">
            <h4 className="text-xl">Help</h4>
            <ul className="space-y-3">
              <a href="/" className="block hover:text-gray-300 text-[15px]">
                Contact Me!!
              </a>
            </ul>
          </div>
          <div className="space-y-4 mt-5">
            <h4 className="text-xl">Contact</h4>
            <ul className="space-y-3">
              <p className=" hover:text-gray-300 textBg">(0812 - 2121 - 2122)</p>
              <p className=" hover:text-gray-300 textBg">billnbbn@gmail.com</p>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8">
        <p className="textBg">@ BILLJEFF --- 2024. All rights reserved.</p>
        <div className="flex items-center space-x-5">
          <a
            href="https://www.facebook.com/bill.jeferson.391"
            target="_blank"
            className="cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-blue-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
          >
            <svg class="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/bill-jeferson-nababan-4878a9244/"
            target="_blank"
            className="cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-blue-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
          >
            <svg class="w-5 h-5 fill-current" role="img" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path>
              </g>
            </svg>
          </a>
          <a href="https://github.com/billnababan" target="_blank" className="cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-gray-700 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" role="img" class="w-5" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/bill_jeferson/"
            target="_blank"
            className="cursor-pointer hover:-translate-y-2 transition-all duration-300 inline-block rounded px-[10px] py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md  ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            style={{ backgroundColor: "#c13584" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href="https://t.me/bill_jeferson"
            target="_blank"
            className="cursor-pointer hover:-translate-y-2 transition-all duration-300 inline-block rounded px-[10px] py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md  ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            style={{ backgroundColor: "#0088cc" }}
          >
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve"
              style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinejoin: "round",
                strokeMiterlimit: "1.41421",
              }}
            >
              <path
                id="telegram-1"
                d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
