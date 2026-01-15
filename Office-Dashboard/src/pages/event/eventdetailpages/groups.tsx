import EventNavBar from "../../../components/EventNavbar";
import { usePermissions } from "../../../hooks/userPermission";




export default function Groups() {
    const permissions = usePermissions("group")
    // const { data: group_and_members } = useFetch(RETRIEVE_GROUP_AND_MEMBERS)
    // console.log(group_and_members)
    
    const GroupMembers = [
  {
    "group_id": "8f2eeb7d-6110-46c6-b0f6-aa4f813f7538",
    "group_name": "Group A",
    "members": [
      {
        "user_id": "ec6c7b59-e2f7-4f24-871a-2e1635988dd0",
        "username": "cindy",
        "columns": [
          {
            "column_id": "71067632-1468-4cc5-adb4-68a1c5ebd50d",
            "column_field": "MP",
            "value": "30"
          },
          {
            "column_id": "7003d25f-787a-4d19-a915-2afd02f26a8f",
            "column_field": "Loss",
            "value": "29"
          },
          {
            "column_id": "4dd6dbae-b213-41b6-b60b-1f31509e3817",
            "column_field": "Points",
            "value": null
          },
          {
            "column_id": "961e0348-a097-479d-82d5-27068287cf3f",
            "column_field": "Win",
            "value": null
          }
        ]
      },
      {
        "user_id": "33bf5336-baf4-4ed8-ae88-16759b5898db",
        "username": "sanjib",
        "columns": [
          {
            "column_id": "7003d25f-787a-4d19-a915-2afd02f26a8f",
            "column_field": "Loss",
            "value": "5"
          },
          {
            "column_id": "961e0348-a097-479d-82d5-27068287cf3f",
            "column_field": "Win",
            "value": "10"
          },
          {
            "column_id": "71067632-1468-4cc5-adb4-68a1c5ebd50d",
            "column_field": "MP",
            "value": "15"
          },
          {
            "column_id": "4dd6dbae-b213-41b6-b60b-1f31509e3817",
            "column_field": "Points",
            "value": null
          }
        ]
      }
    ]
  },
  {
    "group_id": "d1f7448a-85c7-43f4-a6db-4e1b5c8629dc",
    "group_name": "Group B",
    "members": [
      {
        "user_id": "cadc5392-1246-4df6-87c4-956997829664",
        "username": "user3",
        "columns": [
          {
            "column_id": "961e0348-a097-479d-82d5-27068287cf3f",
            "column_field": "Win",
            "value": null
          },
          {
            "column_id": "4dd6dbae-b213-41b6-b60b-1f31509e3817",
            "column_field": "Points",
            "value": null
          },
          {
            "column_id": "7003d25f-787a-4d19-a915-2afd02f26a8f",
            "column_field": "Loss",
            "value": null
          },
          {
            "column_id": "71067632-1468-4cc5-adb4-68a1c5ebd50d",
            "column_field": "MP",
            "value": null
          }
        ]
      },
      {
        "user_id": "17adfb04-f988-4e90-a79b-7ca378ba6dd2",
        "username": "user4",
        "columns": [
          {
            "column_id": "71067632-1468-4cc5-adb4-68a1c5ebd50d",
            "column_field": "MP",
            "value": null
          },
          {
            "column_id": "7003d25f-787a-4d19-a915-2afd02f26a8f",
            "column_field": "Loss",
            "value": null
          },
          {
            "column_id": "4dd6dbae-b213-41b6-b60b-1f31509e3817",
            "column_field": "Points",
            "value": null
          },
          {
            "column_id": "961e0348-a097-479d-82d5-27068287cf3f",
            "column_field": "Win",
            "value": null
          }
        ]
      }
    ]
  }
]
    // Helper function to get column value for a member
    const getColumnValue = (member: any, columnField: string) => {
        const column = member.columns?.find((col: any) => col.column_field === columnField);
        return column?.value || 0;
    };

    // Extract all unique column fields from all members
    const getAllColumnFields = (groups: any[]) => {
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

    const columnFields = GroupMembers ? getAllColumnFields(GroupMembers) : [];

    return(
        <div className="flex min-h-screen bg-gray-100">
            <EventNavBar/>
            <main className="flex-1 p-6 md:p-10">
                {
                    permissions.canCreate && (
                        <div>
                            <button
                                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                            >
                                Create Group
                            </button>
                        </div>
                    )
                }
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-6">
                    <div className="space-y-8">
                        {GroupMembers && GroupMembers.map((group: any, idx: number) => (
                            <div key={group.group_id || idx}>
                                <h2 className="text-2xl font-bold mb-4">{group.group_name}</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-gray-200">
                                                <th className="text-left py-3 px-4 font-semibold text-gray-600"></th>
                                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Team</th>
                                                {columnFields.map((field, fieldIdx) => (
                                                    <th key={fieldIdx} className="text-center py-3 px-4 font-semibold text-gray-600">
                                                        {field}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {group.members && group.members.map((member: any, memberIdx: number) => (
                                                <tr key={member.user_id || memberIdx} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-4 px-4 text-gray-500 font-medium">{memberIdx + 1}</td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-medium">{member.username}</span>
                                                        </div>
                                                    </td>
                                                    {columnFields.map((field, fieldIdx) => (
                                                        <td key={fieldIdx} className="py-4 px-4 text-center">
                                                            {getColumnValue(member, field)}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

        </div>
    )
}