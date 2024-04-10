import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register_user } from "../../../Backend/services/index";
import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import "../styles/global.css"; // Ensure this path is correct

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      Router.push("/LandingPage");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register_user(formData);
    if (res.success) {
      toast.success(res.message);
      Router.push("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Head>
        <title>Register | LeafLog</title>
        <meta name="description" content="Register for LeafLog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="top-level bg-green-300 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl p-10 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-6xl font-bold text-green-600 mb-8">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-left">
              <label
                htmlFor="name"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                Your Name
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="John Doe"
                required=""
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="email"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="password"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                Password
              </label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="••••••••"
                required=""
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-16 text-lg rounded-lg font-medium transition duration-300"
            >
              Sign up
            </button>
            <p className="text-lg font-light text-gray-600">
              Already have an account?
              <Link href="/login" legacyBehavior>
                <a className="font-medium text-green-600 hover:underline">
                  {" "}
                  Sign in
                </a>
              </Link>
            </p>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Register;
