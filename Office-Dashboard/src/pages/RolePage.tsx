import { useCallback, useEffect, useState } from "react";
import Filters from "../components/Filters";
import { PageContent, PageHeader, PageLayout } from "../components/layout/PageLayout";
import NavBar from "../components/Navbar";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { usePermissions, type Permission } from "../hooks/userPermission";
import { RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT } from "../constants/urls";
import { extractPageHeader, extractPermissionHeaders } from "../utils/extractHeader";
import type { ModelType } from "../type/main.type";
import type { selectPermsission } from "../type/role.type";
import RoleModel from "../components/Model/RoleModel";


export default function RolePage() {
    const permissions = usePermissions<Permission>({})
    const filterOptions = [
        { id:"event", name: "Events" },
        { id:"role", name: "Roles" },
        { id:"user", name: "Users" },
        { id:"within_event", name: "Within Events" },
        { id:"page", name: "Pages" },
    ]
    const [filterfor, setFilterFor] = useState<string>(filterOptions[0].id)
    const [details, setDetails] = useState<selectPermsission>()
    const urlFunction = useCallback(() => {
        return RETRIEVE_DETAIL_FOR_ROLE_MANAGEMENT(filterfor)
    }, [filterfor])

    const [header,setHeader] = useState<string[]>([])
    const [dataKeys, setDataKeys] = useState<string[]>([])
    const [modelType, setModelType] = useState<ModelType>(null)
    const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined)

    useEffect(() => {
        if(!details || !Array.isArray(details) || details.length === 0) {
            setHeader([])
            setDataKeys([])
            return;
        }
        
        if(filterfor === "page"){
            setHeader(extractPageHeader(details))
            // For page filter, first key is role name, rest are from roleaccesspage
            if(details[0].roleaccesspage) {
                setDataKeys(["rolename", ...Object.keys(details[0].roleaccesspage)])
            } else {
                setDataKeys(["rolename"])
            }
        }
        else{
            setHeader(extractPermissionHeaders(details))
            // For permissions, get the original keys
            const excludeKeys = ["id", "created_at", "updated_at"];
            const keys = Object.keys(details[0]).filter(key => !excludeKeys.includes(key));
            setDataKeys(keys)
        }

    },[details, filterfor])

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
                                                    <Button size="sm" varient="danger">
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
                    modelType != null && <RoleModel setModelType={setModelType} modeltype={modelType} todisplay={filterfor} eachdetail={selectedRole}/>
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