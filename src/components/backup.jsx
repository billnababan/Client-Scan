// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { FaTrashCan } from "react-icons/fa6";
// // // import { BiSolidDetail } from "react-icons/bi";

// // // const ManageDataContent = () => {
// // //   const [repos, setRepos] = useState([]);
// // //   const [selectedCredential, setSelectedCredential] = useState(null);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [repoPerPage] = useState(5);
// // //   const [searchTerm, setSearchTerm] = useState("");

// // //   useEffect(() => {
// // //     const fetchRepo = async () => {
// // //       try {
// // //         const response = await axios.get("http://localhost:4000/api/detectt/allrepo");
// // //         console.log(response.data);
// // //         setRepos(response.data.dataRepo);
// // //       } catch (error) {
// // //         console.error("Error fetching repository from database:", error);
// // //       }
// // //     };

// // //     fetchRepo();
// // //   }, []);

// // //   const indexOfLastRepo = currentPage * repoPerPage;
// // //   const indexOfFirstRepo = indexOfLastRepo - repoPerPage;
// // //   const filteredRepo =
// // //     repos && repos.length > 0
// // //       ? repos.filter((repo) => {
// // //           return repo.repo_url.toLowerCase().includes(searchTerm.toLowerCase()) || repo.credential.toLowerCase().includes(searchTerm.toLowerCase());
// // //         })
// // //       : [];
// // //   const currentRepo = filteredRepo.slice(indexOfFirstRepo, indexOfLastRepo);

// // //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// // //   const handleDeleteRepo = async (repoId) => {
// // //     try {
// // //       await axios.delete(`http://localhost:4000/api/detectt/deleterepo/${repoId}`);
// // //       const updateRepo = repos.filter((repo) => repo.id !== repoId);
// // //       setRepos(updateRepo);
// // //     } catch (error) {
// // //       console.error("Error deleting repo:", error);
// // //     }
// // //   };

// // //   // const handleShowDetail = (credential) => {
// // //   //   if (selectedCredential !== credential) {
// // //   //     setSelectedCredential(credential);
// // //   //   }
// // //   //   setShowModal(true);
// // //   // };

// // //   return (
// // //     <div className="h-screen w-full flex flex-col justify-center items-center">
// // //       <div className="max-w-4xl w-full">
// // //         <h1 className="text-xl font-bold mb-3">Manage Data Repository</h1>

// // //         <div className="flex flex-col md:flex-row md:justify-between">
// // //           <div className="flex items-center mb-3 md:mb-0 md:w-1/3">
// // //             <p className="text-sm font-medium mr-2">Search</p>
// // //             <input type="text" placeholder="Search" className="ml-2 px-2 py-2 rounded-lg border border-gray-300" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // //           </div>
// // //         </div>

// // //         <div className="w-full flex justify-center mt-5">
// // //           <table className="w-full table-auto border-collapse border border-gray-300 rounded-t-lg">
// // //             <thead className="bg-blue-500 text-white rounded-t-lg">
// // //               <tr>
// // //                 <th className="px-6 py-3 text-sm font-medium text-center uppercase border border-gray-300 rounded-t-lg">No</th>
// // //                 <th className="px-6 py-3 text-sm font-medium text-center uppercase border border-gray-300 rounded-t-lg">Repo URL</th>

// // //                 <th className="px-6 py-3 text-sm font-medium text-center uppercase border border-gray-300 rounded-t-lg">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white">
// // //               {currentRepo.map((repo, index) => (
// // //                 <tr key={repo.id}>
// // //                   <td className="px-6 py-4 text-center border border-gray-300">{index + 1}</td>
// // //                   <td className="px-6 py-4 border border-gray-300">{repo.repo_url}</td>

