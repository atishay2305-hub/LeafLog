import { login_user } from "../../../Backend/services/index";
import Head from "next/head";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Router from "next/router";
import Link from "next/link";
import "../styles/global.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login_user(formData);
    if (res.success) {
      toast.success(res.message);
      Cookies.set("token", res.token);
      setTimeout(() => {
        Router.push("/LandingPage");
      }, 1000);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login | LeafLog</title>
        <meta name="description" content="Login to LeafLog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="top-level bg-green-300 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl p-10 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-6xl font-bold text-green-600 mb-8">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
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
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                required=""
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-16 text-lg rounded-lg font-medium transition duration-300"
            >
              Sign in
            </button>
            <p className="text-lg font-light text-gray-600">
              Don’t have an account yet?
              <Link href="/register" legacyBehavior>
                <a className="font-medium text-green-600 hover:underline">
                  {" "}
                  Sign up
                </a>
              </Link>
            </p>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
