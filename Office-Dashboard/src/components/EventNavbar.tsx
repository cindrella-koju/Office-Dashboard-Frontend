import { FaHome, FaTrophy, FaUsers, FaCalendarDay, FaPlay, FaChartBar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdGroups, MdLeaderboard, MdOutlineSportsScore } from "react-icons/md";
import Sidebar from "./layout/SideBar";


const eventNavItems = [
  { icon: <MdGroups />, label: "Groups", to: "/event/groups" },
  { icon: <FaUsers />, label: "Rounds", to: "/event/rounds" },
  { icon: <FaTrophy />, label: "Tiesheet", to: "/event/tiesheet" },
  { icon: <MdLeaderboard />, label: "Qualifier", to: "/event/qualifier" },
  { icon: <CgProfile />, label: "Participants", to: "/event/participants" },
  { icon: <FaChartBar />, label: "Standing Column", to: "/event/standing-column" },
  { icon: <MdOutlineSportsScore />, label: "Overall Points", to: "/event/overall-points" },
  { icon: <FaCalendarDay />, label: "Todays Game", to: "/event/todays-game" },
  { icon: <FaPlay />, label: "Ongoing Game", to: "/event/ongoing-game" },
  { icon: <FaHome />, label: "Score Board", to: "/event/score-board" },
];

const logoConfig = {
  alt: "Teslatech Logo",
  title: "Teslatech",
};

export default function EventNavBar() {
  return <Sidebar items={eventNavItems} logo={logoConfig} />;
}