// // //                   <td className="px-6 py-4 text-center border border-gray-300">
// // //                     <button onClick={() => handleDeleteRepo(repo.id)} className="bg-red-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200 transform hover:scale-110">
// // //                       Delete
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         <div className="flex justify-center mt-4">
// // //           <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-2 hover:bg-gray-300 px-4 py-2 rounded-md bg-blue-500 duration-200 transform hover:scale-95">
// // //             Prev
// // //           </button>
// // //           {Array.from({ length: Math.min(5, Math.ceil(filteredRepo.length / repoPerPage)) }).map((_, pageNumber) => {
// // //             const page = pageNumber + 1;
// // //             return (
// // //               <button key={page} onClick={() => paginate(page)} className={`mx-1 bg-blue-500 hover:bg-gray-300 px-4 py-2 rounded-md duration-200 transform hover:scale-95 ${currentPage === page && "bg-blue-500 text-white"}`}>
// // //                 {page}
// // //               </button>
// // //             );
// // //           })}
// // //           <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRepo >= repos.length} className="ml-2 bg-blue-500 hover:bg-gray-300 px-4 py-2 rounded-md duration-200 transform hover:scale-95">
// // //             Next
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ManageDataContent;

// // // import { Link } from "react-router-dom";
// // // import logoLogin from "../assets/Logo-web.jpeg";

// // // // export default function Header({ heading, paragraph, linkName, linkUrl = "#" }) {
// // // //   return (
// // // //     <div className="mb-10 text-center">
// // // //       <div className="flex justify-center">
// // // //         <img alt="" className="h-10 w-16 rounded-lg " src={logoLogin} />
// // // //       </div>
// // // //       <h2 className="mt-6 text-xl md:text-3xl lg:text-xl font-extrabold text-gray-900">{heading}</h2>
// // // //       <p className="mt-2 text-sm md:text-base text-gray-600">
// // // //         {paragraph}{" "}
// // // //         <Link to={linkUrl} className="font-medium text-gray-900 hover:text-gray-500">
// // // //           {linkName}
// // // //         </Link>
// // // //       </p>
// // // //     </div>
// // // //   );
// // // // }

// // // // import React from "react";
// // // // // import banner from "../assets/Group.png";
// // // // import { TypeAnimation } from "react-type-animation";

// // // // const Home = () => {
// // // //   return (
// // // //     <div className="md:px-12 p-4 max-w-screen-2xl mx-auto mt-24">
// // // //       <div className="bg-primary rounded-[15px]  md:p-9 px-4 py-9">
// // // //         <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
// // // //           <div>{/* <img src={banner} alt="" className="lg:h-[386px]" /> */}</div>
// // // //           {/* content home */}
// // // //           <div className="md:w-3/5">
// // // //             <h2 className="md:text-6xl text-4xl font-bold text-white mb-6 leading-relaxed underline textBg">
// // // //               {/* <TypeAnimation sequence={["Find Your secret key Kredensial", 600, "Scan your Repo Here!!", 400]} cursor={true} repeat={Infinity} /> */}
// // // //               Scan Your Repo Here!!
// // // //             </h2>
// // // //             <p className="text-white text-lg mb-8 text-justify">
// // // //               Welcome to our repository scanning tool! This powerful feature enables you to thoroughly examine your repository for any discrepancies, vulnerabilities, or areas that require attention. With just a few clicks, you
// // // //               can ensure the integrity and security of your codebase.
// // // //             </p>
// // // //             <div className="space-x-5 space-y-4">
// // // //               <button className="btnPrimary">Get Started</button>
// // // //               <button className="btnPrimary">Detect Your repo Here!!</button>
// // // //             </div>
// // // //           </div>

// // // //           {/* home image */}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Home;

// // // // import features from "../assets/section2.png";

// // // // const Features = () => {
// // // //   return (
// // // //     <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
// // // //       <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
// // // //         <div className="lg:w-1/4">
// // // //           <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">Why should use this web?</h3>
// // // //           <p className="text-base text-tartiarty">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium nam nisi modi dolore!</p>
// // // //         </div>

// // // //         {/* features card */}

