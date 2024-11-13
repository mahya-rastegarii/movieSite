import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ShowList from "./pages/Movie/ShowList";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Dashboard from "./pages/User/Dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import MovieSiteContainer from "./pages/MovieSiteContainer";
import Movie from "./pages/Movie/Movie";

const router = createBrowserRouter([
    {
      element: <MovieSiteContainer/>,
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
      path: "dashboard",
      element: <Dashboard/>
    },

    {
      path: "*",

      element: <NotFound/>
    },
      ]
  }
])

export default router;