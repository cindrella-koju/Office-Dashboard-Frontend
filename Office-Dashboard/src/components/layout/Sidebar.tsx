import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface NavItemConfig {
  icon: React.ReactNode;
  label: string;
  to: string;
  danger?: boolean;
}

interface SideBarProps {
  mobileHeaderHeight?: string;
  logo?: {
    src?: string;
    alt?: string;
    title?: string;
  };
  items: NavItemConfig[];
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  danger?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, to, danger, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl text-base sm:text-lg font-medium transition-all cursor-pointer
        ${
          isActive
            ? "bg-[#382951] text-white"
            : "text-gray-300 hover:bg-[#382951] hover:text-white"
        }
        ${danger ? "hover:bg-red-600 hover:text-white" : ""}`
      }
    >
      <span className="text-xl sm:text-2xl flex-shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default function Sidebar({
  mobileHeaderHeight = "56px",
  logo,
  items,
}: SideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 bg-[#1b0b3a] text-white"
        style={{ height: mobileHeaderHeight }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-[#382951] rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 sm:w-72 md:w-64 lg:w-72
          h-screen
          bg-gradient-to-b from-[#1b0b3a] to-[#12002b]
          px-4 sm:px-6 py-6 sm:py-8
          flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Close button (mobile) */}
        <button
          onClick={closeSidebar}
          className="md:hidden absolute top-4 right-4 p-2 text-gray-300 hover:text-white hover:bg-[#382951] rounded-lg transition-colors"
          aria-label="Close menu"
        >
          <FaTimes size={18} />
        </button>

        {/* Centered & Bigger Logo */}
        <div className="flex justify-center items-center mb-10 flex-shrink-0 mr-10">
          {logo?.src && (
            <img
              src={logo.src}
              alt={logo.alt || "Logo"}
              className="h-30 w-30 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 sm:gap-3 flex-1 overflow-y-auto">
          {items.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              to={item.to}
              danger={item.danger}
              onClick={closeSidebar}
            />
          ))}
        </nav>

        <div className="flex-shrink-0 h-6" />
      </aside>

      {/* Desktop Spacer */}
      <div className="hidden md:block w-64 lg:w-72 flex-shrink-0" />

      {/* Mobile Spacer */}
      <div
        className="md:hidden flex-shrink-0"
        style={{ height: mobileHeaderHeight }}
      />
    </>
  );
}