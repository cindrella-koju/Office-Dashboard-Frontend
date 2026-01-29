import { useEffect, useState,type Dispatch,type SetStateAction } from "react";

export interface FilterOption {
  id: string;
  name: string;
}

interface FilterProps<T> {
  urlFunction: (id: string) => string;
  filters: FilterOption[];
  label: string;
  defaultVal: FilterOption;
  setSelectVal: Dispatch<SetStateAction<T>>;
  onSelectFilter?: (filter: FilterOption) => void; // Add onSelectFilter prop
}

export default function Filters<T>({
  defaultVal,
  urlFunction,
  filters,
  label,
  setSelectVal,
  onSelectFilter, // Destructure onSelectFilter prop
}: FilterProps<T>) {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(defaultVal);

  console.log("Default val:",defaultVal)
  console.log("Filters:", filters)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlFunction(selectedFilter.id));
        const data = await response.json();
        setSelectVal(data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();
  }, [selectedFilter, urlFunction, setSelectVal]);

  const handleClick = (filter: FilterOption) => {
    setSelectedFilter(filter);
    if (onSelectFilter) onSelectFilter(filter); // Call onSelectFilter if provided
  };

  return (
<div className="space-y-4">
  <p className="font-bold text-xl sm:text-2xl text-gray-800">{label}</p>
  <div className="flex gap-3 sm:gap-4 flex-wrap">
    {filters.map((filter) => (
      <button
        key={filter.id}
        onClick={() => handleClick(filter)}
        className={`
          px-5 py-2 rounded-lg font-semibold text-xs sm:text-sm
          transition-all duration-300 ease-in-out
          ${selectedFilter.id === filter.id
            ? "bg-indigo-600 text-white shadow-md transform scale-105"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"}
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
          hover:cursor-pointer
        `}
      >
        {filter.name}
      </button>
    ))}
  </div>
</div>

  );
}