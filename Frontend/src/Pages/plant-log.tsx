// pages/plant-log.tsx

import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "./getting-started.module.css";
import React, { useState, FormEvent, useEffect } from "react"; // Import useState, FormEvent, and ChangeEvent
import Cookies from "js-cookie";
import Router from "next/router";
import "../styles/global.css";

interface SubmittedData {
  plantSpecies: string;
  petName: string;
  otherNotes: string;
}

interface PlantLogItem {
  label: string;
  placeholder: string;
  type: "text" | "textarea";
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

const PlantLogForm: React.FC<{ items: PlantLogItem[] }> = ({ items }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <form className="form">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col">
          <label htmlFor={item.label} className="label">
            {item.label}
          </label>
          {item.type === "text" && (
            <input
              type="text"
              id={item.label}
              name={item.label}
              value={item.value}
              onChange={
                item.onChange as React.ChangeEventHandler<HTMLInputElement>
              }
              className="input"
              placeholder={item.placeholder}
            />
          )}
          {item.type === "textarea" && (
            <textarea
              id={item.label}
              name={item.label}
              value={item.value}
              onChange={
                item.onChange as React.ChangeEventHandler<HTMLTextAreaElement>
              }
              className="input"
              placeholder={item.placeholder}
            />
          )}
        </div>
      ))}
      <br />
      <button type="submit" className="button">
        Submit Log Entry
      </button>
    </form>
  </div>
);

const PlantLog = () => {
  const [plantSpecies, setPlantSpecies] = useState("");
  const [petName, setPetName] = useState("");
  const [otherNotes, setOtherNotes] = useState("");
  const [submittedDataList, setSubmittedDataList] = useState<SubmittedData[]>(
    []
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      Router.push("/login"); // Redirect to login page if not authenticated
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Append the new entry to the submitted data list
    setSubmittedDataList((prevList) => [
      ...prevList,
      { plantSpecies, petName, otherNotes },
    ]);
    // Reset the form fields
    setPlantSpecies("");
    setPetName("");
    setOtherNotes("");
  };

  return (
    <>
      <Header />
      <Head>
        <title>Log Your Plant | LeafLog</title>
        <meta name="description" content="Create a new plant log entry" />
      </Head>

      <div className=" top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className=" w-full max-w-5xl p-10 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-8">
            Create Plant Log Entry
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-left">
              <label
                htmlFor="plantSpecies"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                Plant Species
              </label>
              <input
                type="text"
                id="plantSpecies"
                name="plantSpecies"
                value={plantSpecies}
                onChange={(e) => setPlantSpecies(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="Type and search for a plant species"
                required
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="petName"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                Pet Name
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="What do you call your plant?"
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="otherNotes"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                Other Notes
              </label>
              <textarea
                id="otherNotes"
                name="otherNotes"
                value={otherNotes}
                onChange={(e) => setOtherNotes(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="Any special care instructions or notes?"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-16 text-lg rounded-lg font-medium transition duration-300"
            >
              Submit Log Entry
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {submittedDataList.map((data, index) => (
            <div
              key={index}
              className="submittedBox bg-white rounded-lg shadow-md p-4"
            >
              <h2 className="text-xl font-bold text-green-600 mb-2">
                Submitted Information:
              </h2>
              <p className="text-lg text-gray-700">
                Plant Species:{" "}
                <span className="font-medium">{data.plantSpecies}</span>
              </p>
              <p className="text-lg text-gray-700">
                Pet Name: <span className="font-medium">{data.petName}</span>
              </p>
              <p className="text-lg text-gray-700">
                Other Notes:{" "}
                <span className="font-medium">{data.otherNotes}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PlantLog;
