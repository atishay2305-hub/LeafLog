import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import Router from "next/router";
import "../styles/global.css";
import defaultProfilePicture from "../../public/uploads/default.jpg";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", profilePicture: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      Router.push("/login");
    } else {
      try {
        const decodedToken = decodeToken(token);
        setUser(decodedToken);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
  }, []);

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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // Check if the file is an image or a PNG file
    if (!file.type.startsWith("image/") && !file.type.includes("png")) {
      alert("Please upload an image file.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/upload", {
        method: "POST",
        body: formData,
      });

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        setUser({ ...user, profilePicture: data.filename });
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>User Profile | LeafLog</title>
        <meta name="description" content="User Profile" />
      </Head>
      <Header />
      <div className="top-level bg-green-200 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
          <div className="text-center">
            <label htmlFor="profile-picture">
              <img
                src={user.profilePicture || defaultProfilePicture.src}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full mx-auto mb-4 cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="profile-picture"
              accept="image/png,image/jpeg"
              onChange={handleFileUpload}
              className="hidden"
            />
            <h2 className="text-xl font-bold mb-2">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="mt-6 flex flex-col space-y-4">
            <button
              onClick={() => Router.push("/my-plants")}
              className="bg-green-600 hover:bg-green-800 text-white font-semibold py-4 px-4 rounded-lg"
            >
              My Plants
            </button>
            <button
              onClick={() => Router.push("/notifications")}
              className="bg-green-600 hover:bg-green-800 text-white font-semibold py-4 px-4 rounded-lg"
            >
              Notifications
            </button>
            <button
              onClick={() => Router.push("/FeedbackForm")}
              className="bg-green-600 hover:bg-green-800 text-white font-semibold py-4 px-4 rounded-lg"
            >
              Send Feedback
            </button>
            <button
              onClick={() => Router.push("/tos")}
              className="bg-green-600 hover:bg-green-800 text-white font-semibold py-4 px-4 rounded-lg"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
