import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Join from "../pages/Join/Join";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/join',
                element: <Join></Join>
            },
            {
                path:'/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            }
           
        ]

    }
])