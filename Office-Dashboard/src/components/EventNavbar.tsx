import { FaTrophy, FaCalendarDay, FaChartBar, FaCampground } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdGroups, MdLeaderboard, MdOutlineSportsScore } from "react-icons/md";
import Sidebar from "./layout/Sidebar";
import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { useLocation } from "react-router-dom";
import { EventRoleContext } from "../context/EventRoleContext";
import { GLOBAL_ROLE } from "../constants/showpage";
import { RiAdminFill } from "react-icons/ri";

const logoConfig = {
  alt: "Teslatech Logo",
  title: "Teslatech",
};

export default function EventNavBar() {
  const location = useLocation();

  // Decide which context to use based on the URL
  const isEventRoute = location.pathname.startsWith("/event/");
  const role = isEventRoute && !["admin", "superadmin"].includes(GLOBAL_ROLE)
      ? useContext(EventRoleContext)
      : useContext(RoleContext);
  const pageaccess = role?.roleaccesspage

  const eventNavItems = []

  if(pageaccess?.group_page){
    eventNavItems.push({ icon: <MdGroups />, label: "Groups", to: "/event/groups" })
  }
  if(pageaccess?.round_config_page){
    eventNavItems.push({ icon: <FaCampground />, label: "Rounds", to: "/event/rounds" })
  }
  if(pageaccess?.tiesheet_page){
    eventNavItems.push({ icon: <FaTrophy />, label: "Tiesheet", to: "/event/tiesheet" })
  }
  if(pageaccess?.qualifier_page){
    eventNavItems.push({ icon: <MdLeaderboard />, label: "Qualifier", to: "/event/qualifier" })
  }
  if(pageaccess?.participants_page){
    eventNavItems.push({ icon: <CgProfile />, label: "Participants", to: "/event/participants" })
  }
  if(pageaccess?.column_config_page){
    eventNavItems.push({ icon: <FaChartBar />, label: "Configure Column", to: "/event/standing-column" })
  }
  if(pageaccess?.event_role_page){
    eventNavItems.push({ icon: <RiAdminFill />, label: "Event Role", to: "/event/role" })
  }
  if(pageaccess?.group_stage_standing_page){
    eventNavItems.push({ icon: <MdOutlineSportsScore />, label: "Group Stage Standing", to: "/event/overall-points" })
  }
  if(pageaccess?.todays_game_page){
    eventNavItems.push({ icon: <FaCalendarDay />, label: "Todays Game", to: "/event/todays-game" })
  }
  eventNavItems.push({ icon: <FaTrophy />, label: "Events", to: "/event" })
  
  return <Sidebar items={eventNavItems} logo={logoConfig} />;
}