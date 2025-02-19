import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <img
              src="https://cdn.pixabay.com/photo/2017/06/21/03/11/icon-2425861_1280.png"
              className="h-16"
              alt="Quiz Soft Logo"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Quiz Soft
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Navigation Links */}
          <div
            className={`absolute md:static top-16 left-0 w-full bg-white md:bg-transparent dark:bg-gray-900 md:dark:bg-transparent shadow-md md:shadow-none transition-transform transform md:translate-x-0 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:flex md:items-center md:space-x-8 md:w-auto p-4 md:p-0`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-6">
              <li>
                <Link
                  to={"/history"}
                  className="block py-2 px-4 text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition"
                >
                  History
                </Link>
              </li>
              <li>
                <button
                  disabled
                  href=""
                  className="block py-2 px-4 text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 disabled:cursor-not-allowed transition"
                >
                  About
                </button>
              </li>
              <li>
                <button
                disabled
                  href=""
                  className="block py-2 px-4 text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition disabled:cursor-not-allowed"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