// // // //         <div className="w-full lg:w-3/4">
// // // //           <div className="grid md:grid-cols-3 sm:grod-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
// // // //             <div className="bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8  flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
// // // //               <div>
// // // //                 <img src={features} alt="" />
// // // //                 <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">Consistenct web</h5>
// // // //               </div>
// // // //             </div>
// // // //             <div className="bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8  flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16">
// // // //               <div>
// // // //                 <img src={features} alt="" />
// // // //                 <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">Consistenct web</h5>
// // // //               </div>
// // // //             </div>
// // // //             <div className="bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8  flex justify-center items-center hover:-translate-y-4 transition-all duration-300 cursor-pointer">
// // // //               <div>
// // // //                 <img src={features} alt="" />
// // // //                 <h5 className="text-2xl font-semibold text-primary px-5 text-center mt-5">Consistenct web</h5>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Features;

// // // // import React from "react";
// // // // import { Carousel } from "flowbite-react";
// // // // import { Link } from "react-router-dom";
// // // // import logoHome from "../../src/assets/homepage.png";
// // // // import logoHome2 from "../../src/assets/slide2.png";
// // // // import logoHome3 from "../../src/assets/slide3.png";

// // // // const Homepage = () => {
// // // //   return (
// // // //     <div className="bg-neutralSilver">
// // // //       <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
// // // //         <Carousel className="w-full mx-auto">
// // // //           <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse   items-center justify-between gap-12 ">
// // // //             <div>
// // // //               <img src={logoHome} alt="" />
// // // //             </div>
// // // //             <div className="md:w=1/2">
// // // //               <h1 className="text-4xl font-semibold mb-4 text-gray-800 md:w-3/4 leading-snug">
// // // //                 Check Your Repository by<span className="text-teal-400 leading-snug text-3xl"> TRUFFLEHOG</span>
// // // //               </h1>
// // // //               <p className="text-gray-800  text-base mb-8 ">Detect your Repository here, for the Security of your data</p>
// // // //               <button className="btnSecondary">
// // // //                 <Link to="/user-dashboard">Scan Here!!!</Link>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //           <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse   items-center justify-between gap-12 ">
// // // //             <div>
// // // //               <img src={logoHome2} alt="" />
// // // //             </div>
// // // //             <div className="md:w=1/2">
// // // //               <h1 className="text-4xl font-semibold mb-4 text-gray-800 md:w-3/4 leading-snug">
// // // //                 See More Here About <span className="text-blue-600 leading-snug text-3xl"> TRUFFLEHOG</span>
// // // //               </h1>
// // // //               <p className="text-gray-800  text-base mb-8 ">TruffleHog is a free security tool </p>

// // // //               <a href="https://www.blackhillsinfosec.com/rooting-for-secrets-with-trufflehog/#:~:text=TruffleHog%201%20is%20a%20free,secrets%2C%20and%20other%20sensitive%20data." className="btnSlide2" target="_blank">
// // // //                 Read more
// // // //               </a>
// // // //             </div>
// // // //           </div>
// // // //           <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse   items-center justify-between gap-12 ">
// // // //             <div>
// // // //               <img src={logoHome3} alt="" />
// // // //             </div>
// // // //             <div className="md:w=1/2">
// // // //               <h1 className="text-4xl font-semibold mb-4 text-gray-800 md:w-3/4 leading-snug">
// // // //                 How Important to Check <span className="text-yellow-400 leading-snug text-3xl">Hardcoded Credentials</span>
// // // //               </h1>
// // // //               <p className="text-gray-800  text-base mb-8 ">Checking Hardcoded Credentials is crucial.</p>
// // // //               <a
// // // //                 href="https://www.beyondtrust.com/blog/entry/hardcoded-and-embedded-credentials-are-an-it-security-hazard-heres-what-you-need-to-know#:~:text=Hardcoded%20credentials%20are%20favored%20targets,)%2C%20systems%2C%20and%20software."
// // // //                 target="_blank"
// // // //                 className="btnSlide3"
// // // //               >
// // // //                 See Details
// // // //               </a>
// // // //             </div>
// // // //           </div>
// // // //         </Carousel>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Homepage;

// // // // app.post("/upload", upload.array("images", 4), (req, res) => {
// // // //   console.log("UPLOAD MULTIPLES");

