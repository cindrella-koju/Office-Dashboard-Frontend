import { useEffect } from "react";
import type { Group } from "../group.type";
import { getColumnValue } from "../groups.util";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface GroupTableProps {
    group: Group;
    displayGroup: Group;
    isEditing: boolean;
    columnFields: string[];
    canEdit: boolean;
    canDelete: boolean;
    onEditGroup: (groupId: string) => void;
    onEditTableData: (group: Group) => void;
    onDeleteGroup: (groupId: string, groupName: string) => void;
    onDeleteMember: (userId: string, groupId: string, memberName: string, groupName: string) => void;
    onSaveTableData: () => void;
    onCancelEdit: () => void;
    onCellValueChange: (memberIdx: number, columnField: string, value: string) => void;
}
export default function GroupTable({
    group,
    displayGroup,
    isEditing,
    columnFields,
    canEdit,
    canDelete,
    onEditGroup,
    onEditTableData,
    onDeleteGroup,
    onDeleteMember,
    onSaveTableData,
    onCancelEdit,
    onCellValueChange
}: GroupTableProps) {
    useEffect(() => {
        displayGroup && console.log(displayGroup)
    })
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{group.group_name}</h2>
                 <div className="flex gap-2">
                    {
                        canEdit  && !isEditing && (
                            <>
                                <button
                                    onClick={() => onEditGroup(group.group_id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
                                >
                                    Edit Group
                                </button>
                                <button
                                    onClick={() => onEditTableData(group)}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                                >
                                    Edit Table Data
                                </button>
                            </>
                        )
                    }
                    {canDelete && !isEditing && (
                        <button
                            onClick={() => onDeleteGroup(group.group_id, group.group_name)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                        >
                            Delete Group
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button
                                onClick={onSaveTableData}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={onCancelEdit}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-semibold"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                 </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-600"></th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-600">Team</th>
                            {
                                columnFields.map((field,fieldIndex) => (
                                    <th key={fieldIndex} className="text-center py-3 px-4 font-semibold text-gray-600">
                                        {field}
                                    </th>
                                ))
                            }
                            {
                                canDelete && !isEditing && (
                                    <th className="text-center py-3 px-4 font-semibold text-gray-600">Actions</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {displayGroup.members && displayGroup.members.map((member: any, memberIdx: number) => (
                            <tr key={member.user_id || memberIdx} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4 text-gray-500 font-medium">{memberIdx + 1}</td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium">{member.username}</span>
                                    </div>
                                </td>
                                {columnFields.map((field, fieldIdx) => (
                                    <td key={fieldIdx} className="py-4 px-4 text-center">
                                        {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={getColumnValue(member, field)}
                                                    onChange={(e) => onCellValueChange(memberIdx, field, e.target.value)}
                                                    className="w-20 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                />
                                            ) : (
                                                getColumnValue(member, field)
                                            )
                                        }
                                    </td>
                                ))}
                                {
                                    canDelete && !isEditing && (
                                        <td className="py-4 px-4 text-center">
                                            <button
                                                onClick={() => onDeleteMember(member.user_id, group.group_id, member.username, group.group_name)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-semibold"
                                            >
                                                <RiDeleteBin6Fill className="bg-red-400"/>
                                            </button>
                                        </td>
                                    )
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}