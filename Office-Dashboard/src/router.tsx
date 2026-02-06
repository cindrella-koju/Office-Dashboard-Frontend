import { createBrowserRouter } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import EventPage from "./pages/event/event";
import ScoreBoard from "./pages/event/scoreboard/scoreboard";
import DetailEvent from "./pages/event/eacheventdetail/detailEvent";
import UserPage from "./pages/users/user";
import GroupPage from "./pages/event/eventdetailpages/group";
import Rounds from "./pages/event/eventdetailpages/rounds";
import Participants from "./pages/event/eventdetailpages/participants";
import Qualifier from "./pages/event/eventdetailpages/qualifier";
import StandingColumn from "./pages/event/eventdetailpages/standingcolumn";
import Tiesheet from "./pages/event/eventdetailpages/tiesheet";
import OverallPoints from "./pages/event/eventdetailpages/overallpoints";
import TodayGame from "./pages/event/eventdetailpages/todaygame";
import ProtectedRoute from "./routes/ProtectedRoute";
import RolePage from "./pages/RolePage";
import SignupPage from "./pages/SignUpPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/navbar", element: <NavBar /> },
  { path: "/signup", element: <SignupPage /> },

  { 
    path: "/home",
    element: (
      <ProtectedRoute accessKey="home_page">
        <Home />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event",
    element: (
      <ProtectedRoute accessKey="event_page">
        <EventPage />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/scoreboard",
    element: (
      <ProtectedRoute accessKey="event_page">
        <ScoreBoard />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/detail",
    element: (
      <ProtectedRoute accessKey="event_page">
        <DetailEvent />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/groups",
    element: (
      <ProtectedRoute accessKey="group_page">
        <GroupPage />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/tiesheet",
    element: (
      <ProtectedRoute accessKey="tiesheet_page">
        <Tiesheet />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/rounds",
    element: (
      <ProtectedRoute accessKey="round_config_page">
        <Rounds />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/participants",
    element: (
      <ProtectedRoute accessKey="participants_page">
        <Participants />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/qualifier",
    element: (
      <ProtectedRoute accessKey="qualifier_page">
        <Qualifier />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/standing-column",
    element: (
      <ProtectedRoute accessKey="column_config_page">
        <StandingColumn />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/overall-points",
    element: (
      <ProtectedRoute accessKey="group_stage_standing_page">
        <OverallPoints />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/event/todays-game",
    element: (
      <ProtectedRoute accessKey="todays_game_page">
        <TodayGame />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/profile",
    element: (
      <ProtectedRoute accessKey="profile_page">
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/user",
    element: (
      <ProtectedRoute accessKey="user_page">
        <UserPage />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/role",
    element: (
      <ProtectedRoute accessKey="role_page">
        <RolePage />
      </ProtectedRoute>
    ),
  },
]);
