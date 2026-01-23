interface OverAllPointsTable{
    users : UserType[]

}

export interface UserType{
    user_id : string
    username : string
    column_detail : ColumnType[]
}

interface ColumnType{
    column_name : string,
    column_value : string
}

export default function OverallPointTable({users}: OverAllPointsTable){
    const columns = users?.[0]?.column_detail ?? [];
    console.log("Columnsss:",columns)
    return(
        <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b border-gray-200">
                        Username
                    </th>
                    {
                        columns.map((col,index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-center font-semibold text-gray-700 border-b border-gray-200"
                            >
                                {col.column_name}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    users && users.map((user) => (
                        <>
                            <tr
                                key={user.user_id}
                                className="transition-colors hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {user.username}
                                </td>
                                {user.column_detail.map((col, index) => (
                                    <td
                                    key={index}
                                    className="px-6 py-4 text-center text-gray-700"
                                    >
                                    {col.column_value}
                                    </td>
                                ))}
                             </tr>
                        </>

                    ))
                }
            </tbody>
        </table>
    )
}