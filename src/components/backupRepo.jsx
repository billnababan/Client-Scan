// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { BiSolidPencil } from "react-icons/bi";
// import { FaTrashCan } from "react-icons/fa6";
// import { FcNext } from "react-icons/fc";
// import { FcPrevious } from "react-icons/fc";

// export default function Modal() {
//   const [showModal, setShowModal] = useState(false);
//   const [repos, setRepos] = useState([]);
//   const [selectedCredential, setSelectedCredential] = useState(null);
//   const [validButtonHidden, setValidButtonHidden] = useState(false);
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
//                   <h2 className="text-lg font-semibold bg-blue-500 text-white py-5 px-6 text-center rounded-t-lg  ">Detail Scanning</h2>
//                   <p className="text-[12px] text-justify">{selectedCredential}</p>
//                   <div className="flex justify-center space-x-4 mt-3">
//                     <button
//                       onClick={handleExportExcel}
//                       className="rounded-xl border-2 border-dashed border-green-700  px-6 py-3 font-semibold uppercase text-white bg-green-700 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none hidden"
//                       id="exportExcelButton"
//                     >
//                       Export to Excel
//                     </button>
//                     <button onClick={handleCloseModal} className="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-200 hover:bg-blue-600 hidden" id="closeModalButton">
//                       Close
//                     </button>
//                     <button
//                       onClick={() => {
//                         setTimeout(() => {
//                           document.getElementById("exportExcelButton").classList.remove("hidden");

//                           document.getElementById("or").classList.add("hidden");
//                           document.getElementById("validButton").classList.add("hidden");
//                           document.getElementById("notValidButton").classList.add("hidden");
//                         }, 3000); // Waktu penundaan dalam milidetik (5 detik)
//                       }}
//                       className="rounded-xl border-2 border-dashed border-green-600  px-6 py-3 font-semibold uppercase text-white bg-green-600 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
//                       id="validButton"
//                     >
//                       Valid
//                     </button>
//                     <p className="text-[30px] hover:text-gray-500" id="or">
//                       ||
//                     </p>
//                     <button
//                       onClick={handleCloseModal}
//                       className="rounded-2xl border-2 border-dashed border-red-700  px-6 py-3 font-semibold uppercase text-white bg-red-700  transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
//                       id="notValidButton"
//                     >
//                       Not Valid
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-[67px] h-screen ">
//         <h1 className="text-xl text-blue-700 hover:text-blue-800 font-bold p-8 text-left ml-[100px] mx-auto">Detail Scanning Repository</h1>
//         <div className="overflow-auto rounded-lg md:block hidden ">
//           <table className="w-[1000px] rounded-lg mx-auto bg-white ">
//             <thead className="bg-gray-400 shadow-lg border-b-2 border-gray-300 ">
//               <tr>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center ">NO</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center ">LINK GITHUB</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-24  ">RESULT SCANNING</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-24 ">DATE</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-24">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {currentRepos.map((item, index) => (
//                 <tr key={index} className={index === 1 || index === 3 ? "bg-gray-400" : ""}>
//                   <td className="p-3 text-blue-700 whitespace-nowrap text-blue hover:underline text-sm px-5 py-2">{index + indexOfFirstRepo + 1}</td>
//                   <td className="p-3 text-sm  whitespace-nowrap px-5 py-2">{item.repo_url}</td>
//                   <td className="p-3 text-sm  whitespace-nowrap px-5 py-2 ">
//                     <button onClick={() => handleShowDetail(item.credential)} className="text-blue-700 text-xs font-medium duration-200 scale-110  hover:text-blue-800 px-5 py-2 ">
//                       Detail scanning
//                     </button>
//                   </td>
//                   <td className="p-3  whitespace-nowrap text-xs px-5 py-2">{item.date}</td>
//                   <td className="p-3 text-xs text-gray-700 whitespace-nowrap px-5 py-2">
//                     <button className="text-red-700 hover:text-red-800 font-bold duration-200  scale-110" onClick={() => deleteRepo(item.id)}>
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

//         <div className="flex justify-center mt-4 bg-white ">
//           <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-4  px-4 py-2 rounded-full bg-gray-300 duration-200  hover:scale-95 text-white">
//             <FcPrevious />
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
//               className={`mx-1 bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-full duration-200   ${currentPage === pageNumber + 1 ? "bg-blue-500 text-white rounded-full" : ""}`}
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

//           <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRepo >= repos.length} className="ml-4 bg-gray-300  px-4 py-2 rounded-full duration-200   hover:scale-95 text-white">
//             <FcNext />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// import { BiSolidPencil } from "react-icons/bi";
// import { FaTrashCan } from "react-icons/fa6";

// export default function Modal() {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCredential, setSelectedCredential] = useState(null);
//   const [repos, setRepos] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [reposPerPage] = useState(5);
//   const [data, setData] = useState();
//   console.log(data);

//   const indexOfLastRepo = currentPage * reposPerPage;
//   const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
//   const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

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

//   // useEffect untuk handle data
//   useEffect(() => {
//     const fetchRepoByUserId = async () => {
//       try {
//         const userDataString = localStorage.getItem("user");
//         const userData = JSON.parse(userDataString);

//         if (!userData) {
//           console.log("Tidak ada data pengguna yang tersimpan di localStorage atau data pengguna kosong.");
//           return;
//         }

//         const response = await axios.get(`http://localhost:4000/api/detectt/repoUser/${userData.id}`);
//         const credentials = response.data.credentials;

