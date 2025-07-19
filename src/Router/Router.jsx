import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import AllDonation from "../Pages/AllDonation/AllDonation";
import DashboardLayout from "../Layout/DashboardLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/alldonation",
        Component: AllDonation,
      },
      {
        path: '/login' , Component: Login
      },
      {
        path: '/register' , Component: Register
      }
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
