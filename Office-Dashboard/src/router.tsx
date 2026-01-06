import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/Navbar";
import EventPage from "./pages/Event";

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
    }
])

