import { RETRIEVE_GROUP_AND_MEMBERS } from "../constants/urls";
import type { Group } from "../type/group.type";

import type { GroupMember } from "../type/group.type";


// API function to fetch group details
export const fetchGroupDetails = async (groupId: string) => {
    try {
        const response = await fetch(`${RETRIEVE_GROUP_AND_MEMBERS}?group_id=${groupId}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            const group = data[0];
            return {
                group_name: group.group_name,
                round_id: group.stage_id || '',
                participant_ids: group.members.map((m: any) => m.user_id)
            };
        }
        
        return {
            group_name: '',
            round_id: '',
            participant_ids: []
        };
    } catch (error) {
        console.error('Error fetching group details:', error);
        throw error;
    }
};

// Helper function to get column value for a member
export const getColumnValue = (member: any, columnField: string) => {
    const column = member.columns?.find((col: any) => col.column_field === columnField);
    const result = column?.value || 0;
    return result;
};

// Extract all unique column fields from all members
export const getAllColumnFields = (groups: Group[]) => {
    const fields = new Set<string>();
    groups?.forEach(group => {
        group.members?.forEach((member: any) => {
            member.columns?.forEach((col: any) => {
                if (col.column_field) {
                    fields.add(col.column_field);
                }
            });
        });
    });
    return Array.from(fields);
};

export function extractColumnFieldsFromMembers(members : GroupMember[]){
    return Array.from(
        new Set(members.flatMap(
        (member) => (
                member.columns.map((col) => 
                    col.column_field
                )
            )
        ))
    )
}

export function extractColumnsAndValues(members: GroupMember[], columnFields: string[]) {
    return members.map((member) => {
        const valuesByColumn = columnFields.map((columnField) => {
            const column = member.columns.find((col) => col.column_field === columnField);
            return column ? { value : column.value, column_id : column.column_id} : { value : null,  column_id : ""}
        });

        return { user_id : member.user_id, username : member.username, values : valuesByColumn}
    })
}