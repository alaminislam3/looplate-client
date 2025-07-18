import React from "react";
import { Link } from "react-router";
import Logo from "../Logo/Logo";
// import UseAuth from "../../../Hooks/UseAuth";
/* Home, All Donations, Dashboard, and Login  */
const Navbar = () => {
//   const { user, logout } = UseAuth();
//   const handleLogout = () => {
//     logout();
//   };
  const links = (
    <>
      <Link to={"/"}>
        <p>Home</p>
      </Link>
      <Link to={"/alldonation"}>
        <p>All Donations</p>
      </Link>
      <Link to={"/dashboard"}>
        <p>Dashboard</p>
      </Link>
      
    

     
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          {/* <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div> */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 gap-2 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
       <Logo></Logo>
      </div>
      <div className="navbar-center   hidden lg:flex lg:justify-evenly">
        <ul className="menu gap-2 menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        
          {/* <button  className="btn btn-primary text-black">
            Logout
          </button> */}
     
          <Link to={"/login"}>
            <button className="btn btn-primary text-black">Login</button>
          </Link>
  
      </div>
    </div>
  );
};

export default Navbar;
