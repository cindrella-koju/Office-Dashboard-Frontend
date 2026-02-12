import EventNavBar from "../../../components/EventNavbar";
import { PageContent, PageHeader, PageLayout } from "../../../components/layout/PageLayout";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import CreateGroupModal from "../../../components/Model/GroupModel";
import GroupTable from "../../../components/table/GroupTable";
import EmptyMessage from "../../../components/ui/EmptyMessage";
import { MdGroups } from "react-icons/md";
import { useGroup } from "../../../hooks/group/useGroup";
import type React from "react";
import { useEffect } from "react";
import ConfirmationModal from "../../../components/Model/ConfirmationPopUp";



export default function Groups(){
    const eventId = localStorage.getItem("eventId")
    const {
        groupdata,
        permissions,
        handleSave,
        handleUserCellChange,
        handleEditUser,
        handleCreateGroup,
        editingUserId,
        editedUserData,
        handleEditGroup,
        handleCancel,
        modalMode,
        selectedGroupId,
        setModalMode,
        setEachGroupData,
        roundId,
        setRoundId,
        formData,
        setFormData,
        createGroup,
        updateGroup,
        participants,
        fetchQualifierNotInGroupInGroup,
        fetchQualifierNotInGroupInGroupForEdits,
        handleDeleteGroup,
        handleDeleteMember,
        popUpDelete,
        setPopUpDelete,
        deleteGroup,
        deleteGroupMember,
        setDeleteType,
        deleteType,
        setEditingUserId,
        setEditedUserData
    } = useGroup()

    const handleSubmit = async ( e : React.FormEvent) => {
        if(!eventId) return;
        e.preventDefault();
        const payload = {
            name : formData.group_name,
            round_id : formData.round_id,
            participants_ids : formData.participants_ids

        }
        if(modalMode  === "create"){
            createGroup( payload)
        } 
        if(modalMode  === "edit"){
            if(!selectedGroupId) return;
            updateGroup( selectedGroupId,payload)
        } 
        setModalMode(null)
    }

    useEffect(() => {
        if(!roundId) return;

        modalMode === "create" ? 
        fetchQualifierNotInGroupInGroup(roundId)
        : 
        fetchQualifierNotInGroupInGroupForEdits(roundId,selectedGroupId ? selectedGroupId : "")
    },[roundId, selectedGroupId])

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
                {
                groupdata && groupdata.length > 0 &&
                    <Card className="p-4 sm:p-6">
                        <div className="space-y-8">
                            <GroupTable
                                groupData={groupdata}
                                permissions={permissions}
                                editingUserId={editingUserId}
                                editedUserData={editedUserData}
                                handleUserCellChange={handleUserCellChange}
                                handleCancel={handleCancel}
                                handleSave={handleSave}
                                handleEditUser={handleEditUser}
                                handleEditGroup={handleEditGroup}
                                setEachGroupData={setEachGroupData}
                                handleDeleteGroup={handleDeleteGroup}
                                handleDeleteMember={handleDeleteMember}
                            />
                        </div>
                    </Card>
                }

                {
                    eventId && modalMode!= null &&(
                        <CreateGroupModal 
                            mode={modalMode}
                            setIsModalOpen={setModalMode}
                            formData={formData}
                            setFormData={setFormData}
                            roundId={roundId}
                            setRoundId={setRoundId}
                            handleSubmit={handleSubmit}
                            participants={participants ? participants : [] }
                        />
                    )
                }

                {
                    groupdata && groupdata.length === 0 && (
                        <EmptyMessage message="No Group Yet" submessage="Create Group to see them appear hear" icon={<MdGroups size={80} />}/>
                    )
                }

                {
                    selectedGroupId && deleteType === "group" &&
                    <ConfirmationModal
                        isOpen={popUpDelete}
                        title="Delete"
                        message={`Are you sure you want to delete this Group?`}
                        onCancel={() => {
                            setPopUpDelete(false)
                            setDeleteType(null)
                        }}
                        onConfirm={() => {
                        deleteGroup (selectedGroupId)
                        setPopUpDelete(false)
                        setDeleteType(null)
                        }}
                    />
                }
                {
                    editingUserId && deleteType === "member" &&
                    <ConfirmationModal
                        isOpen={popUpDelete}
                        title="Delete"
                        message={`Are you sure you want to delete member ${editedUserData?.username}`}
                        onCancel={() => {
                            setPopUpDelete(false)
                            setDeleteType(null)
                            setEditingUserId(null)
                            setEditedUserData(null)
                        }}
                        onConfirm={() => {
                        deleteGroupMember(editingUserId.groupId,editingUserId.userId)
                        setPopUpDelete(false)
                        setDeleteType(null)
                        }}
                    />
                }
            </PageContent>
        </PageLayout>
    )
}
