import type { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import type { EventPermission, Permission } from "../../hooks/userPermission";

type UserRole = "admin" | "member" | "superadmin";
type Status = "active" | "draft" | "completed";
type ModelType = "create" | "edit" | null;

interface TableProps {
  tablehead: string[];
  tabledata: Record<string, any>[];
  permissions?: Permission | EventPermission;
  showView?: boolean;
  setModelType: Dispatch<SetStateAction<ModelType>>;
  setValue: Dispatch<SetStateAction<any>>;
  tablefor : "Event" | "Role" | "User" | null | "WithinEvent";
  setOnDelete ?: Dispatch<SetStateAction<boolean>>
}

const roleStyles: Record<UserRole, string> = {
  admin: "bg-green-100 text-green-700",
  superadmin: "bg-blue-100 text-blue-700",
  member: "bg-gray-200 text-gray-600",
};

const statusStyles: Record<Status, string> = {
  active: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  draft: "bg-yellow-100 text-yellow-700",
};

const Badge = ({ value }: { value: string }) => {
  const style =
    roleStyles[value as UserRole] ||
    statusStyles[value as Status] ||
    "bg-gray-100 text-gray-600";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${style}`}
    >
      {value}
    </span>
  );
};

export default function Table({
  tablehead,
  tabledata,
  permissions,
  showView = false,
  setModelType,
  setValue,
  tablefor,
  setOnDelete
}: TableProps) {
  const userId = localStorage.getItem("user_id")
  const navigate = useNavigate();
  const permissionMap = {
    Event: {
      edit: permissions && 'canEditEvents' in permissions ? permissions.canEditEvents : false,
      delete: permissions && 'canDeleteEvents' in permissions ? permissions.canDeleteEvents : false,
    },
    Role: {
      edit: permissions && 'canEditRoles' in permissions ? permissions.canEditRoles : false,
      delete: permissions &&  'canDeleteRoles' in permissions ? permissions.canDeleteRoles : false,
    },
    User: {
      edit: permissions && 'canEditUsers' in permissions ? permissions.canEditUsers : false,
      delete: permissions && 'canDeleteUsers' in permissions ? permissions.canDeleteUsers : false,
    },
    WithinEvent: {
      edit: permissions && 'canEdit' in permissions ? permissions.canEdit : false,
      delete: permissions && 'canDelete' in permissions ? permissions.canDelete : false
    }
  };


  const editpermission = () => tablefor && permissionMap[tablefor].edit;
  const deletepermission = () => tablefor && permissionMap[tablefor].delete;

  const showActions = editpermission() || deletepermission();


  const hasActionColumn = showActions || showView;

  const handleClick = (id: string, title?: string) => {
    localStorage.setItem("eventId", id);
    if (title) {
      localStorage.setItem("eventTitle", title);
    }
    navigate(`/event/${id}/groups`);
  };

  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {tablehead.map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
                >
                  {head}
                </th>
              ))}

              {hasActionColumn && tabledata.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {tabledata.map((row, index) => (
              <tr
                key={row.id ?? index}
                className={`hover:bg-gray-50 transition ${row.user_id === userId ? "bg-green-100" : ""}`}
                
              >
                {tablehead.map((head) => (
                  <td key={head} className="px-6 py-4 text-sm text-gray-700">
                    {head === "role" || head === "status" ? (
                      <Badge value={row[head]} />
                    ) : (
                      row[head]?.toString()
                    )}
                  </td>
                ))}

                {hasActionColumn && (
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {showView  && (
                        <Button
                          varient="success"
                          size="sm"
                          onClick={() => handleClick(row.id, row.title)}
                        >
                          View
                        </Button>
                      )}

                      { editpermission() && (
                        <Button
                          varient="primary"
                          size="sm"
                          onClick={() => {
                            setModelType("edit");
                            setValue(row);
                          }}
                        >
                          Edit
                        </Button>
                      )}

                      {deletepermission() && setOnDelete && (
                        <Button varient="danger" size="sm" onClick={() => {
                          setOnDelete(true);
                          setValue(row);
                        }}>
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {tabledata.length === 0 && (
          <div className="rounded-lg border bg-white p-6 text-center text-sm text-gray-500">
            No data available
          </div>
        )}

        {tabledata.map((row, index) => (
          <div
            key={row.id ?? index}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm space-y-3"
          >
            {tablehead.map((head) => (
              <div key={head} className="flex justify-between gap-4">
                <span className="text-xs font-semibold uppercase text-gray-500">
                  {head}
                </span>
                <span className="text-sm text-gray-700 text-right">
                  {head === "role" || head === "status" ? (
                    <Badge value={row[head]} />
                  ) : (
                    row[head]
                  )}
                </span>
              </div>
            ))}

            {hasActionColumn && (
              <div className="flex gap-2 pt-2">
                {showView && (
                  <Button
                    varient="success"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleClick(row.id, row.title)}
                  >
                    View
                  </Button>
                )}

                {editpermission()&& (
                  <Button
                    varient="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setModelType("edit");
                      setValue(row);
                    }}
                  >
                    Edit
                  </Button>
                )}

                { deletepermission() && setOnDelete && (
                  <Button
                    varient="danger"
                    size="sm"
                    className="flex-1"
                    onClick={() => setOnDelete(true)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
