import { useState } from "react";

import { USER_DUMMY_DATA } from "./user.data";
import type { UserDetail } from "./user.type";
import NavBar from "../../components/Navbar";
import FilterComponent from "../../components/Filters";
import Table from "../../components/Tables";
import { usePermissions } from "../../hooks/userPermission";

type UserRole = "Admin" | "SuperAdmin" | "Member";


const tablehead : string[] = ["username", "fullname", "email", "role"]
export default function UserPage() {
  const permissions = usePermissions('user')
  const filters = ["All", "Admin", "SuperAdmin", "Member"];
  const [filter, setFilter] = useState<"All" | UserRole>("All");
  const [users, setUsers] = useState<UserDetail[]>(USER_DUMMY_DATA);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Users</h1>
          {
            permissions.canCreate && (
              <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
              Create User
            </button>
            )
          }
        </div>

        <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-6">
          <FilterComponent filters={filters} filter={filter} setFilter={setFilter} />
        </div>

        <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg mt-10 h-170 overflow-y-auto">
          <Table tablehead={tablehead} tabledata={users} resource="user"/>   
        </div>
      </main>
    </div>
  );
}
