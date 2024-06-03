import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";

import EditUsers from "./EditUsers";
import SidebarAdmin from "../../components/NewSidebar";

const ManageUserProfile = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth/getAll");
        setUsers(response.data.roles);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter((user) => {
    return user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/deleteUsers/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCloseEditUser = () => {
    setEditingUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center loginBg">
      <h1 className="text-xl text-white p-2 text-center">Manage Data Repository</h1>

      <div className="max-w-4xl w-full mx-auto">
        <div className="flex items-center mb-3">
          <p className="font-medium mr-2 px-2 py-2 ml-2 text-white duration-200 hover:underline hover:text-blue-500">Search :</p>
          <input type="text" placeholder="Search" className="ml-1 px-1 py-1 hover:rounded-sm duration-200 transform hover:scale-95 border border-gray-300" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="overflow-auto md:block hidden ">
          <table className="w-full table-auto border-collapse border border-gray-300 rounded-t-lg">
            <thead className="bg-gray-200 shadow-lg border-b-2 border-gray-300 rounded-t-lg">
              <tr>
                <th className="px-2 py-3 text-sm font-semibold tracking-wide text-center w-20">No</th>
                <th className="px-2 py-3 text-sm font-semibold tracking-wide text-left">User E-mail</th>
                <th className="px-2 py-3 text-sm font-semibold tracking-wide text-left">Edit Profile</th>
                <th className="px-2 py-3 text-sm font-semibold tracking-wide text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentUsers.map((user, index) => (
                <tr key={user.id} className={index === 1 || index === 3 ? "bg-gray-200" : ""}>
                  <td className="p-3 text-blue-500 text-center whitespace-nowrap text-blue hover:underline text-xs">{index + indexOfFirstUser + 1}</td>
                  <td className="px-2 py-4 whitespace-nowrap text-xs ">{user.email}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleEditUser(user)} className=" bg-blue-500  mr-2 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200 transform hover:scale-110">
                      <BiSolidPencil />
                    </button>
                  </td>
                  <td className="px-2 py-4 text-xs text-center whitespace-nowrap">
                    <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200 transform hover:scale-110">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-10 md:hidden mx-auto">
          {currentUsers.map((user, index) => (
            <div key={index} className="bg-white space-y-3 p-3 rounded-lg shadow">
              <div className="flex items-center justify-between px-2">
                <div className="text-blue-500 text-center text-xs hover:underline w-1/4">{`No ${index + 1}`}</div>
                <div className="text-xs hover:underline text-center w-1/2">{user.email}</div>
                <div className="flex items-center text-gray-700">
                  <button onClick={() => handleEditUser(user)} className="bg-blue-500 mr-2 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200 transform hover:scale-110">
                    <BiSolidPencil />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md duration-200 transform hover:scale-110 items-center">
                    <FaTrashCan />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mr-2 hover:bg-gray-300 px-4 py-2 rounded-md bg-blue-500 duration-200 transform hover:scale-95">
            Prev
          </button>
          {Array.from({ length: Math.min(5, Math.ceil(filteredUsers.length / usersPerPage)) }).map((_, pageNumber) => {
            const page = pageNumber + 1;
            return (
              <button key={page} onClick={() => paginate(page)} className={`mx-1 bg-blue-500 hover:bg-gray-300 px-4 py-2 rounded-md duration-200 transform hover:scale-95 ${currentPage === page && "bg-blue-500 text-white"}`}>
                {page}
              </button>
            );
          })}
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastUser >= users.length} className="ml-2 bg-blue-500 hover:bg-gray-300 px-4 py-2 rounded-md duration-200 transform hover:scale-95">
            Next
          </button>
        </div>
      </div>
      {editingUser && <EditUsers user={editingUser} onClose={handleCloseEditUser} onUpdate={handleUpdateUser} />}
    </div>
  );
};

export default ManageUserProfile;
