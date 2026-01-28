import { useState } from "react";
import EventNavBar from "../../../../components/EventNavbar";
import { usePermissions } from "../../../../hooks/userPermission";
import { DELETE_GROUP, DELETE_GROUP_MEMBER, RETRIEVE_GROUP_AND_MEMBERS, UPDATE_GROUP_TABLE } from "../../../../constants/urls";
import GroupTable from "./Components/GroupTable";
import type { Group } from "./group.type";
import { getAllColumnFields } from "./groups.util";
import useFetch from "../../../../hooks/useFetch";
import CreateGroupModal from "./Components/GroupModel";
import { PageContent, PageHeader, PageLayout } from "../../../../components/layout/PageLayout";
import Button from "../../../../components/ui/Button";


export default function Groups() {
    const permissions = usePermissions("group");
    const eventId = localStorage.getItem("eventId");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
    const [editedGroupData, setEditedGroupData] = useState<any>(null);

    const handleCreateGroup = () => {
        setModalMode('create');
        setSelectedGroupId(null);
        setIsModalOpen(true);
    };

    const handleEditGroup = (groupId: string) => {
        setModalMode('edit');
        setSelectedGroupId(groupId);
        setIsModalOpen(true);
    };

    const handleEditTableData = (group: Group) => {
        setEditingGroupId(group.group_id);
        setEditedGroupData(JSON.parse(JSON.stringify(group)));
    };

    const handleCancelEdit = () => {
        setEditingGroupId(null);
        setEditedGroupData(null);
    };

    const handleSaveTableData = async () => {
        if (!editedGroupData) return;
        
        try {
            const membersData = editedGroupData.members.map((member: any) => ({
                user_id: member.user_id,
                columns: member.columns.map((col: any) => ({
                    column_id: col.column_id,
                    value: col.value
                }))
            }));
            
            const response = await fetch(UPDATE_GROUP_TABLE(editingGroupId!), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: membersData })
            });
            
            if (response.ok) {
                alert('Group table data updated successfully!');
                // window.location.reload();
            } else {
                alert('Failed to update group table data.');
            }
            
            setEditingGroupId(null);
            setEditedGroupData(null);
        } catch (error) {
            console.error('Error saving table data:', error);
            alert('Failed to save changes. Please try again.');
        }
    };

    const handleCellValueChange = (memberIdx: number, columnField: string, value: string) => {
        if (!editedGroupData) return;
        
        const updatedData = { ...editedGroupData };
        const member = updatedData.members[memberIdx];
        const columnIndex = member.columns.findIndex((col: any) => col.column_field === columnField);
        
        if (columnIndex !== -1) {
            member.columns[columnIndex].value = value;
        }
        
        console.log("Update date:",updatedData)
        setEditedGroupData(updatedData);
    };

    const handleDeleteGroup = async (groupId: string, groupName: string) => {
        if (!window.confirm(`Are you sure you want to delete "${groupName}"? This action cannot be undone.`)) {
            return;
        }
        
        try {
            const response = await fetch(DELETE_GROUP(groupId), {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Group deleted successfully!');
                window.location.reload();
            } else {
                alert('Failed to delete group.');
            }
        } catch (error) {
            console.error('Error deleting group:', error);
            alert('Failed to delete group. Please try again.');
        }
    };

    const handleDeleteMember = async (userId: string, groupId: string, memberName: string, groupName: string) => {
        if (!window.confirm(`Are you sure you want to remove "${memberName}" from "${groupName}"?`)) {
            return;
        }
        
        try {
            const response = await fetch(DELETE_GROUP_MEMBER(userId, groupId), {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Member removed successfully!');
                window.location.reload();
            } else {
                alert('Failed to remove member.');
            }
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Failed to remove member. Please try again.');
        }
    };
    
    // Fetch groups data from API
    const { data: groupsData } = useFetch<Group[]>(RETRIEVE_GROUP_AND_MEMBERS);
    const GroupMembers: Group[] = groupsData || [];
    const columnFields = GroupMembers ? getAllColumnFields(GroupMembers) : [];

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
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-6">
                    <div className="space-y-8">
                        {GroupMembers && GroupMembers.map((group: Group, idx: number) => {
                            const isEditing = editingGroupId === group.group_id;
                            const displayGroup = isEditing ? editedGroupData : group;
                            return (
                                <>
                                    <GroupTable
                                        key={group.group_id || idx}
                                        group={group}
                                        displayGroup={displayGroup}
                                        isEditing={isEditing}
                                        columnFields={columnFields}
                                        canEdit={permissions.canEdit}
                                        canDelete={permissions.canDelete}
                                        onEditGroup={handleEditGroup}
                                        onEditTableData={handleEditTableData}
                                        onDeleteGroup={handleDeleteGroup}
                                        onDeleteMember={handleDeleteMember}
                                        onSaveTableData={handleSaveTableData}
                                        onCancelEdit={handleCancelEdit}
                                        onCellValueChange={handleCellValueChange}
                                    />
                                </>
                            );
                        })}
                    </div>
                </div>
                {
                    eventId && (
                        <CreateGroupModal 
                            isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)}
                            groupId={selectedGroupId}
                            mode={modalMode}
                            eventId={eventId}
                        />
                    )
                }
            </PageContent>

        </PageLayout>   
    )
}