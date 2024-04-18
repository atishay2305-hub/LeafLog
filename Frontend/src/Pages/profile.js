import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import Router from "next/router";
import "../styles/global.css";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // Check authentication status
    const token = Cookies.get("token");

    if (!token) {
      Router.push("/login");
    } else {
      try {
        // Decode the token to get user information
        const decodedToken = decodeToken(token);
        setUser(decodedToken);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  }, []);

  // Function to decode the JWT token
  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error state
  }

  return (
    <>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="User Profile" />
      </Head>
      <Header />
      <div className="top-level bg-green-200 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <div className="text-center">
            {/* Removed profile picture */}
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
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
                {user.email}
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
