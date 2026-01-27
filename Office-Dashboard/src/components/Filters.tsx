import type React from "react";

interface FilterComponentProps<T extends string> {
  filters: T[];
  filter: T;
  setFilter?: React.Dispatch<React.SetStateAction<T>>;
  label?: string;
}

/**
 * Reusable filter component with button group
 */
export default function FilterComponent<T extends string>({
  filters,
  filter,
  setFilter,
  label = "Filters",
}: FilterComponentProps<T>) {
  return (
    <div className="space-y-3">
      <h2 className="font-bold text-xl sm:text-2xl text-gray-800">{label}</h2>
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {filters.map((filterOption) => (
          <button
            key={filterOption}
            // onClick={() => setFilter(filterOption)}
            className={`
              px-4 sm:px-5 py-2 rounded-lg font-semibold text-xs sm:text-sm
              transition-all duration-200
              ${filter === filterOption
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {filterOption}
          </button>
        ))}
      </div>
    </div>
  );
}