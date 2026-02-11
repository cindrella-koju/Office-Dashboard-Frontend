import type { RoleTableProps } from "../../type/role.type"
import { Cross, TickGreen } from "../../utils/role.utils";
import Button from "../ui/Button";


export default function RoleTable({header, details, permissions, dataKeys, filterfor, setModelType, setSelectedRole, setPopUpDelete}:RoleTableProps){
    return(
        <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-50">
                <tr>
                    {
                        header.map((heads, index) => (
                        <th key={index} className="px-8 py-5 text-sm font-medium text-gray-700 text-center whitespace-nowrap min-w-[140px]">
                            {heads}
                        </th>
                        ))
                    }
                    
                    <th className="px-8 py-5 text-sm font-medium text-gray-700 text-center whitespace-nowrap min-w-[180px]">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
                {details && Array.isArray(details) && details.map((row: any, rowIndex: number) => (
                    <tr
                        key={rowIndex}
                        className="hover:bg-blue-50/40 transition-colors duration-150"
                    >
                        {dataKeys.map((key, colIndex) => {
                            let value;
                            // For page filter, handle roleaccesspage nested object
                            if(filterfor === "page" && key !== "rolename") {
                                value = row.roleaccesspage?.[key];
                            } else {
                                value = row[key];
                            }

                            return (
                                <td key={colIndex} className="px-8 py-5 text-center text-sm text-gray-700">
                                    {typeof value === 'boolean' ? (
                                        value ? <TickGreen /> : <Cross />
                                    ) : typeof value === 'object' || value === null || value === undefined ? (
                                        '-'
                                    ) : (
                                        String(value)
                                    )}
                                </td>
                            );
                        })}

                        <td className="px-8 py-5 text-center">
                            <div className="flex gap-3 justify-center">
                                {permissions.canEditRoles && (
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setModelType("edit")
                                            setSelectedRole(row)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                )}
                                {permissions.canDeleteRoles && (
                                    <Button size="sm" varient="danger" onClick={() => {
                                        setPopUpDelete(prev => !prev)
                                        setSelectedRole(row)
                                    }}> 
                                        Delete
                                    </Button>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}