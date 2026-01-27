import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import FilterComponent from "../../components/Filters";
import { usePermissions } from "../../hooks/userPermission";
import {
  PageContent,
  PageHeader,
  PageLayout,
} from "../../components/layout/PageLayout";
import { HiUsers } from "react-icons/hi";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import useFetch from "../../hooks/useFetch";
import {
  CREATE_USER,
  RETRIEVE_USERS,
  UPDATE_USER,
} from "../../constants/urls";
import extractHeaders from "../../utils/extractHeader";
import CreateModel from "../../components/Model/CreateModel";
import useCreateResource from "../../hooks/useSubmit";
import { userField } from "../../constants/fields";
import type { AddUser, RoleType, UserDetail } from "../../type/user.type";
import Table from "../../components/Tables";

export default function UserPage() {
  const permissions = usePermissions("user");
  const { data: retrieve_users, loading, error } =
    useFetch<UserDetail[]>(RETRIEVE_USERS);

  const filters = ["All", "Admin", "SuperAdmin", "Member"];
  const [filter, setFilter] = useState<"All" | RoleType>("All");
  const [users, setUsers] = useState<any[]>([]);
  const [tablehead, setTablehead] = useState<string[]>([]);
  const [userMode, setUserMode] = useState<"create" | "edit" | null>(null);

  const [eachUserDetail, setEachUserDetail] =
    useState<UserDetail>();
  const [originalUser, setOriginalUser] =
    useState<UserDetail | null>(null);

  const [userDetail, setUserDetail] = useState({
    id: "",
    username: "",
    fullname: "",
    email: "",
    role: "member",
    password: "",
  });

  const [submitUser, setSubmitUser] =
    useState<"create" | "edit" | null>(null);



  // fetch user
  useEffect(() => {
    if (retrieve_users) {
      const headers = extractHeaders(retrieve_users);
      setTablehead(headers);
      setUsers(retrieve_users);
    }
  }, [retrieve_users]);

  // set Edit data
  useEffect(() => {
    if (!eachUserDetail) return;

    setOriginalUser(eachUserDetail);

    setUserDetail({
      id: eachUserDetail.id,
      username: eachUserDetail.username,
      fullname: eachUserDetail.fullname,
      email: eachUserDetail.email,
      role: eachUserDetail.role,
      password: "",
    });
  }, [eachUserDetail]);

  // Get only changed field
  const getChangedFields = (
    original: UserDetail| null,
    current: typeof userDetail
  ) => {
    if (!original) return {};

    const changed: Partial<typeof userDetail> = {};

    (Object.keys(current) as (keyof typeof userDetail)[]).forEach(
      (key) => {
        if (
          key !== "id" &&
          key !== "password" &&
          current[key] !== (original as any)[key]
        ) {
          changed[key] = current[key];
        }
      }
    );

    return changed;
  };

  // Submit
  useCreateResource<AddUser>({
    trigger: submitUser,
    method: submitUser === "create" ? "POST" : "PATCH",
    endpoint:
      submitUser === "create"
        ? CREATE_USER
        : UPDATE_USER(userDetail.id),

    payload:
      submitUser === "create"
        ? userDetail
        : getChangedFields(originalUser, userDetail),

    page: "User",

    onSuccess: () => {
      setUserDetail({
        id: "",
        username: "",
        fullname: "",
        email: "",
        role: "member",
        password: "",
      });
      setUserMode(null);
      setOriginalUser(null);
    },

    resetTrigger: () => setSubmitUser(null),
  });

  return (
    <PageLayout sidebar={<NavBar />}>
      <PageContent>
        <PageHeader
          title="All Users"
          icon={<HiUsers className="text-indigo-500" />}
          actions={
            permissions.canCreate && (
              <Button
                varient="primary"
                onClick={() => setUserMode("create")}
              >
                Create User
              </Button>
            )
          }
        />

        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <FilterComponent
            filters={filters}
            filter={filter}
            setFilter={setFilter}
          />
        </Card>

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
            ) : (
              <Table
                tablehead={tablehead}
                tabledata={users}
                permissions={permissions}
                setModelType={setUserMode}
                setValue={setEachUserDetail}
              />
            )}
          </div>
        </Card>

        {userMode && (
          <CreateModel
            modelType={userMode}
            setModelType={setUserMode}
            title="User"
            formData={userDetail}
            setFormData={setUserDetail}
            setSubmit={setSubmitUser}
            fields={userField}
          />
        )}
      </PageContent>
    </PageLayout>
  );
}
