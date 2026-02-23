import { useState } from "react";
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
import RoleTable from "../components/table/RoleTable";



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
        // urlFunction,
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
                                defaultVal={filterOptions[0]}
                                filters={filterOptions}
                                label="Select to view Permission"
                                setSelectVal={setDetails}
                                onSelectFilter={(f) => setFilterFor(f.id)}
                                setStatus={(f) => setFilterFor(f.id)}
                                currentPage={1}
                                totalPage={1}
                                limit={1}
                            />

                    </div>
                </Card>

                <Card className="p-4 sm:p-6">
                    <div className="overflow-x-auto">
                        <RoleTable
                            header={header}
                            details={details}
                            permissions={permissions}
                            dataKeys={dataKeys}
                            filterfor={filterfor}
                            setModelType={setModelType}
                            setSelectedRole={setSelectedRole}
                            setPopUpDelete={setPopUpDelete}
                        />
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

