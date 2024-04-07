import { useEffect } from 'react';
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./tos.module.css";
import Cookies from 'js-cookie';
import Router from 'next/router';

const Profile = () => {
  // Check authentication status
  const isAuthenticated = !!Cookies.get('token');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      Router.push('/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="User Profile" />
      </Head>
      <Header />
      <div className="bg-green-200 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-center">
            <img
              src="/profile-pic.jpg" // Replace with your actual profile picture URL
              alt="Profile Picture"
              className="rounded-full mx-auto w-24 h-24 mb-4"
            />
            <h2 className="text-xl font-bold mb-2">John Doe</h2>
            <p className="text-gray-600">Software Engineer</p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor orci eu nisi
              fermentum, ut varius tortor vestibulum. Donec sit amet viverra ex. Proin ut efficitur
              turpis, non interdum est.
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <ul>
              <li className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2-2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1H4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 100-2 1 1 0 000 2zM5 6a1 1 0 100-2 1 1 0 000 2zM5 8a1 1 0 100-2 1 1 0 000 2zM5 10a1 1 0 100-2 1 1 0 000 2zM5 12a1 1 0 100-2 1 1 0 000 2zM5 14a1 1 0 100-2 1 1 0 000 2zM5 16a1 1 0 100-2 1 1 0 000 2zM15 10a1 1 0 11-2 0 1 1 0 012 0zM15 12a1 1 0 11-2 0 1 1 0 012 0zM15 14a1 1 0 11-2 0 1 1 0 012 0z"
                    clipRule="evenodd"
                  />
                </svg>
                john.doe@example.com
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M9.707 13.707a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414zM5 7a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 100-2h2a1 1 0 100-2H5a1 1 0 100 2zm4-1a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                +1 123 456 7890
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
