// pages/login.tsx
"use client";

import Head from "next/head";
import Header from "../components/Header";
import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./plant-log.module.css"; // Make sure to create a Login.module.css or reuse Signup.module.css

export default function PlantLog() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Log your plants!</title>
          <meta name="description" content="Log in to your account" />
        </Head>
        <h1>Log your plants!</h1>
      </div>
    </>
  );
}
