import { FaHome, FaTrophy,FaUsers , FaSignOutAlt, FaBars } from "react-icons/fa";
import { useState } from "react";
// import teslaTechLogo from "../assets/teslatech.png";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const MOBILE_HEADER_HEIGHT = "56px";

export default function EventNavBar() {
  const [open, setOpen] = useState(false);
    return (
      <>
        <div className="md:hidden fixes top-0 left-0 right-0 z-50 flex items-center justify-between px-4 bg-[#1b0b3a] text-white"
        style={{ height: MOBILE_HEADER_HEIGHT }}>
          {/* <h1 className="text-lg font-bold">Admin</h1> */}
          <button onClick={() => setOpen(true)}>
            <FaBars size={22} />
          </button>
        </div>

        { open && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden"/>
        )}

        <aside
          className={`fixed md:static left-0 z-50 w-100 
          bg-gradient-to-b from-[#1b0b3a] to-[#12002b] 
          px-6 py-8 flex flex-col 
          transition-transform duration-300
          h-[calc(100vh-56px)] md:h-screen
          top-[56px] md:top-0
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="flex items-center gap-3 mb-10">
            <img
              // src={teslaTechLogo}
              alt="Teslatech Logo"
              className="h-20 w-20 object-contain"
            />
            <span className="text-2xl font-bold text-white">
              Teslatech
            </span>
          </div>

          <nav className="flex flex-col gap-10">
            <NavItem icon={<FaHome />} label="Groups" to="/event/groups" />
            <NavItem icon={<FaUsers />} label="Rounds" to="/event/rounds" />
            <NavItem icon={<FaTrophy />} label="Tiesheet" to="/event/tiesheet" />
            <NavItem icon={<CgProfile/>} label="Qualifier" to="/event/qualifier"/>
            <NavItem icon={<CgProfile/>} label="Participants" to="/event/qualifier"/>
            <NavItem icon={<FaSignOutAlt/>} label="Todays Game" to="/event/todays-game" />
            <NavItem icon={<FaSignOutAlt/>} label="Ongoing Game" to="/event/ongoing-game" />
            <NavItem icon={<FaSignOutAlt/>} label="Score Board" to="/event/score-board" />
          </nav>
        </aside>
      </>
    )
}

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to : string;
  danger?: boolean;

};

const NavItem = ({ icon, label, to, danger }: NavItemProps) => {
  return (
     <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl text-2xl font-medium transition-all cursor-pointer
        ${isActive ? "bg-[#382951] text-white" : "text-gray-300 hover:bg-[#382951] hover:text-white"}
        ${danger ? "hover:bg-red-600 hover:text-white" : ""}`
      }
    >
      <span className="text-2xl">{icon}</span>
      {label}
    </NavLink>
  )
};