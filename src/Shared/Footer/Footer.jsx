import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "../Logo/Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#7c7cda] dark:bg-[#1a1f3c] text-[#0c0e18] dark:text-gray-200 px-6 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1: Logo */}
        <div>
          <Logo />
          <p className="mt-3 text-sm text-gray-800 dark:text-gray-400">
            Looplate – Reduce food waste, spread goodness.
          </p>
        </div>

        {/* Column 2: About */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white dark:text-[#8c9eee]">
            About
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to={"/aboutus"}
                className="hover:text-[#435cd1] dark:hover:text-[#4d6bf4] transition-colors"
              >
                Our Mission
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white dark:text-[#8c9eee]">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:alamin.islam.dev2@gmail.com"
                className="hover:text-[#435cd1] dark:hover:text-[#4d6bf4] transition-colors"
              >
                Email Support
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#435cd1] dark:hover:text-[#4d6bf4] transition-colors"
              >
                Facebook Page
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="hover:text-[#435cd1] dark:hover:text-[#4d6bf4] transition-colors"
              >
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white dark:text-[#8c9eee]">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-xl text-gray-700 dark:text-gray-300">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#435cd1] dark:hover:text-[#4d6bf4]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-6 border-t border-white/30 dark:border-gray-600 text-center text-sm text-gray-700 dark:text-gray-400">
        © {new Date().getFullYear()} Looplate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
