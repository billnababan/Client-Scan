import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidDetail } from "react-icons/bi";
import axiosInstance from "../hooks/axios";

const ManageDataContent = () => {
  const [repos, setRepos] = useState([]);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [repoPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axiosInstance.get("/deteksi");
        console.log(response.data);
        setRepos(response.data.dataRepo);
      } catch (error) {
        console.error("Error fetching repository from database:", error);
      }
    };

    fetchRepo();
  }, []);

  const indexOfLastRepo = currentPage * repoPerPage;
  const indexOfFirstRepo = indexOfLastRepo - repoPerPage;
  const filteredRepo =
    repos && repos.length > 0
      ? repos.filter((repo) => {
          return repo.repo_url.toLowerCase().includes(searchTerm.toLowerCase()) || repo.credential.toLowerCase().includes(searchTerm.toLowerCase());
        })
      : [];
  const currentRepo = filteredRepo.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteRepo = async (repoId) => {
    try {
      await axiosInstance.delete(`/deteksi/${repoId}`);
      const updateRepo = repos.filter((repo) => repo.id !== repoId);
      setRepos(updateRepo);
    } catch (error) {
      console.error("Error deleting repo:", error);
    }
  };

  // const handleShowDetail = (credential) => {
  //   if (selectedCredential !== credential) {
  //     setSelectedCredential(credential);
  //   }
  //   setShowModal(true);
  // };

  return (
    <div className="  w-full  justify-center items-center ">
      <h1 className="text-xl text-black font-bold p-2 text-center mt-14 ">Manage Data Repository</h1>

      <div className="max-w-4xl w-full mx-auto">
        <div className="flex items-center mb-3">
          <p className="  mr-2 px-2 py-2 ml-2 text-black font-bold duration-200 hover:underline hover:text-blue-500">Search :</p>
          <input type="text" placeholder="Search" className="ml-1 px-1 py-1 hover:rounded-sm duration-200 transform hover:scale-95 border border-gray-300" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="overflow-auto md:block hidden ">
          <table className="w-full table-auto border-collapse border border-gray-300 rounded-t-lg">
            <thead className="bg-gray-200 shadow-lg border-b-2 border-gray-300 rounded-t-lg">
              <tr>
                <th className="px-2 py-3 text-sm font-semibold tracking-wide text-center w-20 ">No</th>
                <th className="px-2 py-3 text-sm font-semibold tracking-wide text-center ">Repo URL</th>
                <th className="px-2 py-3 text-sm font-semibold tracking-wide text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentRepo.map((repo, index) => (
                <tr key={repo} className={repo === 1 || repo === 3 ? "bg-gray-200" : ""}>
                  <td className="p-3 text-blue-500 text-center whitespace-nowrap text-blue hover:underline text-xs font-semibold">{index + indexOfFirstRepo + 1}</td>
                  <td className="px-2 py-4 font-semibold   whitespace-nowrap text-xs ">{repo.repo_url}</td>
                  <td className="px-2 py-4  text-xs text-center  whitespace-nowrap">
                    <button onClick={() => handleDeleteRepo(repo.id)} className="bg-red-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md font-semibold duration-200 transform hover:scale-110">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-10 md:hidden mx-auto">
          {currentRepo.map((repo, index) => (
            <div key={index} className="bg-white space-y-3 p-2 rounded-lg shadow">
              <div className="flex items-center space-x-2 text-sm">
                <div className="text-blue-500 text-center text-xs hover:underline w-20">{`No ${index + 1}`}</div>
                <div className="text-xs hover:underline font-semibold">{repo.repo_url}</div>
                <div className="p-3 text-xs text-center items-center text-gray-700 ">
                  <button onClick={() => handleDeleteRepo(repo.id)} className="bg-red-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200 transform hover:scale-110 items-center">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 mb-6">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-2 hover:bg-gray-300 px-4 py-2 rounded-md bg-blue-500 duration-200 transform hover:scale-95">
            Prev
          </button>
          {Array.from({ length: Math.min(5, Math.ceil(filteredRepo.length / repoPerPage)) }).map((_, pageNumber) => {
            const page = pageNumber + 1;
            return (
              <button key={page} onClick={() => paginate(page)} className={`mx-1 bg-blue-500 hover:bg-gray-300 px-4 py-2 rounded-md duration-200 transform hover:scale-95 ${currentPage === page && "bg-blue-500 text-white"}`}>
                {page}
              </button>
            );
          })}
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRepo >= repos.length} className="ml-2 bg-blue-500 hover:bg-gray-300 px-4 py-2 rounded-md duration-200 transform hover:scale-95">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageDataContent;
