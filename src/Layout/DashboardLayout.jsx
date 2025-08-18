import React from "react";
import { Link, Outlet } from "react-router";
import {
  FaChartPie,
  FaClipboardList,
  FaCommentDots,
  FaDonate,
  FaGift,
  FaHandHoldingHeart,
  FaHeart,
  FaHome,
  FaListAlt,
  FaMoneyCheckAlt,
  FaPlusCircle,
  FaStar,
  FaUser,
  FaUserCircle,
  FaUserCog,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import Logo from "../Shared/Logo/Logo";
import UseUserRole from "../Hooks/UseUserRole";
import UseAuth from "../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";

const DashboardLayout = () => {
  const { role, roleLoading } = UseUserRole();
  const { loading } = UseAuth();
  if (loading || roleLoading) {
    return <Loading />;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content */}
        <div className="navbar w-full lg:hidden bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current text-[#0c0e18] dark:text-[#f1f3fa]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 lg:hidden flex-1 px-2 text-[#0c0e18] dark:text-[#f1f3fa]">
            Dashboard
          </div>
        </div>

        <Outlet />
      </div>

      <div className="drawer-side bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu min-h-full w-80 p-4 text-[#0c0e18] dark:text-[#f1f3fa]">
          <Logo />

          <Link to={"/"} className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]">
            <FaHome /> <p>Home</p>
          </Link>

          {/* Restaurant Links */}
          {!roleLoading && role === "restaurant" && (
            <>
              <Link
                to="/dashboard/restaurantprofile"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaUserCircle /> <p>Profile</p>
              </Link>
              <Link
                to="/dashboard/adddonation"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaPlusCircle /> <p>Add Donation</p>
              </Link>
              <Link
                to="/dashboard/mydonation"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaListAlt /> <p>My Donation</p>
              </Link>
              <Link
                to="/dashboard/requestdonation"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaHandHoldingHeart /> <p>Request Donation</p>
              </Link>
            </>
          )}

          {/* Admin Links */}
          {!roleLoading && role === "admin" && (
            <>
              <Link
                to="/dashboard/adminprofile"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaUserShield /> <p>Admin Profile</p>
              </Link>
              <Link
                to="/dashboard/adminoverview"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaChartPie /> <p>Overview</p>
              </Link>
              <Link
                to="/dashboard/managedonations"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaDonate /> <p>Manage Donations</p>
              </Link>
              <Link
                to="/dashboard/manageusers"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaUsers /> <p>Manage Users</p>
              </Link>
              <Link
                to="/dashboard/managerolerequests"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaUserCog /> <p>Manage Role Requests</p>
              </Link>
              <Link
                to="/dashboard/managerequests"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaClipboardList /> <p>Manage Requests</p>
              </Link>
              <Link
                to="/dashboard/featureddonations"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaStar /> <p>Feature Donations</p>
              </Link>
            </>
          )}

          {/* User Links */}
          {!roleLoading && role === "user" && (
            <>
              <Link
                to="/dashboard/myprofile"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaUser /> <p>My Profile</p>
              </Link>
              <Link
                to="/dashboard/overview"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaChartPie /> <p>Overview</p>
              </Link>
              <Link
                to="/dashboard/requestcharity"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaHandHoldingHeart /> <p>Request Charity Role</p>
              </Link>
              <Link
                to="/dashboard/favorites"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaHeart /> <p>Favorites</p>
              </Link>
              <Link
                to="/dashboard/myreviews"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaCommentDots /> <p>My Reviews</p>
              </Link>
              <Link
                to="/dashboard/transactions"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaMoneyCheckAlt /> <p>Transaction History</p>
              </Link>
            </>
          )}

          {/* Charity Links */}
          {!roleLoading && role === "charity" && (
            <>
              <Link
                to="/dashboard/charityprofile"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaUserCircle /> <p>Charity Profile</p>
              </Link>
              <Link
                to="/dashboard/myrequests"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaClipboardList /> <p>My Requests</p>
              </Link>
              <Link
                to="/dashboard/mypickups"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaHandHoldingHeart /> <p>My Pickups</p>
              </Link>
              <Link
                to="/dashboard/receiveddonations"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaGift /> <p>Received Donations</p>
              </Link>
              <Link
                to="/dashboard/charitytransaction"
                className="flex items-center gap-2 hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
              >
                <FaMoneyCheckAlt /> <p>Transaction History</p>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
