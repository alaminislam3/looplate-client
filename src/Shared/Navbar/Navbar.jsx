import React, { use } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import { Authcontext } from "../../Context/AuthContext";


const Navbar = () => {
  const { user, logout  } = use(Authcontext);
  
  const handleLogout = () => {
    logout();
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-sky-600 underline font-semibold"
            : "text-gray-600 hover:text-sky-600 font-semibold"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/alldonation"
        className={({ isActive }) =>
          isActive
            ? "text-sky-600 underline font-semibold"
            : "text-gray-600 hover:text-sky-600 font-semibold"
        }
      >
        All Donations
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "text-sky-600 underline font-semibold"
            : "text-gray-600 hover:text-sky-600 font-semibold"
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/aboutus"
        className={({ isActive }) =>
          isActive
            ? "text-sky-600 underline font-semibold"
            : "text-gray-600 hover:text-sky-600 font-semibold"
        }
      >
        About us 
      </NavLink>
      <NavLink
        to="/donate"
        className={({ isActive }) =>
          isActive
            ? "text-sky-600 underline font-semibold"
            : "text-gray-600 hover:text-sky-600 font-semibold"
        }
      >
        Donation
      </NavLink>
    </>
  );
  return (
    <div className=" sticky top-0 z-50  navbar bg-gray-200 text-gray-800 px-6 py-4 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          {<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 gap-2 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
       <div className="hidden md:block">
       <Logo></Logo>
       </div>
      </div>
      <div className="navbar-center   hidden lg:flex lg:justify-evenly">
        <ul className="menu gap-2 menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? 
            <div className="group flex items-center gap-3">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user?.displayName}
              >
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-green-400"
                />
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-primary hover:bg-sky-600"
              >
                Logout
              </button>
            </div>: (
          <Link to="/login">
            <button className="btn btn-primary text-black">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
