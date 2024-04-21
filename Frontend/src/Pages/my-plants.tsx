// frontend/pages/myPlants.tsx

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./search.module.css";
import { usePlants } from "../context/PlantContext";
import Cookies from "js-cookie";
import Router from "next/router";
import axios from "axios";

interface Plant {
  _id: {
    $oid: string;
  };
  plantId?: number;
  common_name: string;
  scientific_name: string;
  other_name?: string | null;
  cycle: string;
  watering: string;
  sunlight: string;
}

const MyPlants = () => {
  const [userPlants, setUserPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const { submittedDataList } = usePlants();

  useEffect(() => {
    const fetchUserPlants = async () => {
      try {
        const plants = await getUserPlants(); // Fetch user plants from backend
        setUserPlants(plants);
      } catch (error) {
        console.error("Error fetching user plants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlants();

    if (!Cookies.get("token")) {
      Router.push("/login");
    }
  }, []);

  const getUserPlants = async () => {
    try {
      const response = await axios.get("/api/user/plants");
      return response.data; // Assuming the response contains user plants
    } catch (error) {
      console.error("Error fetching user plants:", error);
      return [];
    }
  };

  const handleSendReminder = async (plantId: string) => {
    try {
      // Implement sending watering reminder logic here
    } catch (error) {
      console.error("Error sending watering reminder:", error);
    }
  };

  const handleLogPlant = async (plant: Plant) => {
    try {
      // Implement logic to log the plant here
      setUserPlants([...userPlants, plant]);
    } catch (error) {
      console.error("Error logging plant:", error);
    }
  };

  return (
    <>
      <Head>
        <title>My Plants</title>
      </Head>
      <Header />
      <main className="top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div
          className={`${styles.container} w-full max-w-5xl p-10 bg-white shadow-lg rounded-lg text-center`}
        >
          <h1 className="text-4xl font-bold text-center my-10">My Plants</h1>
          {loading && <p className="text-center">Loading...</p>}
          {!loading && userPlants.length === 0 && submittedDataList.length === 0 && (
            <p className="text-center">You have not added any plants yet.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...userPlants, ...submittedDataList].map((plant, index) => (
              <div
                key={plant._id ? plant._id.$oid : index}
                className={`${styles.resultItem} p-6 bg-white rounded-lg shadow`}
              >
                <h2 className="text-2xl font-bold">{plant.common_name}</h2>
                <p>Scientific Name: {plant.scientific_name}</p>
                <p>Watering: Every {plant.watering}</p>
                <p>Sunlight Requirement: {plant.sunlight.replace(/_/g, " ")}</p>
                {plant._id && (
                  <button
                    className={`${styles.addButton} mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded`}
                    onClick={() => handleSendReminder(plant._id.$oid)}
                  >
                    Send Watering Reminder
                  </button>
                )}
                {!plant._id && (
                  <button
                    className={`${styles.addButton} mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded`}
                    onClick={() => handleLogPlant(plant)}
                  >
                    Add to My Plants
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyPlants;
