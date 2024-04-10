import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./search.module.css";
import Cookies from "js-cookie";
import Router from "next/router";
import Link from "next/link";
import "../styles/global.css";

interface Plant {
  _id: string;
  common_name: string;
  scientific_name: string;
  other_name?: string;
}

export default function Search() {
  const [plantQuery, setPlantQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[] | null>(null);
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      Router.push("/login");
    } else {
      const fetchAllPlants = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            "http://localhost:5002/api/plantdata"
          );
          setAllPlants(response.data);
        } catch (error) {
          setError("An error occurred while fetching plant data.");
        } finally {
          setLoading(false);
        }
      };

      fetchAllPlants();
    }
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlantQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:5002/api/plantdata/search/common_name?name=${encodeURIComponent(
          plantQuery
        )}`
      );

      const results = response.data;
      setSearchResults(results);
    } catch (e: any) {
      if (e.response && e.response.status === 404) {
        setError("No plants found matching your query.");
      } else {
        setError("An error occurred while searching.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLog = (plant: Plant) => {
    // Navigate to the PlantLog page with plant data
    Router.push({
      pathname: "/plant-log",
      query: {
        plantId: plant._id,
        commonName: plant.common_name,
        scientificName: plant.scientific_name,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Search Plants</title>
      </Head>
      <Header />
      <section className="top-level bg-green-300 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-12 text-center mb-8">
          <h1 className="text-5xl font-bold text-green-600 mb-8">
            Discover Plants
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
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
              className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Search
            </button>
          </form>
        </div>{" "}
        <section className="container mx-auto px-2 py-2 submittedBox max-w-4xl w-full">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-center">
              Search Results
            </h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(searchResults) &&
                searchResults.map((plant, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold">{plant.common_name}</h3>
                    <p>Scientific Name: {plant.scientific_name}</p>
                    {plant.other_name && <p>Other Name: {plant.other_name}</p>}
                    <button
                      onClick={() => handleAddToLog(plant)}
                      className="mt-4 text-green-600 hover:underline"
                    >
                      Add to Log
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}
