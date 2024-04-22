import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePlants } from "../context/PlantContext";
import Cookies from 'js-cookie';

interface Plant {
  _id: string;
  plantSpecies: string;
  scientificName: string;
  otherName: string | null;
  cycle: string;
  watering: string;
  sunlight: string;
}

const MyPlants = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPlants, setUserPlants] = useState<Plant[]>([]);
  const { submittedDataList } = usePlants();

  useEffect(() => {
    const fetchUserPlants = async () => {
      try {
        const tokenFromCookie = Cookies.get('token'); // Get JWT token from cookie
        console.log(tokenFromCookie);
        if (!tokenFromCookie) {
          throw new Error("Token not found.");
        }

        const response = await fetch("http://localhost:5002/userplants", {
          headers: {
            'Authorization': `Bearer ${tokenFromCookie}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user plants');
        }
        const userPlantsData = await response.json();
        setUserPlants(userPlantsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserPlants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <Head>
        <title>My Plants | LeafLog</title>
        <meta name="description" content="View all your logged plants" />
      </Head>

      <div className="top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl p-10 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-8">
            My Plants
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userPlants.map((plant) => (
              <div key={plant._id} className="border border-gray-300 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">{plant.plantSpecies}</h2>
                <p><span className="font-bold">Scientific Name:</span> {plant.scientificName}</p>
                {plant.otherName && <p><span className="font-bold">Other Name:</span> {plant.otherName}</p>}
                <p><span className="font-bold">Growth Cycle:</span> {plant.cycle}</p>
                <p><span className="font-bold">Watering Frequency:</span> {plant.watering}</p>
                <p><span className="font-bold">Sunlight Requirement:</span> {plant.sunlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPlants;
