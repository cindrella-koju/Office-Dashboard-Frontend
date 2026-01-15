import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import EventPage from "./pages/event/event";
import ScoreBoard from "./pages/event/scoreboard/scoreboard";
import DetailEvent from "./pages/event/eacheventdetail/detailEvent";
import UserPage from "./pages/users/user";
import UsersList from "./components/checkFetch";
import Groups from "./pages/event/eventdetailpages/groups";
import Tiesheet from "./pages/event/eventdetailpages/tiesheet";
import CreateGroupForm from "./pages/event/eventdetailpages/groupCheck";

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
        path : "/check",
        element : <UsersList/>
    },
    {
        path : "/event/groups",
        element : <Groups/>
    },
    {
        path : "/event/tiesheet",
        element : <Tiesheet/>
    },{
        path : "/checking",
        element : <CreateGroupForm/>
    }
])

