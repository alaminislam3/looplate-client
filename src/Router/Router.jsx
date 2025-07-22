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
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import ManageDonation from "../Pages/Dashboard/Admin/ManageDonation";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageRoleRequests from "../Pages/Dashboard/Admin/ManageRoleRequests";
import ManageRequests from "../Pages/Dashboard/Admin/ManageRequests";
import FeatureDonations from "../Pages/Dashboard/Admin/FeatureDonations";
import UserProfile from "../Pages/Dashboard/User/UserProfile";
import RequestCharityRole from "../Pages/Dashboard/User/RequestCharityRole";
import Favorites from "../Pages/Dashboard/User/Favorites";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import TransactionHistory from "../Pages/Dashboard/User/TransactionHistory";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";

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
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: '/donation-details/:id' , Component: DonationDetails
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute>  <DashboardLayout></DashboardLayout>  </PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
        
      },
      // Restaurant
       {
        path: '/dashboard/restaurantprofile' , Component: RestaurantProfile
      },
      {
        path: "/dashboard/adddonation",
        Component: AddDonation,
      },
      {
        path: "/dashboard/mydonation",
        Component: MyDonation,
      },
      {
        path: "/dashboard/requestdonation",
        Component: RequestDonation,
      },
      {
        path: "/dashboard/update/:id",
        Component: UpdateDonation,
      },
      /* admin route  */
      {
        path: "adminprofile",
        element: <AdminProfile />,
      },
      {
        path: "managedonations",
        element: <ManageDonation />,
      },
      {
        path: "manageusers",
        element: <ManageUsers />,
      },
      {
        path: "managerolerequests",
        element: <ManageRoleRequests />,
      },
      {
        path: "managerequests",
        element: <ManageRequests />,
      },
      {
        path: "featureddonations",
        element: <FeatureDonations />,
      },
      // user role 
      {
        path: "myprofile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "requestcharity",
        element: <RequestCharityRole></RequestCharityRole>,
      },
      {
        path: "favorites",
        element: <Favorites></Favorites>,
      },
      {
        path: "myreviews",
        element: <MyReviews />,
      },
      {
        path: "transactions",
        element: <TransactionHistory />,
      },
      
    ],
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
