import Button from "../ui/Button";
import type { GroupTableProps} from "../../type/group.type";
import { extractColumnFieldsFromMembers, extractColumnsAndValues } from "../../utils/groups.util";



export default function GroupTable({groupData, permissions, editingUserId, editedUserData, handleUserCellChange, handleCancel, handleEditUser, handleSave, handleEditGroup, setEachGroupData}:GroupTableProps){
    return(
        <div className="space-y-8">
            {
                groupData && groupData.map((stage, index) => (
                    <div key={index} className="space-y-4">
                        <h1 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">{stage.stage_name.toUpperCase()}</h1>
                        {
                            stage.groups.map((group,groupIndex) => {
                                const columnFields = extractColumnFieldsFromMembers(group.members);
                                const userValues = extractColumnsAndValues(group.members, columnFields);
                                const participants = Array.from(group.members.map((g) =>  g.user_id));
                                return(
                                    <div key={groupIndex} className="mb-6">
                                        <div className="flex items-center justify-between mb-3 px-1">
                                            <h2 className="text-lg font-semibold text-gray-700">{group.group_name}</h2>
                                            <div className="flex items-center gap-2">
                                                {
                                                    permissions.canEdit && (
                                                        <Button varient="success" onClick={() => {
                                                            handleEditGroup(group.group_id)
                                                            setEachGroupData({
                                                                group_id : group.group_id,
                                                                name : group.group_name,
                                                                stage_id: stage.stage_id,
                                                                stage_name : stage.stage_name,
                                                                participants_id : participants
                                                            })
                                                        }}>Edit Group</Button>
                                                    )
                                                }
                                                {
                                                    permissions.canDelete && (
                                                        <Button varient="danger">Delete Group</Button>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                            <table className="w-full border-collapse bg-white text-sm">
                                                <thead>
                                                    <tr className="bg-gray-400 text-white">
                                                        <>
                                                        <th className="px-4 py-3 text-left font-semibold tracking-wide">Username</th>
                                                        {
                                                            columnFields.map((field, idx) => (
                                                                <th key={idx} className="px-4 py-3 text-left font-semibold tracking-wide capitalize">{field}</th>
                                                            ))
                                                        }
                                                        {(permissions.canEdit || permissions.canDelete) && (
                                                            <th className="px-4 py-3 text-center font-semibold tracking-wide">Actions</th>
                                                        )}
                                                        </>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                    {
                                                        userValues.map((user, userIndex) => {
                                                            const isEditingCell = editingUserId?.groupId === group.group_id && editingUserId.userId === user.user_id
                                                            const originalMember = group.members.find(m => m.user_id === user.user_id);

                                                            return(
                                                                <tr key={userIndex} className="hover:bg-blue-50 transition-colors duration-150">
                                                                    <td className="px-4 py-3 font-medium text-gray-900">{user.username}</td>
                                                                    {
                                                                        isEditingCell && editedUserData ? (
                                                                            columnFields.map((field, valueIndex) => {
                                                                                const col = editedUserData.columns.find(c => c.column_field === field);
                                                                                return (
                                                                                    <td key={valueIndex} className="px-4 py-3">
                                                                                        <input
                                                                                            type="text"
                                                                                            value={col?.value ?? ''}
                                                                                            onChange={(e) => handleUserCellChange(field, e.target.value)}
                                                                                            className="w-full px-2 py-1 text-sm border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                                                                        />
                                                                                    </td>
                                                                                );
                                                                            })
                                                                        ): (
                                                                            user.values.map((val, valueIndex) => (
                                                                                <td key={valueIndex} className="px-4 py-3 text-gray-600">{val.value ?? '-'}</td>
                                                                            ))
                                                                        )
                                                                    }
                                                                    {
                                                                        ( permissions.canEdit || permissions.canDelete ) && originalMember && (
                                                                            <td className="px-4 py-3">
                                                                                <div className="flex items-center justify-center gap-1">
                                                                                    {
                                                                                        isEditingCell ? (
                                                                                            <>
                                                                                                <Button size="sm" varient="success" onClick={() => handleSave(group.group_id)}>
                                                                                                    Save
                                                                                                </Button>
                                                                                                <Button size="sm" varient="danger" onClick={() => handleCancel()}>
                                                                                                    Cancel
                                                                                                </Button>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                            {
                                                                                                permissions.canEdit && (
                                                                                                    <Button size="sm" varient="success" onClick={() => handleEditUser(group.group_id,originalMember)}>
                                                                                                        Edit
                                                                                                    </Button>
                                                                                                )
                                                                                            }
                                                                                            {
                                                                                                permissions.canDelete && (
                                                                                                    <Button size="sm" varient="danger">
                                                                                                        Delete
                                                                                                    </Button>
                                                                                                )
                                                                                            }
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </td>
                                                                        )
                                                                    }
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                ))
            }
        </div>
    )
}