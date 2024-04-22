import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./search.module.css";
import Cookies from "js-cookie";

interface Plant {
  _id: {
    $oid: string;
  };
  plantId: number;
  common_name: string;
  scientific_name: string;
  watering: string;
  sunlight: string;
}

export default function Search() {
  const [plantQuery, setPlantQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [mappedSchedules, setMappedSchedules] = useState<
    Record<string, string>
  >({});

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlantQuery(event.target.value);
  };

  const addToMyPlants = async (plant: Plant) => {
    try {
      const tokenFromCookie = Cookies.get("token"); // Retrieve the token from the cookie
      if (!tokenFromCookie) {
        throw new Error("Token not found in cookie.");
      }

      const response = await fetch("http://localhost:5002/logplant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenFromCookie}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          plantSpecies: plant.common_name,
          scientificName: plant.scientific_name,
          otherName: null, // Adjust as per your requirements
          cycle: null, // Adjust as per your requirements
          watering: plant.watering,
          sunlight: plant.sunlight,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add plant to collection");
      }
      const data = await response.json();
      console.log(data);
      alert(data.message);
    } catch (error) {
      console.error("Error logging plant:", error);
      alert("Failed to log plant.");
    }
  };

  const mapWateringSchedule = (apiSchedule: string) => {
    const scheduleMapping: Record<string, string> = {
      Frequent: "Daily",
      Average: "Weekly",
      // ... any additional mappings
    };

    return scheduleMapping[apiSchedule] || apiSchedule; // Fallback to the original if no mapping is found
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSearchSubmitted(true);

    try {
      const response = await fetch(
        `http://localhost:5002/api/plantdata/search?common_name=${plantQuery}&scientific_name=${plantQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const searchData: Plant[] = await response.json();
      setSearchResults(searchData);

      // Map the watering schedules
      const newMappedSchedules: Record<string, string> = {};
      searchData.forEach((plant) => {
        newMappedSchedules[plant._id.$oid] = mapWateringSchedule(
          plant.watering
        );
      });
      setMappedSchedules(newMappedSchedules);
    } catch (error) {
      console.error("Error searching plants:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Search Plants</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <section className="top-level search-page bg-green-300 min-h-screen flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-12 text-center mb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <h1 className="text-5xl font-bold text-green-600 mb-8">
                Search for Plants
              </h1>
              <input
                type="text"
                value={plantQuery}
                onChange={handleSearchChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                placeholder="Type and search for a plant species"
                required
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 px-8 rounded-lg"
              >
                Search
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">
              Search Results
            </h2>
            {loading && <p>Loading...</p>}
            {!loading && searchSubmitted && searchResults.length === 0 && (
              <p>No results found.</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((plant: Plant) => (
                <div
                  key={plant._id.$oid} // Change key to use MongoDB ObjectID
                  className={`${styles.resultItem} p-6 bg-white rounded-lg shadow`}
                >
                  <h3 className="text-xl font-semibold text-green-600">
                    {plant.common_name}
                  </h3>
                  <p className="text-gray-600">{plant.scientific_name}</p>
                  <p className="text-gray-600">
                    Watering: {mappedSchedules[plant._id.$oid]}
                  </p>
                  <p className="text-gray-600">
                    Sunlight Requirement:{" "}
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

                  <button
                    onClick={() => addToMyPlants(plant)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 mt-4 rounded-lg"
                  >
                    Add to My Plants
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
