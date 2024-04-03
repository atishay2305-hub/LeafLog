import Head from "next/head";
import Header from "./components/Header";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

export default function PlantLog() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
