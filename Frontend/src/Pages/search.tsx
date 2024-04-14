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
      .slice(0, 5);

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
      <Header />
      <section className="top-level bg-green-300 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-12 text-center mb-8">
          {/* Search form */}{" "}
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
        </div>
        {/* Results section */}
        <section className="container mx-auto px-2 py-2 submittedBox max-w-4xl w-full">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-center">
              Search Results
            </h2>
            {loading && <p className="text-center">Loading...</p>}
            {!loading && searchSubmitted && searchResults.length === 0 && (
              <div className="text-center">
                <p>No Plants Found, Try Again!</p>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {searchResults.map((plant) => (
                <div
                  key={plant._id.$oid} // Use the unique OID as the key for each element
                  className={`${styles.resultItem}`}
                >
                  <h3>{plant.common_name}</h3>
                  <p className="key">
                    Scientific Name: <span>{plant.scientific_name}</span>
                  </p>
                  {plant.other_name && (
                    <p className="key">
                      Other Name: <span>{plant.other_name}</span>
                    </p>
                  )}
                  <p className="key">
                    Cycle: <span>{plant.cycle}</span>
                  </p>
                  <p className="key">
                    Watering: <span>{plant.watering}</span>
                  </p>
                  <p className="key">
                    Sunlight: <span>{plant.sunlight}</span>
                  </p>
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
