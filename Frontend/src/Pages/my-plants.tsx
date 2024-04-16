import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./search.module.css";
import {
  getUserPlants,
  sendWateringReminder,
} from "../../../Backend/services/plantService.js"; // Replace with your actual import paths

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
  const [plantSpecies, setPlantSpecies] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [otherName, setOtherName] = useState<string | null>(null);
  const [cycle, setCycle] = useState("");
  const [watering, setWatering] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [petName, setPetName] = useState("");
  const [otherNotes, setOtherNotes] = useState("");

  useEffect(() => {
    // Fetch user plants data from the backend
    const fetchUserPlants = async () => {
      try {
        const plants = await getUserPlants();
        setUserPlants(plants);
      } catch (error) {
        console.error("Error fetching user plants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlants();
  }, []);

  const handleSendReminder = async (plantId: string) => {
    try {
      await sendWateringReminder(plantId);
      // Handle successful reminder initiation here
    } catch (error) {
      console.error("Error sending watering reminder:", error);
      // Handle error here
    }
  };

  return (
    <>
      <Head>
        <title>My Plants</title>
      </Head>
      <Header />
      <main className={`${styles.topLevel} flex-grow`}>
        <div
          className={`${styles.container} max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`}
        >
          <h1 className="text-4xl font-bold text-center my-10">My Plants</h1>
          {loading && <p className="text-center">Loading...</p>}
          {!loading && userPlants.length === 0 && (
            <p className="text-center">You have not added any plants yet.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userPlants.map((plant) => (
              <div
                key={plant._id.$oid}
                className={`${styles.resultItem} p-6 bg-white rounded-lg shadow`}
              >
                <h2 className="text-2xl font-bold">{plant.common_name}</h2>
                <p>Scientific Name: {plant.scientific_name}</p>
                <p>Watering: Every {plant.watering}</p>
                {/* Display other plant details as needed */}
                <button
                  className={`${styles.addButton} mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded`}
                  onClick={() => handleSendReminder(plant._id.$oid)}
                >
                  Send Watering Reminder
                </button>
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