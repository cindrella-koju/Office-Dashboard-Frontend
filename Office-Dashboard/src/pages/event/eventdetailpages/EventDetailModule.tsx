import type { Dispatch, SetStateAction } from "react"

type viewMode = "create" | "edit" | null

interface EventDetailModuleType{
    viewMode : viewMode,
    setViewMode : Dispatch<SetStateAction<viewMode>>,
    modelName : string
}

export default function EventDetailModule({viewMode, setViewMode, modelName}:EventDetailModuleType){
    return (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 max-h-[85vh] overflow-y-auto">
                <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {viewMode === "create" ? `Create ${modelName}` : `Update ${modelName}`}
                    </h2>
                    <button
                        onClick={() => setViewMode(null)}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form>

                </form>
            </div>
       </div> 
    )
} 

// const labe