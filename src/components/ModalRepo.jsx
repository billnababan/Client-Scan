import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { FcNext, FcPrevious } from "react-icons/fc";

export default function Modal() {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5);
  const [dataDetail, setDataDetail] = useState(null);

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

        function getPropertyValue(dataString, property) {
          const regex = new RegExp(`"${property}"\\s*:\\s*"([^"]+)"`, "g");
          const values = [];
          let match;

          while ((match = regex.exec(dataString)) !== null) {
            values.push(match[1]);
          }

          return values;
        }

        const allData = credentials.map((item) => {
          const data = {
            id: item.id,
            github: item.repo_url,
            datetime: item.date,
            branch: getPropertyValue(item.credential, "branch"),
            commitHash: getPropertyValue(item.credential, "commitHash"),
            date: getPropertyValue(item.credential, "date"),
            diff: getPropertyValue(item.credential, "diff"),
            path: getPropertyValue(item.credential, "path"),
            reason: getPropertyValue(item.credential, "reason"),
          };
          return data;
        });

        setRepos(allData);
      } catch (error) {
        console.error("Error fetching repo:", error);
      }
    };

    fetchRepoByUserId();
  }, []);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  //   const handleShowDetail = (id) => {
  //     // Cari data yang sesuai dengan ID
  //     const dataToShow = repos.find((item) => item.id === id);

  //     if (dataToShow) {
  //       console.log("Data yang ingin ditampilkan:", dataToShow);
  //       setDataDetail(dataToShow);
  //     } else {
  //       console.log("Tidak ada data dengan ID yang sesuai.");
  //       // Atau lakukan penanganan lain sesuai kebutuhan Anda, misalnya menampilkan pesan kesalahan
  //     }
  //   };

  return (
    <div className="mt-[67px] h-screen ">
      <h1 className="text-xl text-blue-700 hover:text-blue-800 font-bold p-8 text-center px-4 mx-auto">Detail Scanning Repository</h1>
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
                <td className="  px-3 py-3 font-semibold  text-black text-center  transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px]  hover:shadow-[4px_4px_0px_black] text-[12px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                  {item.github}
                </td>
                <td className="p-3 text-sm  whitespace-nowrap px-5 py-2 ">
                  <Link
                    to={`/detailscan/${item.id}`}
                    className="rounded-xl border-2 border-dashed border-blue-700 px-3 py-3 font-semibold uppercase text-white bg-blue-700 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_red] text-[10px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none "
                  >
                    Detail Scanning
                  </Link>
                </td>
                <td className="  px-3 py-3 font-semibold uppercase text-black text-center  transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] text-[10px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                  {item.datetime}
                </td>
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
                <Link to={`/detailscan/${item.id}`} className="bg-blue-500  mr-2 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200  hover:scale-110">
                  <BiSolidPencil />
                </Link>
                <button onClick={() => deleteRepo(item.id)} className="bg-red-500  mr-2 hover:bg-red-600 text-white px-3 py-1 rounded-md duration-200  hover:scale-110">
                  <FaTrashCan />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-700">{item.github}</div>
            <div className="text-sm font-medium text-black text-center">
              <Link to={`/detailscan/${item.id}`} className="text-blue-500  hover:underline">
                Detail scanning
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={() => paginate(currentPage - 1)} className="mx-1 px-3 py-1 border rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 duration-200">
          <FcPrevious />
        </button>
        <button onClick={() => paginate(currentPage + 1)} className="mx-1 px-3 py-1 border rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 duration-200">
          <FcNext />
        </button>
      </div>
    </div>
  );
}
