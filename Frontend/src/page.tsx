// pages/login.tsx
"use client";

import Head from "next/head";
import Header from "./components/Header";

export default function PlantLog() {
  return (
    <>
      <Header />
      <div>
        <Head>
          <title>Log your plants!</title>
          <meta name="description" content="Log in to your account" />
        </Head>
        <h1>Log your plants!</h1>
      </div>
    </>
  );
}
