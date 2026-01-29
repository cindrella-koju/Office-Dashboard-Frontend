import { useEffect, useState } from "react";
import EventNavBar from "../../../components/EventNavbar";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { RETRIEVE_GROUP_AND_MEMBERS, UPDATE_GROUP_TABLE } from "../../../constants/urls";
import useFetch from "../../../hooks/useFetch";
import { usePermissions } from "../../../hooks/userPermission";
import type { EachGroupDetail, GroupMember, Stage } from "../../../type/group.type";
import CreateGroupModal from "../../../components/Model/GroupModel";
import GroupTable from "../../../components/table/GroupTable";



export default function Groups(){
    const eventId = localStorage.getItem("eventId")
    const permissions = usePermissions("group");
    const { data: groupsData,refetch } = useFetch<Stage[]>(RETRIEVE_GROUP_AND_MEMBERS(eventId ? eventId : ""));
    const [editingUserId, setEditingUserId] = useState<{ groupId: string; userId: string } | null>(null);
    const [editedUserData, setEditedUserData] = useState<GroupMember | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [eachGroupData,setEachGroupData] = useState<EachGroupDetail>({
        group_id : "",
        name : "",
        stage_id : "",
        stage_name : "",
        participants_id : []
    })

    useEffect(() => {
        if (!eachGroupData) return;

        console.log("Each group data:", eachGroupData)
    },[eachGroupData])
    const handleEditUser = (groupId: string, member: GroupMember) => {
        setEditingUserId({ groupId, userId: member.user_id });
        setEditedUserData(JSON.parse(JSON.stringify(member)));
    };

    const handleUserCellChange = (columnField: string, value: string) => {
        if (!editedUserData) return;
        const updatedUser = { ...editedUserData };
        const columnIndex = updatedUser.columns.findIndex((col) => col.column_field === columnField);
        
        if (columnIndex !== -1) {
            updatedUser.columns[columnIndex].value = value;
        }        
        setEditedUserData(updatedUser);
    };

    const handleSave = async (groupId : string) => {
        if (!editedUserData) return;

        try {
            const membersData = [{
                user_id: editedUserData.user_id,
                columns: editedUserData.columns.map((col) => ({
                    column_id: col.column_id,
                    value: col.value
                }))
            }];
            
            const response = await fetch(UPDATE_GROUP_TABLE(groupId), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: membersData })
            });
            
            if (response.ok) {
                alert('User data updated successfully!');
                refetch()
            } else {
                alert('Failed to update user data.');
            }
            
            setEditingUserId(null);
            setEditedUserData(null);
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('Failed to save changes. Please try again.');
        }
    }

    const handleCancel = () => {
        setEditingUserId(null);
        setEditedUserData(null);
    }

    const handleCreateGroup = () => {
        setModalMode('create');
        setSelectedGroupId(null);
    };

    const handleEditGroup = (groupId: string) => {
        setModalMode('edit');
        setSelectedGroupId(groupId);
    };

    return(
        <PageLayout sidebar={<EventNavBar/>}>
            <PageContent>
                <PageHeader
                    title="All Groups"
                    actions = {
                        permissions.canCreate && (
                            <Button onClick={handleCreateGroup}>Create Group</Button>
                        )
                    }
                />
                <Card className="p-4 sm:p-6">
                    <div className="space-y-8">
                        {
                            groupsData && 
                                <GroupTable
                                    groupData={groupsData}
                                    permissions={permissions}
                                    editingUserId={editingUserId}
                                    editedUserData={editedUserData}
                                    handleUserCellChange={handleUserCellChange}
                                    handleCancel={handleCancel}
                                    handleSave={handleSave}
                                    handleEditUser={handleEditUser}
                                    handleEditGroup={handleEditGroup}
                                    setEachGroupData={setEachGroupData}
                                />
                        }
                    </div>
                </Card>

                {
                    eventId && modalMode!= null &&(
                        <CreateGroupModal 
                            // isOpen={isModalOpen} 
                            // onClose={() => setIsModalOpen(false)}
                            groupId={selectedGroupId}
                            mode={modalMode}
                            eventId={eventId}
                            setIsModalOpen={setModalMode}
                            eachGroupData={eachGroupData}
                        />
                    )
                }
            </PageContent>
        </PageLayout>
    )
}
