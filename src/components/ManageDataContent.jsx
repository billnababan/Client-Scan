import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";

const ManageDataContent = () => {
  const [repo, setRepo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [repoPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/detect/getAllRepo");
        setRepo(response.data.result);
      } catch (error) {
        console.error("Error fetching repository from database:", error);
      }
    };

    fetchRepo();
  }, []);

  const indexOfLastRepo = currentPage * repoPerPage;
  const indexOfFirstRepo = indexOfLastRepo - repoPerPage;
  const filteredRepo = repo.filter((repo) => {
    return repo.repo_url.toLowerCase().includes(searchTerm.toLowerCase()) || repo.credential.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const currentRepo = filteredRepo.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteRepo = async (repoId) => {
    try {
      await axios.delete(`http://localhost:4000/api/detect/deleteRepo/${repoId}`);
      const updateRepo = repo.filter((repo) => repo.id !== repoId);
      setRepo(updateRepo);
    } catch (error) {
      console.error("Error deleting repo:", error);
    }
  };

  return (
    <div className="flex-1 p-4 w-full">
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold mb-3">Manage Data Repository</h1>
        <div className="border-b border-gray-200 mb-6"></div>
        <div className="flex flex-col md:flex-row md:justify-between mb-6">
          <div className="flex items-center mb-3 md:mb-0 md:w-1/3">
            <p className="text-sm font-medium mr-2">Search</p>
            <input type="text" placeholder="Search" className=" ml-2 px-4 py-2 rounded-lg border border-gray-300" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="max-w-4xl w-full">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-center uppercase border">No</th>
                  <th className="px-6 py-3 text-sm font-medium text-center uppercase border">Detail Credential</th>
                  <th className="px-6 py-3 text-sm font-medium text-center uppercase border">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentRepo.map((repo, index) => (
                  <tr key={repo.id} className="text-center">
                    <td className="px-6 py-4 border">{(currentPage - 1) * repoPerPage + index + 1}</td>
                    <td className="px-6 py-4 border">{repo.credential}</td>
                    <td className="px-4 py-2 border">
                      <button onClick={() => handleDeleteRepo(repo.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation" className="mt-3 ml-28">
              <ul className="flex justify-center">
                <li>
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 mr-1 bg-gray-200 rounded">
                    Prev
                  </button>
                </li>
                {Array.from({ length: Math.ceil(filteredRepo.length / repoPerPage) }, (_, i) => i + 1).map((number) => (
                  <li key={number}>
                    <button onClick={() => paginate(number)} className={`px-3 py-1 mx-1 bg-blue-500 text-white rounded ${currentPage === number && "bg-blue-700"}`}>
                      {number}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredRepo.length / repoPerPage)} className="px-3 py-1 ml-1 bg-gray-200 rounded">
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDataContent;
