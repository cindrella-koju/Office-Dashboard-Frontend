import { FaHome, FaTrophy, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Sidebar from "./layout/SideBar";


const navItems = [
  { icon: <FaHome />, label: "Home", to: "/home" },
  { icon: <FaTrophy />, label: "Event", to: "/event" },
  { icon: <FaUsers />, label: "Users", to: "/user" },
  { icon: <CgProfile />, label: "Profile", to: "/profile" },
  { icon: <FaSignOutAlt />, label: "Logout", to: "/logout", danger: true },
];

const logoConfig = {
  // src: teslaTechLogo,
  alt: "Teslatech Logo",
  title: "Teslatech",
};

export default function NavBar() {
  return <Sidebar items={navItems} logo={logoConfig} />;
}