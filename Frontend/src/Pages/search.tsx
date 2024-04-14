import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./search.module.css";
import "../styles/global.css";
import plantData from "../../../Backend/config/plants.json";

interface Plant {
  _id: {
    $oid: string;
  };
  plantId: number;
  common_name: string;
  scientific_name: string;
  other_name?: string | null;
  cycle: string;
  watering: string;
  sunlight: string;
}

export default function Search() {
  const [plantQuery, setPlantQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlantQuery(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setSearchSubmitted(true);

    console.log("Query:", plantQuery);
    console.log("Data:", plantData);

    // Filter the plant data based on the search query
    const data = plantData as Plant[];

    const searchQuery = plantQuery.trim().toLowerCase();

    const results = data
      .filter(
        (plant) =>
          plant.common_name
            .toLowerCase()
            .includes(plantQuery.trim().toLowerCase()) ||
          plant.scientific_name
            .toLowerCase()
            .includes(plantQuery.trim().toLowerCase()) ||
          (plant.other_name &&
            plant.other_name.toLowerCase().includes(searchQuery))
      )
      .slice(0, 6);

    console.log("Filtered Results:", results);

    setSearchResults(results);
    setLoading(false);
  };

  // Render the UI with search functionality
  return (
    <>
      <Head>
        <title>Search Plants</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <section className="top-level search-page bg-green-300 min-h-screen flex flex-col items-center justify-center">
          {" "}
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-12 text-center mb-8">
            {/* Search form */}{" "}
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
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Search
              </button>
            </form>
          </div>
          {/* Results section */}
          {searchSubmitted && (
            <section className="results-container mx-auto px-2 py-2 submittedBox max-w-5xl w-full">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-center">
                  Search Results
                </h2>
                {loading && <p className="text-center">Loading...</p>}
                {!loading && searchResults.length === 0 && (
                  <div className="text-center">
                    <p>No Plants Found, Try Again!</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {" "}
                  {/* This is the grid container */}
                  {searchResults.map((plant) => (
                    <div
                      key={plant._id.$oid} // Use the unique OID as the key for each element
                      className={`${styles.resultItem} ${styles.titleCase}`} // Apply your CSS module classes here
                    >
                      <h3 className="text-xl font-bold">{plant.common_name}</h3>
                      <p className="font-semibold text-left">
                        Scientific Name:{" "}
                        <span className="font-normal">
                          {plant.scientific_name}
                        </span>
                      </p>
                      {plant.other_name && (
                        <p className="font-semibold text-left">
                          Other Name:{" "}
                          <span className="font-normal">
                            {plant.other_name}
                          </span>
                        </p>
                      )}
                      <p className="font-semibold text-left">
                        Cycle:{" "}
                        <span className="font-normal">{plant.cycle}</span>
                      </p>
                      <p className="font-semibold text-left">
                        Watering:{" "}
                        <span className="font-normal">{plant.watering}</span>
                      </p>
                      <p className="font-semibold text-left">
                        Sunlight:{" "}
                        <span className="font-normal">{plant.sunlight}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
}
