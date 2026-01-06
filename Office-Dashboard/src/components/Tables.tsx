import { useState } from "react";

export default function Table({ tablename, tabledata, isEventTable = false }) {
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <>
        <div>
            <table className="table-auto border-collapse w-full">
                <thead className="bg-gray-300 sticky top-0">
                    <tr>
                        {tablename.map((col:string) => (
                            <th
                            key={col}
                            className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300"
                            >
                            {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tabledata.map((row, index) => (
                         <tr
                            key={index}
                            className={`${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } hover:bg-gray-200 transition-colors duration-200 cursor-pointer`}
                            onClick={isEventTable ? () => setSelectedRow(row) : undefined}
                        >
                            <td className="px-6 py-4">{isEventTable ? row.Name : row.Username}</td>
                            <td className="px-6 py-4">{isEventTable ? row.Status : row.Fullname}</td>
                            {!isEventTable && (
                                <td className="px-6 py-4">{row.Email}</td>
                            )}
                            {!isEventTable && (
                                <td className="px-6 py-4">{row.Role}</td>
                            )}
                            {isEventTable && (
                                <td className="px-6 py-4">{row.StartDate} : {row.EndDate}</td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {   
            selectedRow && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
                    <div className="bg-white w-4/6 h-4/6 p-6 rounded-lg shadow-lg relative overflow-y-auto">
                        <button onClick={() => setSelectedRow(null)}
                            className="absolute top-8 right-8 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                X
                        </button>
                        {
                            isEventTable && (
                                <>
                                    <h1 className="text-center">{selectedRow.Name}</h1>
                                    <p>{selectedRow.Discription}</p>
                                    <p>{selectedRow.StartDate}</p>
                                    <p>{selectedRow.EndDate}</p>
                                </>
                            )
                        }
                    </div>
                </div>
            )
        }
    </>
  );
}
