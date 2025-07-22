import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Logo from "../Logo/Logo"; 

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 px-6 py-4 md:p-12">
      <div className=" mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1: Logo */}
        <div>
         
            <Logo />
       
          <p className="mt-2 text-sm text-gray-600">
            Looplate – Reduce food waste, spread goodness.
          </p>
        </div>

        {/* Column 2: About */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">About</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Our Mission</a></li>
            <li><a href="#" className="hover:text-blue-600">How It Works</a></li>
            <li><a href="#" className="hover:text-blue-600">Why Donate</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Email Support</a></li>
            <li><a href="#" className="hover:text-blue-600">Facebook Page</a></li>
            <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Follow Us</h3>
          <div className="flex space-x-4 text-xl text-gray-600">
            <a href="#" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-500"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-800"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-8 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Looplate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
