import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import { PageContent, PageHeader, PageLayout } from "../components/layout/PageLayout";
import NavBar from "../components/Navbar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { usePermissions, type Permission } from "../hooks/userPermission";
import type { ModelType } from "../type/main.type";
import RoleModel from "../components/Model/RoleModel";
import { useUserRole } from "../hooks/role/useRole";
import ConfirmationModal from "../components/Model/ConfirmationPopUp";
import { useRoleForm } from "../hooks/role/useRoleForm";



export default function RolePage() {
    const permissions = usePermissions<Permission>({})

    const {
        filterOptions,
        filterfor,
        setFilterFor,
        setDetails,
        details,
        header,
        dataKeys,
        selectedRole,
        setSelectedRole,
        urlFunction,
        deleteRole,
        createRole,
        updateRole
    } = useUserRole()

    const {
        permissionDetail,
        setPermissionDetail,
        reset,
        handleBoolValue
    } = useRoleForm(selectedRole)
    
    const [modelType, setModelType] = useState<ModelType>(null)
    const [popUpDelete, setPopUpDelete] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(modelType === "create") await createRole(permissionDetail)
        if( modelType === "edit" ){
        if (selectedRole && !selectedRole.id) return;
        await updateRole(selectedRole && selectedRole.id,permissionDetail)
        }
        setModelType(null)
        reset()
    };

    return ( 
        <PageLayout sidebar={<NavBar/>}>
            <PageContent>
                <PageHeader
                    title="Permission Management"
                    actions = {
                        permissions.canCreateRoles && (
                            <Button
                                varient="primary"
                                size="lg"
                                onClick={() => {
                                    setSelectedRole(undefined);
                                    setModelType("create");
                                }}
                            >
                                Create Role
                            </Button>
                        )
                    }
                />

                <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
                    <div className="p-4 sm:p-6">
                            <Filters<any>
                                filters={filterOptions}
                                label="Select to see Permissions"
                                defaultVal={filterOptions[0]}
                                urlFunction={urlFunction}
                                setSelectVal={setDetails}
                                onSelectFilter={(f) => setFilterFor(f.id)}
                            />

                    </div>
                </Card>

                <Card className="p-4 sm:p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    {
                                        header.map((heads, index) => (
                                        <th key={index} className="px-8 py-5 text-sm font-medium text-gray-700 text-center whitespace-nowrap min-w-[140px]">
                                            {heads}
                                        </th>
                                        ))
                                    }
                                    
                                    <th className="px-8 py-5 text-sm font-medium text-gray-700 text-center whitespace-nowrap min-w-[180px]">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {details && Array.isArray(details) && details.map((row: any, rowIndex: number) => (
                                    <tr
                                        key={rowIndex}
                                        className="hover:bg-blue-50/40 transition-colors duration-150"
                                    >
                                        {dataKeys.map((key, colIndex) => {
                                            let value;
                                            // For page filter, handle roleaccesspage nested object
                                            if(filterfor === "page" && key !== "rolename") {
                                                value = row.roleaccesspage?.[key];
                                            } else {
                                                value = row[key];
                                            }

                                            return (
                                                <td key={colIndex} className="px-8 py-5 text-center text-sm text-gray-700">
                                                    {typeof value === 'boolean' ? (
                                                        value ? <TickGreen /> : <Cross />
                                                    ) : typeof value === 'object' || value === null || value === undefined ? (
                                                        '-'
                                                    ) : (
                                                        String(value)
                                                    )}
                                                </td>
                                            );
                                        })}

                                        <td className="px-8 py-5 text-center">
                                            <div className="flex gap-3 justify-center">
                                                {permissions.canEditRoles && (
                                                    <Button 
                                                        size="sm"
                                                        onClick={() => {
                                                            setModelType("edit")
                                                            setSelectedRole(row)
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                )}
                                                {permissions.canDeleteRoles && (
                                                    <Button size="sm" varient="danger" onClick={() => {
                                                        setPopUpDelete(prev => !prev)
                                                        setSelectedRole(row)
                                                    }}> 
                                                        Delete
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {
                    modelType != null && <RoleModel
                     setModelType={setModelType} 
                     modeltype={modelType} 
                     todisplay={filterfor} 
                     handleSubmit={handleSubmit}
                     permissionDetail={permissionDetail}
                     setPermissionDetail={setPermissionDetail}
                     handleBoolValue={handleBoolValue}
                    />
                }

                { selectedRole &&
                    <ConfirmationModal
                        isOpen = {popUpDelete}
                        title="Delete"
                        message={`Are you sure you want to delete Role ${selectedRole.rolename}`}
                        onConfirm={() => {
                            deleteRole(selectedRole.id)
                            setPopUpDelete(false)
                        }}
                        onCancel={() => setPopUpDelete(false)}
                    />
                }
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