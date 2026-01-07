interface FilterComponentProps {
    filters: string[];
    filter:  "Active" | "Completed" | "Draft" | "All" | "Admin" | "SuperAdmin" | "Member";
    setFilter: (filter: string) => void;
}

export default function FilterComponent({ filters, filter, setFilter }: FilterComponentProps) {
    return (
        <>
            <h1 className="font-bold text-2xl sm:text-2xl text-gray-800">Filters</h1>
            <div className="flex gap-3 flex-wrap">
                {filters.map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-5 py-2 rounded-lg font-semibold text-sm
                        ${filter === s ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                        {s}
                    </button>
                ))}
            </div>
        </>
    );
}
