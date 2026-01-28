import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({ 
    value, 
    onChange, 
    placeholder = "Search..." 
}: SearchBarProps) {
    return (
        <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg 
                         focus:border-blue-500 focus:outline-none transition-colors
                         text-sm sm:text-base"
            />
        </div>
    );
}