//         // Menyimpan data dalam array dan setiap item dalam objek dengan mempertahankan id yang sesuai
//         const allData = credentials.map((item) => {
//           const data = {
//             id: item.id,
//             branch: getPropertyValue(item.credential, "branch"),
//             commit: getPropertyValue(item.credential, "commit"),
//             commitHash: getPropertyValue(item.credential, "commitHash"),
//             date: getPropertyValue(item.credential, "date"),
//             diff: getPropertyValue(item.credential, "diff"),
//             path: getPropertyValue(item.credential, "path"),
//             printDiff: getPropertyValue(item.credential, "printDiff"),
//             reason: getPropertyValue(item.credential, "reason"),
//             stringsFound: getPropertyValue(item.credential, "stringsFound"),
//           };
//           return data;
//         });

//         console.log(allData);
//         setData(allData);
//       } catch (error) {
//         console.error("Error fetching repo:", error);
//       }
//     };

//     fetchRepoByUserId();
//   }, []);

//   // Fungsi untuk mendapatkan nilai properti tertentu dari string JSON
//   function getPropertyValue(dataString, property) {
//     const regex = new RegExp(`"${property}"\\s*:\\s*"([^"]+)"`, "g");
//     const match = regex.exec(dataString);
//     return match ? match[1] : null;
//   }

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleShowDetail = (credential) => {
//     if (selectedCredential !== credential) {
//       setSelectedCredential(credential);
//     }
//     setShowModal(true);
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
//                   <h2 className="text-lg font-semibold bg-blue-500 text-white py-5 px-6 text-center rounded-t-lg  ">Detail Scanning</h2>
//                   <table className="w-full table-auto">
//                     <thead>
//                       <tr>
//                         <th className="border px-4 py-2">Key</th>
//                         <th className="border px-4 py-2">Value</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {/* Menampilkan branch, commit, dan reason */}
//                       <tr>
//                         <td className="border px-4 py-2">Branch</td>
//                         <td className="border px-4 py-2">{data.branch}</td>
//                       </tr>
//                       {/* <tr>
//                         <td className="border px-4 py-2">Commit</td>
//                         <td className="border px-4 py-2">{selectedCredential.commit}</td>
//                       </tr>
//                       <tr>
//                         <td className="border px-4 py-2">Reason</td>
//                         <td className="border px-4 py-2">{selectedCredential.reason}</td>
//                       </tr> */}
//                     </tbody>
//                   </table>
//                   <div className="flex justify-center mt-3">
//                     <button onClick={handleCloseModal} className="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-200 hover:bg-blue-600">
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-[67px] h-screen ">
//         <h1 className="text-xl text-blue-700 hover:text-blue-800 font-bold p-8 text-left ml-[100px] mx-auto">Detail Scanning Repository</h1>
//         <div className="overflow-auto rounded-lg md:block hidden ">
//           <table className="w-[1000px] rounded-lg mx-auto bg-white ">
//             <thead className="bg-gray-400 shadow-lg border-b-2 border-gray-300 ">
//               <tr>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center ">NO</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center ">LINK GITHUB</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-24  ">RESULT SCANNING</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-24 ">DATE</th>
//                 <th className="p-2 text-sm font-semibold tracking-wide text-center w-24">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {currentRepos.map((item, index) => (
//                 <tr key={index} className={index === 1 || index === 3 ? "bg-gray-400" : ""}>
//                   <td className="p-3 text-blue-700 whitespace-nowrap text-blue hover:underline text-sm px-5 py-2">{index + indexOfFirstRepo + 1}</td>
//                   <td className="p-3 text-sm  whitespace-nowrap px-5 py-2">{item.repo_url}</td>
//                   <td className="p-3 text-sm  whitespace-nowrap px-5 py-2 ">
//                     <button onClick={() => handleShowDetail(item.credential)} className="text-blue-700 text-xs font-medium duration-200 scale-110  hover:text-blue-800 px-5 py-2 ">
//                       Detail scanning
//                     </button>
//                   </td>
//                   <td className="p-3  whitespace-nowrap text-xs px-5 py-2">{item.date}</td>
//                   <td className="p-3 text-xs text-gray-700 whitespace-nowrap px-5 py-2">
//                     <button className="text-red-700 hover:text-red-800 font-bold duration-200  scale-110" onClick={() => deleteRepo(item.id)}>
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
//       </div>
//     </>
//   );
// }



// ----------------------
       {/* <table>
                    <thead>
                      <th>Branch</th>
                      <th>Commit</th>
                      <th>Commit Hash</th>
                      <th>Date</th>
                      <th>Diff</th>
                      <th>Path</th>
                      <th>Print Diff</th>
                      <th>Reason</th>
                    </thead>
                  </table>
                  <tr className="bg-gray-400 flex flex-col">
                    <td className="p-3 text-sm  whitespace-nowrap px-5 py-2">{dataModal.branch}</td>
                    <td className="p-3  whitespace-nowrap text-xs px-5 py-2">{dataModal.commit}</td>
                    <td className="p-3  whitespace-nowrap text-xs px-5 py-2">{dataModal.commitHash}</td>
                    <td className="p-3  whitespace-nowrap text-xs px-5 py-2">{dataModal.date}</td>
                    <td className="p-3  text-xs py-2 w-52">{dataModal.diff}</td>
                    <td className="p-3  whitespace-nowrap text-xs px-5 py-2">{dataModal.path}</td>
                    <td className="p-3  whitespace-nowrap text-xs px-5 py-2">{dataModal.printDiff}</td>
                    <td className="p-3  whitespace-nowrap text-xs px-5 py-2">{dataModal.reason}</td>
                  </tr> */}