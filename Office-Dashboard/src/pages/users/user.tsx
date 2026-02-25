import { useState } from "react";
import NavBar from "../../components/Navbar";
import { usePermissions, type Permission } from "../../hooks/userPermission";
import {
  PageContent,
  PageHeader,
  PageLayout,
} from "../../components/layout/PageLayout";
import { HiUsers } from "react-icons/hi";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import type { UserDetail, UserDetailResponse } from "../../type/user.type";
import Table from "../../components/table/Tables";
import EmptyMessage from "../../components/ui/EmptyMessage";
import Filters from "../../components/Filters";
import { useUser } from "../../hooks/useUser";
import { useUserForm } from "../../hooks/useUserForm";
import UserModel from "../../components/Model/UserModel";
import ConfirmationModal from "../../components/Model/ConfirmationPopUp";
import { Pagination } from "../../components/Pagination";


export default function UserPage() {
  const permissions = usePermissions<Permission>({});
  const {
    users,
    rounds,
    selectedRole,
    setSelectedRole,
    loading,
    error,
    createUser,
    updateUser,
    tablehead,
    roles,
    setUsers,
    deleteUser,

    currentPage,
    limit,
    totalPage,
    setCurrentPage,
    setLimit,
    setRole
  } = useUser()

  const [userMode, setUserMode] = useState<"create" | "edit" | null>(null);
  const [editUser, setEditUser] = useState<UserDetail | undefined>(undefined);
  const [popUpDelete, setPopUpDelete] = useState<boolean>(false)
  const { userDetail, setUserDetail, getChangedFields, closeFunction, handleChange  } = useUserForm(editUser);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (userMode === "create") await createUser(userDetail);
    else if (userMode === "edit" && editUser) await updateUser(editUser.id, getChangedFields());
    setUserMode(null);
    setEditUser(undefined);
    setUserDetail({
      id: "",
      username: "",
      fullname: "",
      email: "",
      role_id: "",
      password: "",
    })
  };

  
  const onClose = () => {
    setUserMode(null)
    closeFunction()
  }

  return (
    <PageLayout sidebar={<NavBar />}>
      <PageContent>
        <PageHeader
          title="All Users"
          icon={<HiUsers className="text-indigo-500" />}
          actions={
            permissions.canCreateUsers && (
              <Button
                varient="primary"
                onClick={() => setUserMode("create")}
              >
                Create User
              </Button>
            )
          }
        />

        {
          selectedRole && rounds &&
          <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <div className="p-4 sm:p-6">
            <Filters<UserDetailResponse>
              defaultVal={selectedRole}
              filters={rounds}
              label="Select Status"
              setSelectVal={setUsers}
              onSelectFilter={setSelectedRole}
              currentPage={currentPage}
              totalPage={totalPage}
              limit={limit}
              setStatus={setRole}
              setCurrentPage={setCurrentPage}
              setLimit={setLimit}
              allUrl="yes"
            />
          </div>
        </Card>
        }
        <Card className="p-4 sm:p-6">
          <div className="max-h-[500px] lg:max-h-[800px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">
                Error loading users: {error}
              </div>
            ) : users && users?.items.length > 0 ? (
              <Table
                tablehead={tablehead}
                tabledata={users.items}
                permissions={permissions}
                setModelType={setUserMode}
                setValue={setEditUser}
                tablefor="User"
                setOnDelete={setPopUpDelete}
              />
            ) : (
              <EmptyMessage
                message="No Users Yet"
                submessage="Create User to see here"
              />
            )}
          </div>
        </Card>

        {userMode && roles && (
            <UserModel
              mode={userMode}
              formData={userDetail}
              setFormData={setUserDetail}
              handleChange={handleChange}
              onClose={onClose}
              roles={roles}
              handleSubmit={handleSubmit}
            />
        )}

       { editUser &&  
       <ConfirmationModal 
          isOpen={popUpDelete} 
          title="Delete" 
          message={`Are you sure you wanna delete ${editUser.username}?`}
          onConfirm={() => {
            deleteUser(editUser.id)
            setPopUpDelete(false)
          }}
          onCancel={() => setPopUpDelete(false)}
        />}

        {
          users && users.items.length > 0 && 
            <Pagination
              currentPage={currentPage}
              limit={limit}
              totalPage={totalPage}
              setCurrentPage={setCurrentPage}
              setLimit={setLimit}
            />
        }
      </PageContent>
    </PageLayout>
  );
}