import React from "react";
import { Link, Outlet } from "react-router";
import {
  FaClipboardList,
  FaDonate,
  FaHandHoldingHeart,
  FaHome,
  FaListAlt,
  FaPlusCircle,
  FaStar,
  FaUserCircle,
  FaUserCog,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import Logo from "../Shared/Logo/Logo";
import UseUserRole from "../Hooks/UseUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = UseUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        <div className="navbar  w-full lg:hidden">
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
                className="inline-block h-6 w-6 stroke-current"
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

          <div className="mx-2 lg:hidden flex-1 px-2">Dashboard</div>
        </div>
        <Outlet></Outlet>
      </div>

      <div className="drawer-side bg-gray-200">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu  text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Logo></Logo>
          <Link to={"/"} className="flex items-center gap-2">
            <FaHome />
            <p>Home</p>
          </Link>

          {/* Restaurant Route  */}
          {!roleLoading && role === "restaurant" && (
            <>
              <Link
                to="/dashboard/restaurantprofile"
                className="flex items-center gap-2"
              >
                <FaUserCircle /> <p>Profile</p>
              </Link>

              <Link
                to="/dashboard/adddonation"
                className="flex items-center gap-2"
              >
                <FaPlusCircle /> <p>Add Donation</p>
              </Link>

              <Link
                to="/dashboard/mydonation"
                className="flex items-center gap-2"
              >
                <FaListAlt /> <p>My Donation</p>
              </Link>

              <Link
                to="/dashboard/requestdonation"
                className="flex items-center gap-2"
              >
                <FaHandHoldingHeart /> <p>Request Donation</p>
              </Link>
            </>
          )}

          {/* Admin links  */}
          {!roleLoading && role === "admin" && (
            <>
              <Link
                to="/dashboard/adminprofile"
                className="flex items-center gap-2"
              >
                <FaUserShield /> <p>Admin Profile</p>
              </Link>

              <Link
                to="/dashboard/managedonations"
                className="flex items-center gap-2"
              >
                <FaDonate /> <p>Manage Donations</p>
              </Link>

              <Link
                to="/dashboard/manageusers"
                className="flex items-center gap-2"
              >
                <FaUsers /> <p>Manage Users</p>
              </Link>

              <Link
                to="/dashboard/managerolerequests"
                className="flex items-center gap-2"
              >
                <FaUserCog /> <p>Manage Role Requests</p>
              </Link>

              <Link
                to="/dashboard/managerequests"
                className="flex items-center gap-2"
              >
                <FaClipboardList /> <p>Manage Requests</p>
              </Link>

              <Link
                to="/dashboard/featureddonations"
                className="flex items-center gap-2"
              >
                <FaStar /> <p>Feature Donations</p>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
