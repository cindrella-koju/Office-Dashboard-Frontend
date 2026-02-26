import { FaTrophy, FaCalendarDay, FaChartBar, FaCampground, FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdGroups, MdLeaderboard, MdOutlineSportsScore } from "react-icons/md";
import Sidebar from "./layout/Sidebar";
import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";
import { useLocation } from "react-router-dom";
import { EventRoleContext } from "../context/EventRoleContext";
import { RiAdminFill } from "react-icons/ri";
import TeslatechLogo from "../assets/logo tt sqaure.png";

const logoConfig = {
  src: TeslatechLogo,
  alt: "Teslatech Logo",
  title: "Teslatech",
};

export default function EventNavBar() {
  const location = useLocation();
  const userrole = localStorage.getItem("role")
  const eventId = localStorage.getItem("eventId")
  
  // Decide which context to use based on the URL
  const isEventRoute = location.pathname.startsWith("/event/");
  const role = isEventRoute && !["superadmin"].includes(userrole ? userrole : "member")
      ? useContext(EventRoleContext)
      : useContext(RoleContext);
  const pageaccess = role?.roleaccesspage

  const eventNavItems = []

  eventNavItems.push({ icon: <FaHome />, label: "Home", to: "/home" })
  if(pageaccess?.group_page){
    eventNavItems.push({ icon: <MdGroups />, label: "Groups", to: `/event/${eventId}/groups` })
  }
  if(pageaccess?.round_config_page){
    eventNavItems.push({ icon: <FaCampground />, label: "Rounds", to: `/event/${eventId}/rounds` })
  }
  if(pageaccess?.tiesheet_page){
    eventNavItems.push({ icon: <FaTrophy />, label: "Tiesheet", to: `/event/${eventId}/tiesheet` })
  }
  if(pageaccess?.qualifier_page){
    eventNavItems.push({ icon: <MdLeaderboard />, label: "Qualifier", to: `/event/${eventId}/qualifier` })
  }
  if(pageaccess?.participants_page){
    eventNavItems.push({ icon: <CgProfile />, label: "Participants", to: `/event/${eventId}/participants` })
  }
  if(pageaccess?.column_config_page){
    eventNavItems.push({ icon: <FaChartBar />, label: "Configure Column", to: `/event/${eventId}/config-column` })
  }
  if(pageaccess?.event_role_page){
    eventNavItems.push({ icon: <RiAdminFill />, label: "Event Role", to: `/event/${eventId}/role` })
  }
  if(pageaccess?.group_stage_standing_page){
    eventNavItems.push({ icon: <MdOutlineSportsScore />, label: "Group Stage Standing", to: `/event/${eventId}/overall-points` })
  }
  if(pageaccess?.todays_game_page){
    eventNavItems.push({ icon: <FaCalendarDay />, label: "Todays Game", to: `/event/${eventId}/today?todays-game=true` })
  }

  
  return <Sidebar items={eventNavItems} logo={logoConfig} />;
}