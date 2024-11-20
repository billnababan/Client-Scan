import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [repos, setRepos] = useState([]);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [exportRowIndex, setExportRowIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5);
  const [detailData, setDetailData] = useState(null); // State untuk menyimpan detail data
  const [dataModal, setDataModal] = useState(null);

  useEffect(() => {
    const fetchRepoByUserId = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        const userData = JSON.parse(userDataString);

        if (!userData) {
          console.log("Tidak ada data pengguna yang tersimpan di localStorage atau data pengguna kosong.");
          return;
        }

        const response = await axios.get(`http://localhost:4000/api/detectt/repoUser/${userData.id}`);
        const credentials = response.data.credentials;

        // Function untuk membersihkan string diff dan menghilangkan duplikat
        function getPropertyValue(dataString, property) {
          const regex = new RegExp(`"${property}"\\s*:\\s*"([^"]+)"`, "g");
          const values = new Set();
          let match;

          while ((match = regex.exec(dataString)) !== null) {
            values.add(match[1]);
          }

          return Array.from(values);
        }

        const allData = credentials.map((item) => ({
          id: item.id,
          github: item.repo_url,
          datetime: item.date,
          branch: getPropertyValue(item.credential, "branch"),
          commit: getPropertyValue(item.credential, "commit"),
          commitHash: getPropertyValue(item.credential, "commitHash"),
          date: getPropertyValue(item.credential, "date"),
          diff: getPropertyValue(item.credential, "diff"),
          path: getPropertyValue(item.credential, "path"),
          printDiff: getPropertyValue(item.credential, "printDiff"),
          reason: getPropertyValue(item.credential, "reason"),
        }));

        console.log("test test");
        setRepos(allData);
        console.log(allData);
      } catch (error) {
        console.error("Error fetching repo:", error);
      }
    };

    fetchRepoByUserId();
  }, []);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  console.log(currentRepos);

  const paginate = (pageNumber) => {
    const firstRepoOnPage = (pageNumber - 1) * reposPerPage + 1;
    setCurrentPage(pageNumber);
    setSelectedCredential(null); // Reset selectedCredential saat berpindah halaman
  };

  const handleShowDetail = (id) => {
    // Cari data yang sesuai dengan ID
    const dataToShow = repos.find((item) => item.id === id);

    if (dataToShow) {
      console.log("Data yang ingin ditampilkan:", dataToShow);
      setDataModal(dataToShow);
      setShowModal(true);
      // Atau lakukan hal lain sesuai kebutuhan Anda, misalnya menampilkan modal dengan data tersebut
    } else {
      console.log("Tidak ada data dengan ID yang sesuai.");
      // Atau lakukan penanganan lain sesuai kebutuhan Anda, misalnya menampilkan pesan kesalahan
    }
  };

  const deleteRepo = async (repoId) => {
    try {
      await axios.delete(`http://localhost:4000/api/detectt/deleterepo/${repoId}`);
      const updateRepo = repos.filter((repo) => repo.id !== repoId);
      setRepos(updateRepo);
    } catch (error) {
      console.error("Error deleting repo:", error);
    }
  };
  const handleExportExcel = (index) => {
    const rowData = [
      ["No", "Date", "Diff", "Path", "Print Diff", "Reason"],
      [index + 1, dataModal.date[index], dataModal.diff[index], dataModal.path[index], dataModal.printDiff[index], dataModal.reason[index]],
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rowData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, `data-row-${index + 1}.xlsx`);
  };

  // Fungsi untuk mendapatkan nilai properti tertentu dari string JSON

  return (
    <>
      {showModal && dataModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={modalRef} className="bg-white rounded-lg overflow-hidden border border-gray-300 w-[1200px] max-h-[80vh] overflow-y-auto">
            <span className="absolute top-0 right-0 m-4 cursor-pointer" onClick={handleCloseModal}>
              &times;
            </span>
            <div className="p-4 ">
              <h2 className="text-lg font-semibold bg-white text-black py-3 px-4 text-center rounded-t-lg">Detail Scanning</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse" id="modalTable">
                  <thead className=" shadow-lg border-t-2 border-l-2 border-r-2 border-white sticky top-0 bg-blue-500 text-white w-auto ">
                    <tr>
                      <th className="p-3 text-sm font-bold tracking-wide whitespace-nowrap ">No</th>
                      <th className="p-3 text-sm font-bold tracking-wide whitespace-nowrap ">Date</th>
                      <th className="p-3 text-sm font-bold tracking-wide whitespace-nowrap ">Diff</th>
                      <th className="p-3 text-sm font-bold tracking-wide whitespace-nowrap ">Path</th>
                      <th className="p-3 text-sm font-bold tracking-wide whitespace-nowrap ">Print Diff</th>
                      <th className="p-3 text-sm font-bold tracking-wide whitespace-nowrap ">Reason</th>
                      <th className="p-3 text-sm font-bold tracking-wide whitespace-nowrap ">Validation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dataModal.branch.map((branch, index) => (
                      <tr key={index} className="hover:bg-gray-200 transition-colors duration-200">
                        <td className="p-3 text-xs py-2 font-bold border-r-[2px] border-blue-500 border-b-[2px]">{index + 1}</td>

                        <td className="p-3 text-xs py-2 border-r-[2px] border-blue-500 border-b-[2px]">{dataModal.date[index]}</td>
                        <td className="p-3 text-xs py-2 border-r-[2px] border-blue-500 border-b-[2px] table-cell-diff">{dataModal.diff[index]}</td>
                        <td className="p-3 text-xs py-2 border-r-[2px] border-blue-500 border-b-[2px] ">{dataModal.path[index]}</td>
                        <td className="p-3 text-xs py-2 border-r-[2px] border-blue-500 border-b-[2px] table-cell-print">{dataModal.printDiff[index]}</td>
                        <td className="p-3 text-xs py-2 border-r-[2px] border-blue-500 border-b-[2px]">{dataModal.reason[index]}</td>
                        <td className="p-3 text-xs py-2 border-r-[2px] border-blue-500 border-b-[2px]">
                          <div className="flex space-x-2 gap-3">
                            <button
                              onClick={() => {
                                setExportRowIndex(index);
                                document.getElementById(`exportExcelButton-${index}`).classList.remove("hidden");
                                document.getElementById(`validButton-${index}`).classList.add("hidden");
                                document.getElementById(`notValidButton-${index}`).classList.add("hidden");
                              }}
                              className="rounded-xl border-2 border-dashed border-green-600 px-4 py-3 font-semibold uppercase text-white bg-green-600 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] text-[8px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                              id={`validButton-${index}`}
                            >
                              Valid
                            </button>

                            <button
                              onClick={() => {
                                document.getElementById(`exportExcelButton-${index}`).classList.add("hidden");
                                document.getElementById(`validButton-${index}`).classList.add("hidden");
                                document.getElementById(`or-${index}`).classList.add("hidden");
                              }}
                              className="rounded-2xl border-2 border-dashed border-red-700 px-4 whitespace-nowrap py-3 font-semibold uppercase text-white bg-red-700 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] text-[8px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                              id={`notValidButton-${index}`}
                            >
                              Not Valid
                            </button>
                          </div>

                          <button
                            onClick={() => handleExportExcel(index)}
                            className="rounded-xl border-2 border-dashed border-green-700 px-6 py-3 font-semibold uppercase text-white bg-green-700 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] text-[8px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none hidden"
                            id={`exportExcelButton-${index}`}
                          >
                            Export to Excel
                          </button>
                          <button onClick={handleCloseModal} className="bg-blue-500 text-white px-3 py-1 rounded-md transition-all duration-200 hover:bg-blue-600 hidden" id="closeModalButton">
                            Close
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-[67px] h-screen ">
        <div></div>
        <h1 className="text-xl text-blue-700 hover:text-blue-800 font-bold p-8 text-center px-4 mx-auto ">Detail Scanning Repository</h1>
        <div className="overflow-auto rounded-lg md:block hidden ">
          <table className="w-[1000px] rounded-lg mx-auto bg-white ">
            <thead className="bg-gray-400 shadow-lg border-b-2 border-gray-300 ">
              <tr>
                <th className="p-2 text-sm font-semibold tracking-wide text-center ">NO</th>
                <th className="p-2 text-sm font-semibold tracking-wide text-center ">LINK GITHUB</th>
                <th className="p-2 text-sm font-semibold tracking-wide text-center w-24  ">RESULT SCANNING</th>
                <th className="p-2 text-sm font-semibold tracking-wide text-center w-24 ">DATE</th>

                <th className="p-2 text-sm font-semibold tracking-wide text-center w-24">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentRepos.map((item, index) => (
                <tr key={index} className={index === 1 || index === 3 ? "bg-gray-400" : ""}>
                  <td className="border-[1px]  px-3 py-3 font-semibold uppercase text-black text-center  transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] text-[12px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                    {index + indexOfFirstRepo + 1}
                  </td>
                  <td className="  px-3 py-3 font-semibold  text-black text-center  transition-all duration-300     text-[12px]  ">{item.github}</td>
                  <td className="p-3 text-sm  whitespace-nowrap px-5 py-2 ">
                    <button
                      onClick={() => handleShowDetail(item.id)}
                      className="rounded-xl border-2 border-dashed border-blue-700 px-3 py-3 font-semibold uppercase text-white bg-blue-700 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_red] text-[10px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none "
                    >
                      Detail scanning
                    </button>
                  </td>
                  <td className="  px-3 py-3 font-semibold uppercase text-black text-center  transition-all  text-[10px] ">{item.datetime}</td>

                  <td className="p-3 text-xs text-gray-700 whitespace-nowrap px-5 py-2">
                    <button
                      className="rounded-xl border-2 border-dashed border-red-700 px-3 py-3 font-semibold uppercase text-white bg-red-700 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_blue] text-[10px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                      onClick={() => deleteRepo(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-10 md:hidden mx-auto">
          {currentRepos.map((item, index) => (
            <div key={index} className="bg-white space-y-3 p-5 rounded-lg shadow">
              <div className="flex items-center justify-between px-2">
                <div className="text-blue-500 font-bold hover:underline">{`No ${index + 1}`}</div>
                <div className="text-gray-500 text-xs text-left">{item.datetime}</div>
                <div className="flex items-center text-gray-700">
                  <button onClick={() => handleShowDetail(item.id)} className="bg-blue-500  mr-2 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200  hover:scale-110">
                    <BiSolidPencil />
                  </button>
                  <button onClick={() => deleteRepo(item.id)} className="bg-red-500  mr-2 hover:bg-red-600 text-white px-3 py-1 rounded-md duration-200  hover:scale-110">
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 bg-white ">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-4  px-4 py-2 rounded-full bg-gray-300 duration-200  hover:scale-95 text-white">
            <FcPrevious />
          </button>

          {[...Array(Math.min(5, Math.ceil(repos.length / reposPerPage))).keys()].map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber + 1)}
              className={`mx-1 bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-full duration-200   ${currentPage === pageNumber + 1 ? "bg-blue-500 text-white rounded-full" : ""}`}
            >
              {pageNumber + 1}
            </button>
          ))}

          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRepo >= repos.length} className="ml-4 bg-gray-300  px-4 py-2 rounded-full duration-200   hover:scale-95 text-white">
            <FcNext />
          </button>
        </div>
      </div>
    </>
  );
}
