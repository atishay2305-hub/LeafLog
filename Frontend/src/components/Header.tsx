import React from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token cookie
    Cookies.remove('token');
    // Redirect to the login page
    router.push('/login');
  };

  return (
    <header className="bg-green-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/LandingPage" className="text-white text-2xl font-bold">LeafLog</a>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <NavItem href="/LandingPage">Home</NavItem>
            <NavItem href="/plant-log">My Plants</NavItem>
            <NavItem href="/search">Discover Plants</NavItem>
            <NavItem href="/profile">Profile</NavItem>
            <NavItem href="/tos">Terms of Service</NavItem>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-200 transition duration-300"
                onClick={handleLogout}
              >
                Log Out
              </a>
            </li>
          </ul>
        </nav>
        <button className="md:hidden text-white">
          {/* Mobile menu button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

const NavItem = ({ href, children }) => {
  return (
    <li>
      <a href={href} className="text-white hover:text-gray-200 transition duration-300">
        {children}
      </a>
    </li>
  );
};

export default Header;
