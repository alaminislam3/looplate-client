import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import AllDonation from "../Pages/AllDonation/AllDonation";
import DashboardLayout from "../Layout/DashboardLayout";

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
