import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidPencil } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";

import EditUsers from "./EditUsers"; // Import EditUsers component
import SidebarAdmin from "../../components/NewSidebar"; // Import SidebarAdmin component

const ManageUser = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null); // State to track editing user

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
    <div className="flex h-screen">
      {/* Sidebar section */}
      <SidebarAdmin isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main content section */}
      <div className="flex-1 p-4">
        {/* Toggle menu for mobile */}

        {/* Main content */}
        <div className="px-4 py-6 ">
          <h1 className="text-xl font-bold mb-3">Manage Users</h1>
          <div className="border-b border-gray-200 mb-6"></div>
          <div className="flex flex-col md:flex-row md:justify-between mb-6">
            <div className="flex items-center">
              <p className="text-sm font-medium mr-2">Search</p>
              <input type="text" placeholder="Search Users" className="w-full ml-2 px-4 py-2 rounded-lg border border-gray-300" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-center uppercase">No</th>
                  <th className="px-6 py-3 text-sm font-medium text-center uppercase">Full Name</th>
                  <th className="px-6 py-3 text-sm font-medium text-center uppercase">Email</th>
                  <th className="px-6 py-3 text-sm font-medium text-center uppercase">Role</th>
                  <th className="px-6 py-3 text-sm font-medium text-center uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className="text-center">
                    <td className="px-6 py-4">{indexOfFirstUser + index + 1}</td>
                    <td className="px-6 py-4">{user.fullname}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role_id}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleEditUser(user)} className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">
                        <BiSolidPencil />
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation" className="mt-3">
              <ul className="flex justify-center">
                <li>
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 mr-1 bg-gray-200 rounded">
                    Prev
                  </button>
                </li>
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => i + 1).map((number) => (
                  <li key={number}>
                    <button onClick={() => paginate(number)} className={`px-3 py-1 mx-1 bg-blue-500 text-white rounded ${currentPage === number && "bg-blue-700"}`}>
                      {number}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)} className="px-3 py-1 ml-1 bg-gray-200 rounded">
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {editingUser && <EditUsers user={editingUser} onClose={handleCloseEditUser} onUpdate={handleUpdateUser} />}
    </div>
  );
};

export default ManageUser;
