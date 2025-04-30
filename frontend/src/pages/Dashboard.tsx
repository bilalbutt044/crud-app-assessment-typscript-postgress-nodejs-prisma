import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { formatDate } from "../utils/formateDate";
import Modal from "../components/Modal";
import EditUserModal from "../components/EditUserModal";
import axiosInstance from "../api/axios";
import axios from "axios";

export interface AllUsers {
  users: User[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

const Dashboard = () => {
  const { storedValue } = useLocalStorage("token", "");
  const navigate = useNavigate();

  const [paginationData, setPaginationData] = useState({
    users: [],
    totalPages: 1,
    currentPage: 1,
    loading: true,
  });

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [apiError, setApiError] = useState("");

  const fetchUsers = async (page: number) => {
    try {
      const response = await axiosInstance.get(`/users?page=${page}&limit=10`);
      const { users, totalPages } = response.data;

      setPaginationData((prevData) => ({
        ...prevData,
        users,
        totalPages,
        currentPage: page,
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      setPaginationData((prevData) => ({
        ...prevData,
        loading: false,
      }));
    }
  };

  // Handlers for pagination
  const handleNextPage = () => {
    if (paginationData.currentPage < paginationData.totalPages) {
      setPaginationData((prevData) => ({
        ...prevData,
        currentPage: prevData.currentPage + 1,
        loading: true,
      }));
    }
  };

  const handlePrevPage = () => {
    if (paginationData.currentPage > 1) {
      setPaginationData((prevData) => ({
        ...prevData,
        currentPage: prevData.currentPage - 1,
        loading: true,
      }));
    }
  };

  const handleDeleteUser = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers(paginationData.currentPage);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEditSubmit = async (updatedUser: Omit<User, "createdAt" | "id">) => {
    if (!editUser) return;

    try {
      await axiosInstance.put(`/users/${editUser.id}`, {
        name: updatedUser.name,
        email: updatedUser.email,
      });

      fetchUsers(paginationData.currentPage);
      setShowModal(false);
      setEditUser(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Update failed:", error);
        setApiError(error.response.data?.message || "An error occurred");
      } else {
        console.error("Unexpected error:", error);
        setApiError("An unexpected error occurred");
      }
    }
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setShowModal(false);
    setApiError("");
  };

  // Fetch users when the page changes
  useEffect(() => {
    if (!storedValue) {
      navigate("/");
    } else {
      fetchUsers(paginationData.currentPage);
    }
  }, [paginationData.currentPage]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <div className="relative">
        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody className={paginationData.loading ? "opacity-50 pointer-events-none" : ""}>
            {paginationData.users.map((user: User) => (
              <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{formatDate(user.createdAt)}</td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => {
                      setEditUser(user);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Loader Overlay */}
        {paginationData.loading && (
          <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevPage}
          disabled={paginationData.currentPage === 1 || paginationData.loading}
          className={`p-2 rounded ${
            paginationData.currentPage === 1 || paginationData.loading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <span>
          Page {paginationData.currentPage} of {paginationData.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={paginationData.currentPage === paginationData.totalPages || paginationData.loading}
          className={`p-2 rounded ${
            paginationData.currentPage === paginationData.totalPages || paginationData.loading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>

      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <EditUserModal onSubmit={handleEditSubmit} editUser={editUser} onClose={handleCloseModal} apiError={apiError} />
      </Modal>
    </div>
  );
};

export default Dashboard;
