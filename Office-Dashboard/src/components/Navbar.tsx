import { FaHome, FaTrophy, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { GiHumanPyramid } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import Sidebar from "./layout/Sidebar";
import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import TeslatechLogo from "../assets/logo tt sqaure.png";

const logoConfig = {
  src: TeslatechLogo,
  alt: "Teslatech Logo",
  title: "Teslatech",
};

export default function NavBar() {
  const role = useContext(RoleContext)
  const pageaccess = role?.roleaccesspage;

  // Build nav items dynamically
  const navItems = [];

  
  if (pageaccess?.home_page) {
    navItems.push({ icon: <FaHome />, label: "Home", to: "/home" });
  }
  if(pageaccess?.user_page){
    navItems.push({ icon: <FaUsers />, label: "Users", to: "/user" })
  }
  if(pageaccess?.event_page){
    navItems.push({ icon: <FaTrophy />, label: "Event", to: "/event" })
  }
  if(pageaccess?.profile_page){
    navItems.push({ icon: <CgProfile />, label: "Profile", to: "/profile" })
  }
  if(pageaccess?.role_page){
    navItems.push({ icon: <GiHumanPyramid />, label: "Role", to: "/role" })
  }
  navItems.push(
    { icon: <FaSignOutAlt />, label: "Logout", to: "/logout", danger: true }
  );

  return <Sidebar items={navItems} logo={logoConfig} />;
}