// // // //   const imagePath = req.file;
// // // //   console.log("req.file", imagePath);
// // // //   const imagePaths = req.files;
// // // //   console.log("req.files", imagePaths);
// // // //   res.json({
// // // //     data: imagePaths,
// // // //   });
// // // // });

// // // // app.post("/upload-single", upload.single("images"), (req, res) => {
// // // //   console.log("UPLOAD SINGLE");
// // // //   const imagePath = req.file;
// // // //   console.log("req.file", imagePath);
// // // //   const imagePaths = req.files;
// // // //   console.log("req.files", imagePaths);
// // // //   res.json({
// // // //     data: imagePath,
// // // //   });
// // // // });

// // // // creden 05 mei 2024
// // // {showModal && (
// // //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// // //     <div ref={modalRef} className="bg-white rounded-lg overflow-hidden border border-gray-300 w-[600px] max-h-[80vh] overflow-y-auto">
// // //       <span className="absolute top-0 right-0 m-4 cursor-pointer" onClick={handleCloseModal}>
// // //         &times;
// // //       </span>
// // //       <div className="p-4">
// // //         {selectedCredential && Array.isArray(selectedCredential) && (
// // //           <div className="bg-white text-black mx-auto">
// // //             <h2 className="text-lg font-semibold bg-blue-500 text-white py-5 px-6 text-center rounded-t-lg">Detail Credential</h2>
// // //             {Object.keys(selectedCredential).map((credential, index) => (
// // //               <div key={index} className="credential-info">
// // //                 <p>
// // //                   <strong>Reason:</strong> {credential.reason}
// // //                 </p>
// // //                 <p>
// // //                   <strong>Date:</strong> {credential.date}
// // //                 </p>
// // //                 <p>
// // //                   <strong>Path:</strong> {credential.path}
// // //                 </p>
// // //                 <p>
// // //                   <strong>Strings Found:</strong> {credential.stringsFound.join(", ")}
// // //                 </p>
// // //                 <button onClick={() => handleExportExcel(credential)} className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 transition-all duration-200 hover:bg-green-600">
// // //                   Export to Excel
// // //                 </button>
// // //                 <button onClick={handleCloseModal} className="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-200 hover:bg-blue-600">
// // //                   Close
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   </div>
// // // )}

// // pervcobaan kedua lumayan medning

// // {showModal && (
// //   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //     <div ref={modalRef} className="bg-white rounded-lg overflow-hidden border border-gray-300 w-[600px] max-h-[80vh] overflow-y-auto">
// //       <span className="absolute top-0 right-0 m-4 cursor-pointer" onClick={handleCloseModal}>
// //         &times;
// //       </span>
// //       <div className="p-4">
// //         {selectedCredential && (
// //           <div className="bg-white text-black mx-auto">
// //             <h2 className="text-lg font-semibold bg-blue-500 text-white py-5 px-6 text-center rounded-t-lg">Detail Credential</h2>
// //             <p>
// //               <strong>Branch:</strong> {selectedCredential.branch}
// //             </p>
// //             <p>
// //               <strong>Date:</strong> {selectedCredential.date}
// //             </p>
// //             <p>
// //               <strong>Reason:</strong> {selectedCredential.reason}
// //             </p>
// //             <p>
// //               <strong>Secret Key:</strong> {selectedCredential.stringsFound} {/* Ambil elemen pertama dari array stringsFound */}
// //             </p>
// //             <button onClick={handleExportExcel} className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 transition-all duration-200 hover:bg-green-600">
// //               Export to Excel
// //             </button>
// //             <button onClick={handleCloseModal} className="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-200 hover:bg-blue-600">
// //               Close
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   </div>
// // )}

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { BiSolidPencil } from "react-icons/bi";
// import { FaTrashCan } from "react-icons/fa6";

// export default function Modal() {
//   const [showModal, setShowModal] = useState(false);
//   const [repos, setRepos] = useState([]);
//   const [selectedCredential, setSelectedCredential] = useState(null);
//   const [validButtonVisible, setValidButtonVisible] = useState(false);
//   const [notValidButtonVisible, setNotValidButtonVisible] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [reposPerPage] = useState(5);

