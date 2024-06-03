// import React from "react";
import AboutImg from "../../src/assets/about1.jpg";
import logo1 from "../../src/assets/repo.png";
import logo3 from "../../src/assets/security.png";
import logo4 from "../../src/assets/github.png";
import logo2 from "../../src/assets/line-chart.png";

const About = () => {
  return (
    <div>
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto my-8">
        <div className="md:w-11/12 mx-auto flex flex-col md:flex-row justify-between">
          <div>
            <img src={AboutImg} alt="" />
          </div>
          <div className="md:w-3/5 mx-auto">
            <h2 className="text-4xl text-gray-800 font-semibold mb-4 md:w-4/5">
              {" "}
              What is <span className="textBg">TruffleHog</span> ?
            </h2>
            <p className="md:w-3/4 text-sm text-gray-800 mb-8 text-justify">
              TruffleHog is a secrets scanning tool that digs deep into your code repositories to find secrets, passwords, and sensitive keys. Secrets scattered across your SDLC — from Git repos to ticket systems — pose serious
              risks. A single leak can trigger security breaches, legal trouble, and reputation damage. By scanning all branches, not just the main or primary branch, TruffleHog™ ensures a consistent level of security across your
              entire project. This is particularly useful for larger projects with multiple branches being worked on concurrently.
            </p>
            <a href="https://trufflesecurity.com/trufflehog" target="_blank" className="btnPrimary">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Grafik Kebocoran data */}
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto bg-neutralSilver py-16 ">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-4xl text-gray-800 font-semibold mb-4 md:w-2/3">
              Data related To the 2023 <br />
              <span className="textBg "> Github Secret </span>leak
            </h2>
            <p>Check it out on the right!!!</p>
          </div>

          {/* stats */}
          <div className="md:w-1/2 mx-auto flex sm:flex-row flex-col sm:items-center justify-around">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={logo1} alt="" className="w-[48px] transition-all duration-300 hover:-translate-y-3" />
                <div>
                  <h4 className="text-2xl text-gray-800 font-semibold">12.8 million Secrets</h4>
                  <p>Millions of secrets and auth keys were leaked on GitHub 2023</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img src={logo2} alt="" className="w-[48px] transition-all duration-300 hover:-translate-y-3" />
                <div>
                  <h4 className="text-2xl text-gray-800 font-semibold">12,8 Millions </h4>
                  <p>In 2023, GitGuardian reported 12.8 million secrets.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <img src={logo3} alt="" className="w-[48px] transition-all duration-300 hover:-translate-y-3" />
                <div>
                  <h4 className="text-2xl text-gray-800 font-semibold">Security </h4>
                  <p>Hard-coded credentials</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img src={logo4} alt="" className="w-[48px] transition-all duration-300 hover:-translate-y-3" />
                <div>
                  <h4 className="text-2xl text-gray-800 font-semibold">50 Millions</h4>
                  <p>Total number of github users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
