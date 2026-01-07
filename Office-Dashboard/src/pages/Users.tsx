import { useState } from "react";
import NavBar from "../components/Navbar";
import FilterComponent from "../components/Filters";

type UserRole = "Admin" | "SuperAdmin" | "Member";

type UserInfo = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  role: UserRole;
};

const INITIAL_USERS: UserInfo[] = [
  { id: 1, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 2, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Admin" },
  { id: 3, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "SuperAdmin" },
  { id: 4, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 5, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 6, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 7, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 8, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 9, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 10, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 11, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 12, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
  { id: 13, username: "johndoe1", fullname: "john doe", email: "johndoe@gmail.com", role: "Member" },
];

const statusStyles: Record<UserRole, string> = {
  Admin: "bg-green-100 text-green-700",
  SuperAdmin: "bg-blue-100 text-blue-700",
  Member: "bg-gray-200 text-gray-600",
};

export default function UserPage() {
  const filters = ["All", "Admin", "SuperAdmin", "Member"];
  const [filter, setFilter] = useState<"All" | UserRole>("All");
  const [users, setUsers] = useState<UserInfo[]>(INITIAL_USERS);
  const userRole: string = "SuperAdmin";

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers =
    filter === "All" ? users : users.filter((user) => user.role === filter);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Users</h1>
          {userRole === "SuperAdmin" && (
            <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
              Create User
            </button>
          )}
        </div>

        <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-6">
          <FilterComponent filters={filters} filter={filter} setFilter={setFilter} />
        </div>

        <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg mt-10 h-170 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Username</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Full Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Role</th>
                {userRole === "SuperAdmin" && (
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold">{user.username}</p>
                  </td>
                  <td className="px-6 py-4">{user.fullname}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${statusStyles[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  {userRole === "SuperAdmin" && (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white">
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white">
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
