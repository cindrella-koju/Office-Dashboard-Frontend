import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import User from "./pages/Users";
import ProfilePage from "./pages/ProfilePage";
import EventPage from "./pages/event/event";

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
        element : <User />
    },
    {
        path : "/profile",
        element: <ProfilePage/>
    }
])

