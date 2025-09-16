import React, { use } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import { Authcontext } from "../../Context/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = use(Authcontext);
  const { theme, toggleTheme } = use(Authcontext);
  const Icon = theme === "light" ? FaMoon : FaSun;

  const handleLogout = () => {
    logout();
  };

  const links = (
    <>
      {["/", "/alldonation", "/dashboard", "/aboutus", "/donate"].map(
        (path, i) => {
          const names = [
            "Home",
            "All Donations",
            "Dashboard",
            "About us",
            "Donation",
          ];
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-[#435cd1] underline font-semibold"
                  : "text-[#0c0e18] hover:text-[#435cd1] dark:text-gray-200 dark:hover:text-[#8c9eee] font-semibold"
              }
            >
              {names[i]}
            </NavLink>
          );
        }
      )}
    </>
  );

  return (
    <div
      className="sticky top-0 z-50 navbar px-6
      bg-[#7c7cda] text-[#0c0e18] 
      dark:bg-[#1a1f3c]/95 dark:text-gray-100 
      backdrop-blur-md shadow-sm transition-colors duration-300"
    >
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content 
              bg-[#f1f3fa] dark:bg-[#1a1f3c] 
              gap-2 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="hidden md:block">
          <Logo />
        </div>
      </div>

      {/* Center Links */}
      <div className="navbar-center hidden lg:flex lg:justify-evenly">
        <ul className="menu gap-2 menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end">
        <button
          onClick={toggleTheme}
          className="cursor-pointer bg-sky-500 dark:bg-sky-400 
                p-2 rounded-full text-[#0c0e18] dark:text-yellow-400 
                hover:bg-[#4d6bf4] dark:hover:bg-[#8c9eee] transition-colors mr-2"
        >
          <Icon size={22} />
        </button>
        {user ? (
          <div className="group flex items-center gap-3">
            {/* Theme Toggle */}

            {/* Avatar */}
            <div
              className="tooltip tooltip-bottom"
              data-tip={user?.displayName}
            >
              <img
                src={user?.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-[#435cd1]"
              />
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="btn bg-sky-500 hover:bg-[#4d6bf4] text-white border-none"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn bg-sky-500 hover:bg-[#4d6bf4] text-white border-none">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