//   useEffect(() => {
//     const fetchRepoByUserId = async () => {
//       try {
//         const userDataString = localStorage.getItem("user");
//         const userData = JSON.parse(userDataString);

//         if (!userData) {
//           console.log("Tidak ada data pengguna yang tersimpan di localStorage atau data pengguna kosong.");
//           return;
//         }

//         console.log("User ID:", userData);
//         const response = await axios.get(`http://localhost:4000/api/detectt/repoUser/${userData.id}`);
//         setRepos(response.data.credentials); // Sesuaikan dengan struktur respons yang diperlukan
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching repo:", error);
//       }
//     };

//     fetchRepoByUserId();
//   }, []);

//   const modalRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         setShowModal(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const indexOfLastRepo = currentPage * reposPerPage;
//   const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
//   const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

//   const paginate = (pageNumber) => {
//     const firstRepoOnPage = (pageNumber - 1) * reposPerPage + 1;
//     setCurrentPage(pageNumber);
//     setSelectedCredential(null); // Reset selectedCredential saat berpindah halaman
//   };

//   const handleShowDetail = (credential) => {
//     if (selectedCredential !== credential) {
//       setSelectedCredential(credential);
//     }
//     setShowModal(true);
//   };

//   const deleteRepo = async (repoId) => {
//     try {
//       await axios.delete(`http://localhost:4000/api/detectt/deleterepo/${repoId}`);
//       const updateRepo = repos.filter((repo) => repo.id !== repoId);
//       setRepos(updateRepo);
//     } catch (error) {
//       console.error("Error deleting repo:", error);
//     }
//   };

//   const handleExportExcel = () => {
//     if (selectedCredential) {
//       const formattedCredential = selectedCredential.split("\n");
//       const credentialData = formattedCredential.map((line) => [line]);
//       const wb = XLSX.utils.book_new();
//       const ws = XLSX.utils.aoa_to_sheet(credentialData);
//       XLSX.utils.book_append_sheet(wb, ws, "Credentials");
//       XLSX.writeFile(wb, "credentials.xlsx");
//     }
//   };

//   const handleValidClick = () => {
//     setValidButtonVisible(false);
//     setTimeout(() => {
//       handleExportExcel();
//     }, 3000); // Transisi selama 3 detik
//   };

//   const handleNotValidClick = () => {
//     setValidButtonVisible(false);
//     setNotValidButtonVisible(false);
//     handleCloseModal();
//   };

