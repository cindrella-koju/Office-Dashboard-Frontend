import { usePermissions } from "../hooks/userPermission";
import type { ResourceType } from "../utils/permissions";

type UserRole = "Admin" | "Superadmin" | "Member";

const userstatusStyles: Record<UserRole, string> = {
  Admin : "bg-green-100 text-green-700",
  Superadmin : "bg-blue-100 text-blue-700",
  Member: "bg-gray-200 text-gray-600",
};

export const statusColors = {
    Active: "bg-green-100 text-green-700",
    Completed: "bg-blue-100 text-blue-700",
    Draft: "bg-yellow-100 text-yellow-700"
};


// isOverAllTieSheet :- It is to show edit and delete only when event name is Overall Tiesheet in Event Detail
export default function Table({
  tablehead,
  tabledata,
  resource,
  isOverAllTieSheet,
  classname 
}: {
  tablehead: string[];
  tabledata: Record<string, any>[];
  resource : ResourceType;
  isOverAllTieSheet? : boolean;
  classname? : string
}) {
    const permissions = usePermissions(resource)

  return (
    <table className={`w-full ${classname && classname}`}>
      <thead className="bg-gray-50">
        <tr>
          {tablehead.map((head, index) => (
            <th
              key={index}
              className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase"
            >
              {head}
            </th>
          ))}
          {(permissions.canEdit || permissions.canDelete) && (
            resource === "eventdetail" ? (
                isOverAllTieSheet && (
                  <th
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase"
                  >
                    Actions
                  </th>
                )
            ) : (
              <th
                className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase"
              >
                Actions
              </th>
            )
          )}
        </tr>
      </thead>

      <tbody>
        {tabledata.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
            {tablehead.map((head) => (
                <td key={head} className="px-6 py-4">
                {head === "role" ? (
                    <span
                    className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                        userstatusStyles[user[head] as UserRole]
                    }`}
                    >
                        {/* {head} */}
                    {user[head]}
                    </span>
                ) : (
                    user[head]
                )}
                </td>
            ))}

            {(permissions.canEdit || permissions.canDelete || resource === "event") && (
                <td className="px-6 py-4">
                    <div className="flex gap-2">
                    {resource === "event" && (
                        <button
                        className="px-3 py-1.5 bg-green-100 rounded-lg hover:bg-green-600 hover:text-white text-sm"
                        >
                        View
                        </button>
                    )}
                    {
                     resource === "eventdetail" ? (
                      isOverAllTieSheet && (
                        <>
                          {permissions.canEdit && (
                              <button
                              className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white text-sm"
                              >
                              Edit
                              </button>
                          )}
      
                          {permissions.canDelete && (
                              <button
                              className="px-3 py-1.5 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white text-sm"
                              >
                              Delete
                              </button>
                          )}
                        </>

                      )
                     ) : (
                      <>
                        {permissions.canEdit && (
                            <button
                            className="px-3 py-1.5 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white text-sm"
                            >
                            Edit
                            </button>
                        )}
    
                        {permissions.canDelete && (
                            <button
                            className="px-3 py-1.5 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white text-sm"
                            >
                            Delete
                            </button>
                        )}
                      </>
                     )
                    }
                    </div>
                </td>
                )}

            </tr>
        ))}
        </tbody>

    </table>
  );
}
