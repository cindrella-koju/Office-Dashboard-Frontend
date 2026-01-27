import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import EventPage from "./pages/event/event";
import ScoreBoard from "./pages/event/scoreboard/scoreboard";
import DetailEvent from "./pages/event/eacheventdetail/detailEvent";
import UserPage from "./pages/users/user";
import GroupPage from "./pages/event/eventdetailpages/group/group";
import Tiesheet from "./pages/event/eventdetailpages/tiesheet/tiesheet";
import Rounds from "./pages/event/eventdetailpages/rounds/rounds";
import Participants from "./pages/event/eventdetailpages/participants/participants";
import Qualifier from "./pages/event/eventdetailpages/qualifier/qualifier";
import OverallPoints from "./pages/event/eventdetailpages/overallpoints/overallpoints";
import StandingColumn from "./pages/event/eventdetailpages/standingcolumn/standingcolumn";

export const router = createBrowserRouter([
    {
        path : "/home",
        element : <Home/>
    },
    {
        path : "/login",
        element : <LoginPage />
    },
    {
        path : "/navbar",
        element : <NavBar />
    },
    {
        path : "/event",
        element : <EventPage />
    },
    {
        path : "/user",
        element : <UserPage/>
    },
    {
        path : "/profile",
        element: <ProfilePage/>
    },
    {
        path : "/scoreboard",
        element : <ScoreBoard/>
    },
    {
        path : "event/detail",
        element : <DetailEvent/>
    },
    {
        path : "/event/groups",
        element : <GroupPage/>
    },
    {
        path : "/event/tiesheet",
        element : <Tiesheet/>
    },
    {
        path : "/event/rounds",
        element : <Rounds/>
    },
    {
        path : "/event/participants",
        element : <Participants/>
    },
    {
        path : "/event/qualifier",
        element : <Qualifier/>
    },
    {
        path : "/event/overallpoint",
        element: <OverallPoints/>
    },
    {
        path : "/event/column",
        element : <StandingColumn/>
    }
])

