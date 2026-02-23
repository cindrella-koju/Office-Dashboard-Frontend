import { useState, type Dispatch, type SetStateAction } from "react";
import type { StatusProps } from "../hooks/event/useEvent";

export interface FilterOption {
  id: string;
  name: string;
}


interface FilterProps{
  allUrl?: string;
  filters: FilterOption[];
  label: string;
  defaultVal: FilterOption;
  onSelectFilter?: (filter: FilterOption) => void;
  setStatus : Dispatch<SetStateAction<StatusProps | null>>,
  setCurrentPage? : Dispatch<SetStateAction<number>>;
}

export default function Filters({
  defaultVal,
  allUrl,
  filters,
  label,
  onSelectFilter,
  setStatus,
  setCurrentPage,
}: FilterProps) {
  const ALL_FILTER: FilterOption = { id: "all", name: "All" };

  const initialFilter = allUrl ? ALL_FILTER : defaultVal;

  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(initialFilter);

  const handleClick = (filter: FilterOption) => {
    setSelectedFilter(filter);
    setStatus(filter)
    setCurrentPage && setCurrentPage(1); // Reset to first page when filter changes
    onSelectFilter?.(filter);
  };

  const filtersToRender = allUrl ? [ALL_FILTER, ...filters] : filters;

  return (
    <div className="space-y-4">
      <p className="font-bold text-xl sm:text-2xl text-gray-800">{label}</p>
      <div className="flex gap-3 sm:gap-4 flex-wrap">
        {filtersToRender.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleClick(filter)}
            className={`
              px-5 py-2 rounded-lg font-semibold text-xs sm:text-sm
              transition-all duration-300 ease-in-out
              ${
                selectedFilter.id === filter.id
                  ? "bg-indigo-600 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            `}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
}
