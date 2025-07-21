import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AllDonation from "../Pages/AllDonation/AllDonation";
import DashboardLayout from "../Layout/DashboardLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import NotFound from "../Shared/NotFound/NotFound";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import RestaurantProfile from "../Pages/Dashboard/Restaurant/RestaurantProfile";
import AddDonation from "../Pages/Dashboard/Restaurant/AddDonation";
import MyDonation from "../Pages/Dashboard/Restaurant/MyDonation";
import RequestDonation from "../Pages/Dashboard/Restaurant/RequestDonation";
import PrivateRoute from "./PrivateRoute";
import Forbidden from "../Shared/Forbidden/Forbidden";
import UpdateDonation from "../Pages/Dashboard/Restaurant/UpdateDonation";


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
      },
      {
        path: '/forbidden' , Component: Forbidden
      }
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true, element: <PrivateRoute> <DashboardHome></DashboardHome> </PrivateRoute>
      },
      // Restaurant 
      {
        path: '/dashboard/restaurantprofile' , Component: RestaurantProfile
      },
      {
        path: '/dashboard/adddonation' , Component: AddDonation
      },
      {
        path: '/dashboard/mydonation' , Component: MyDonation
      },
      {
        path: '/dashboard/requestdonation' , Component: RequestDonation
      },
      {
        path: '/dashboard/update/id' , Component: UpdateDonation
      }
    ]
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
