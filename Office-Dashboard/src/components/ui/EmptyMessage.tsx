import type React from "react";
import Card from "./Card";
import { useContext } from "react";
import RoleContext from "../../context/rolecontext";

interface EmptyMessageProps{
    message : string,
    submessage? : string,
    icon? : React.ReactNode
}
export default function EmptyMessage({message, submessage,icon}:EmptyMessageProps){
    const role =  useContext(RoleContext);

    return(
        <Card className="text-center py-12">
           <div className="text-gray-400 mb-6">
                <div className="w-20 h-20 mx-auto flex items-center justify-center">
                    <div className="w-full h-full">
                        {icon}
                    </div>
                </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {message}
            </h3>
            {(role === 'admin' || role === 'superadmin') && (
                <p className="text-gray-500">
                    {submessage}
                </p>
            )}

        </Card>
    )
}