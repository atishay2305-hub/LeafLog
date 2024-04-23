import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Router from "next/router";

const MyPlants = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (!tokenFromCookie) {
      // Redirect user to login page if token is not found
      Router.push("/login");
      return;
    }

    const fetchPlants = async () => {
      try {
        const response = await axios.get("http://localhost:5002/userplants", {
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        });
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
        setError(error);
      }
    };

    fetchPlants();
  }, []);

  const viewPlantDetails = async (commonName) => {
    try {
      const response = await axios.get(
        `http://localhost:5002/api/plantdata/details?common_name=${commonName}`
      );
      const plantDetails = response.data;
      // Display plant details here (e.g., show in a modal)
      console.log("Plant Details:", plantDetails);
    } catch (error) {
      console.error("Error fetching plant details:", error);
      // Show toast message for no matching details
      alert("No details match for this plant.");
    }
  };

  return (
    <>
      <Header />
      <div className="top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className="container mx-auto p-4 flex-grow">
          <h1 className="text-5xl font-bold text-white mb-8">My Plants</h1>
          {error && <div className="text-red-500">Error: {error.message}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.length > 0 ? (
              plants.map((plant) => (
                <div
                  key={plant._id}
                  className="p-6 bg-white rounded-lg shadow-lg"
                  onClick={() => viewPlantDetails(plant.common_name)}
                >
                  <h2 className="text-xl font-bold mb-2">
                    {plant.plantSpecies}
                  </h2>
                  <p>Scientific Name: {plant.scientificName}</p>
                  <p>Cycle: {plant.cycle}</p>
                  <p>Watering: {plant.watering}</p>
                  <p>
                    Sunlight:{" "}
                    {Array.isArray(plant.sunlight)
                      ? plant.sunlight
                          .map((s) =>
                            s
                              .split(" ")
                              .map(
                                (word: string) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")
                          )
                          .join(", ")
                      : plant.sunlight
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-green-600">
                No plants found. Please log some plants first.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPlants;
