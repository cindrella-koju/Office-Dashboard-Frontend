import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export interface FilterOption {
  id: string;
  name: string;
}


interface FilterProps<T> {
  urlFunction?: (id: string) => string;
  allUrl?: string;
  twoIdUrlFunction?: (eventId: string, roundId: string) => string;
  filters: FilterOption[];
  label: string;
  defaultVal: FilterOption;
  setSelectVal: Dispatch<SetStateAction<T>>;
  onSelectFilter?: (filter: FilterOption) => void;
}

export default function Filters<T>({
  defaultVal,
  urlFunction,
  allUrl,
  twoIdUrlFunction,
  filters,
  label,
  setSelectVal,
  onSelectFilter,
}: FilterProps<T>) {
  const ALL_FILTER: FilterOption = { id: "all", name: "All" };

  const initialFilter = allUrl ? ALL_FILTER : defaultVal;

  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(initialFilter);
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    setEventId(localStorage.getItem("eventID"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url: string | undefined;

        if (selectedFilter.id === "all" && allUrl) {
          url = allUrl;
        } else if (urlFunction) {
          url = urlFunction(selectedFilter.id);
        } else if (twoIdUrlFunction && eventId) {
          url = twoIdUrlFunction(eventId, selectedFilter.id);
        }

        if (!url) return;

        const response = await fetch(url);
        const data = await response.json();
        setSelectVal(data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();
  }, [selectedFilter, urlFunction, allUrl, twoIdUrlFunction, eventId, setSelectVal]);

  const handleClick = (filter: FilterOption) => {
    setSelectedFilter(filter);
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