//   return (
//     <>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div ref={modalRef} className="bg-white rounded-lg overflow-hidden border border-gray-300 w-[600px] max-h-[80vh] overflow-y-auto">
//             <span className="absolute top-0 right-0 m-4 cursor-pointer" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <div className="p-4">
//               {selectedCredential && (
//                 <div className="bg-white text-black mx-auto">
//                   <h2 className="text-lg font-semibold bg-blue-500 text-white py-5 px-6 text-center rounded-t-lg">Detail Scanning</h2>
//                   <p className="p-4">{selectedCredential}</p>
//                   <div className="flex justify-center space-x-4">
//                     <button onClick={handleExportExcel} className={`bg-green-500 text-white px-3 py-1 rounded-md mr-2 transition-all duration-300 hover:bg-green-700 ${!validButtonVisible && "hidden"}`} id="exportExcelButton">
//                       Export to Excel
//                     </button>
//                     {/* <button onClick={handleCloseModal} className="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-200 hover:bg-blue-600" id="closeModalButton">
//                       Close
//                     </button> */}
//                     <button onClick={handleValidClick} className={`bg-green-500 text-white px-3 py-1 rounded-md mr-2 transition-all duration-300 hover:bg-green-700 ${!validButtonVisible ? "" : "hidden"}`}>
//                       Valid
//                     </button>
//                     <button onClick={handleNotValidClick} className={`bg-red-500 text-white px-3 py-1 rounded-md transition-all duration-300 hover:bg-red-700 ${!validButtonVisible ? "" : "hidden"}`}>
//                       Not Valid
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-[67px] h-screen bg-white">
//         <h1 className="text-xl text-white p-5 text-center">History Scanning Repo</h1>
//         <div className="overflow-auto rounded-lg md:block hidden ">
//           <table className="w-[500px] rounded-lg mx-auto bg-white ">
//             <thead className="bg-gray-200 shadow-lg border-b-2 border-gray-300 ">
//               <tr>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-20 ">NO</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center ">LINK GITHUB</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-left w-24 ">RESULT SCANNING</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-24 ">DATE</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-32">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {currentRepos.map((item, index) => (
//                 <tr key={index} className={index === 1 || index === 3 ? "bg-gray-200" : ""}>
//                   <td className="p-3 text-blue-500 whitespace-nowrap text-blue hover:underline text-sm">{index + indexOfFirstRepo + 1}</td>
//                   <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item.repo_url}</td>
//                   <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
//                     <button onClick={() => handleShowDetail(item.credential)} className="text-blue-500 text-xs font-medium duration-200 hover:scale-110  hover:text-blue-700">
//                       Detail scanning
//                     </button>
//                   </td>
//                   <td className="p-3 text-gray-700 whitespace-nowrap text-xs">{item.date}</td>
//                   <td className="p-3 text-xs text-gray-700 whitespace-nowrap">
//                     <button className="text-red-500 hover:text-red-700 font-bold duration-200  hover:scale-110" onClick={() => deleteRepo(item.id)}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="grid grid-cols-1 gap-10 md:hidden mx-auto">
//           {currentRepos.map((item, index) => (
//             <div key={index} className="bg-white space-y-3 p-5 rounded-lg shadow">
//               <div className="flex items-center justify-between px-2">
//                 <div className="text-blue-500 font-bold hover:underline">{`No ${index + 1}`}</div>
//                 <div className="text-gray-500 text-xs text-left">{item.date}</div>
//                 <div className="flex items-center text-gray-700">
//                   <button onClick={() => handleShowDetail(item.credential)} className="bg-blue-500  mr-2 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200  hover:scale-110">
//                     <BiSolidPencil />
//                   </button>
//                   <button onClick={() => deleteRepo(item.id)} className="bg-red-500  mr-2 hover:bg-red-600 text-white px-3 py-1 rounded-md duration-200  hover:scale-110">
//                     <FaTrashCan />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center mt-4 bg-white">
//           <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-2 hover:bg-gray-300 px-4 py-2 rounded-md bg-blue-500 duration-200  hover:scale-95 text-white">
//             Prev
//           </button>

//           {currentPage > 3 && (
//             <span className="mx-1" onClick={() => paginate(1)}>
//               1
//             </span>
//           )}

//           {currentPage > 4 && <span className="mx-1">...</span>}

//           {[...Array(Math.min(5, Math.ceil(repos.length / reposPerPage))).keys()].map((pageNumber) => (
//             <button
//               key={pageNumber}
//               onClick={() => paginate(pageNumber + 1)}
//               className={`mx-1 bg-blue-500 hover:bg-gray-300 px-4 py-2 rounded-md duration-200  hover:scale-95 ${currentPage === pageNumber + 1 ? "bg-blue-500 text-white" : ""}`}
//             >
//               {pageNumber + 1}
//             </button>
//           ))}

//           {currentPage < Math.ceil(repos.length / reposPerPage) - 3 && <span className="mx-1">...</span>}

//           {currentPage < Math.ceil(repos.length / reposPerPage) - 2 && (
//             <span className="mx-1" onClick={() => paginate(Math.ceil(repos.length / reposPerPage))}>
//               {Math.ceil(repos.length / reposPerPage)}
//             </span>
//           )}

//           <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRepo >= repos.length} className="ml-2 bg-blue-500 hover:bg-gray-300 px-4 py-2 rounded-md duration-200   hover:scale-95 text-white">
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
