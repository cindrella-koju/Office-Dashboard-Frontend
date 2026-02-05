import Filters from "../components/Filters";
import { PageContent, PageHeader, PageLayout } from "../components/layout/PageLayout";
import NavBar from "../components/Navbar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { usePermissions, type Permission } from "../hooks/userPermission";

export default function RolePage() {
    const permissions = usePermissions<Permission>({})
    const filterOptions = [
        { id:"event", name: "Events" },
        { id:"page", name: "Pages" },
        { id:"role", name: "Roles" },
        { id:"user", name: "Users" },
        { id:"withing_event", name: "Within Events" },
    ]
    return ( 
        <PageLayout sidebar={<NavBar/>}>
            <PageContent>
                <PageHeader
                    title="Role"
                    actions = {
                        permissions.canCreateRoles && (
                            <Button
                                varient="primary"
                                size="lg"
                            >
                                Create Role
                            </Button>
                        )
                    }
                />

                <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
                    <div className="p-4 sm:p-6">
                            {/* <Filters>
                                defaultVal = {}
                            </Filters> */}
                    </div>
                </Card>

                <Card className="p-4 sm:p-6">
                    <div className="max-h-[500px] lg:max-h-[600px] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-800 w-56 text-center">
                                        Role Name
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-800 w-56 text-center">
                                        Create 
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-800 w-56 text-center">
                                        Edit 
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-800 w-56 text-center">
                                        Delete
                                    </th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-800 w-56 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                <tr
                                className="hover:bg-blue-50/40 transition-colors duration-150"
                                >
                                    <td className="px-4 py-4 text-center">
                                            Admin
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                            <TickGreen/>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                            <TickGreen/>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                            <Cross/>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex gap-3 justify-center">
                                            <Button size="sm">
                                                Edit
                                            </Button>
                                            <Button size="sm" varient="danger">
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </PageContent>
        </PageLayout>
    );
}

function TickGreen({ label = "" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="text-green-600 text-xl font-bold">✔</span>
      {label && <span className="text-gray-600 text-xs">{label}</span>}
    </div>
  );
}

function Cross(){
    return(
        <div className="flex items-center justify-center gap-1.5">
            <span className="text-red-600 text-xl font-bold">✘</span>
        </div>
    )
}