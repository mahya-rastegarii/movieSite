import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ShowList from "./pages/Movie/ShowList";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Dashboard from "./pages/User/Dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import UnhandledException from "./pages/UnhandledException";
import MovieSiteContainer from "./pages/MovieSiteContainer";
import Movie from "./pages/Movie/Movie";
import Profile from "./pages/User/Dashboard/Profile";
import Comments from "./pages/User/Dashboard/Comments";
import FavoritesList from "./pages/User/Dashboard/FavoritesList";
import ForgotPassword from "./pages/User/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";

const router = createBrowserRouter([
    {
      element: <MovieSiteContainer/>,
      errorElement: <UnhandledException />,
      children: [

    {
      path: "/",
      element: <Home/>   
    } ,
  
    {
        path: "list/:type/:genre",
        element: <ShowList/>
    },
    {
      path: "movie/:name",
      element: <Movie/>
    },
    {
        path: "signIn",
        element: <Login/>
    },
    {
        path: "signUp",
        element: <Register/>
    },
    {
      path:"forgotPassword",
      element: <ForgotPassword/>
    },
    {
      path:"updatePassword",
      element: <UpdatePassword/>
    },

    {
      path: "dashboard",
      element: <Dashboard/>,
      children: [
           {
            path:"profile",
            element: <Profile/>,
            index: true
           },
           {
            path:"comments",
            element: <Comments/>
           },
           {
            path:"favoriteList",
            element: <FavoritesList/>
           },
      ]
    },

    {
      path: "*",

      element: <NotFound/>
    },
      ]
  }
])

export default router;