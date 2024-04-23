import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePlants } from "../context/PlantContext";
import Router from "next/router";
import Cookies from 'js-cookie';

interface SubmittedData {
  _id?: {
    $oid: string;
  };
  plantSpecies: string;
  scientificName: string;
  otherName: string | null;
  cycle: string;
  watering: string;
  sunlight: string;
}

const PlantLog = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plantSpecies, setPlantSpecies] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [otherName, setOtherName] = useState<string | null>(null);
  const [cycle, setCycle] = useState("");
  const [watering, setWatering] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { submittedDataList } = usePlants();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<SubmittedData[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tokenFromCookie = Cookies.get('token'); // Get JWT token from cookie
        console.log(tokenFromCookie);
        if (!tokenFromCookie) {
          // Redirect user to login page if token is not found
          Router.push('/login');
          return;
        }

        setUserEmail(tokenFromCookie);
        setToken(tokenFromCookie);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntry: SubmittedData = {
      plantSpecies,
      scientificName,
      otherName,
      cycle,
      watering,
      sunlight,
    };

    try {
      const response = await fetch(`http://localhost:5002/api/plantdata/search?common_name=${plantSpecies}&scientific_name=${scientificName}&cycle=${cycle}&watering=${watering}&other_name=${otherName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const searchData = await response.json();
      setSearchResults(searchData);
    } catch (error) {
      console.error("Error searching plants:", error);
      setSearchResults([]);
    }
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setPlantSpecies(searchQuery);

    try {
      const response = await fetch(`http://localhost:5002/api/plantdata?searchQuery=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch plant data');
      }
      const searchData = await response.json();
      const top20Results = searchData.slice(0, 20); // Slice the array to include only the first 20 items
      setSearchResults(top20Results);
    } catch (error) {
      console.error("Error searching plants:", error);
      setSearchResults([]);
    }
  };

  const handleSelectPlant = (plantName: string) => {
    setPlantSpecies(plantName);
    setShowDropdown(false);
  };

  // Code responsible for sending the token from the frontend
  const handleLogPlant = async () => {
    try {
      const response = await fetch("http://localhost:5002/logplant", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Ensure correct token is sent here
        },
        body: JSON.stringify({
          plantSpecies,
          scientificName,
          otherName,
          cycle,
          watering,
          sunlight,
          userEmail: userEmail // Send user's email along with plant data
        }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error logging plant:', error);
      alert('Failed to log plant.');
    }
  };

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
        <title>Log Your Plant | LeafLog</title>
        <meta name="description" content="Create a new plant log entry" />
      </Head>

      <div className="top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl p-10 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-8">
            Create a Plant Log Entry
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-left">
              <label
                htmlFor="plantSpecies"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                Plant Species
              </label>
              <div id="plantSpeciesContainer">
                <input
                  type="text"
                  id="plantSpecies"
                  value={plantSpecies}
                  onChange={handleSearchChange}
                  onFocus={() => setShowDropdown(true)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Type and search for a plant species"
                  autoComplete="off" // Disable browser's autocomplete
                  required
                />
                {showDropdown && (
                  <div className="dropdown-content">
                    {searchResults.length > 0 && (
                      <div className="dropdown-content bg-white border border-gray-300 rounded-lg shadow-lg">
                        {searchResults.map((plant, index) => (
                          <div
                            key={index} // Changed key to index, as the array index is unique
                            onClick={() => handleSelectPlant(plant.common_name)}
                            className="dropdown-item"
                          >
                            {plant.common_name} ({plant.scientific_name})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="text-left">
                <label
                  htmlFor="cycle"
                  className="block mb-4 text-lg font-medium text-gray-900"
                >
                  Growth Cycle
                </label>
                <select
                  id="cycle"
                  name="cycle"
                  value={cycle}
                  onChange={(e) => setCycle(e.target.value)}
                  onFocus={() => setShowDropdown(false)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                >
                  <option value="">Select a growth cycle</option>
                  <option value="annual">Annual</option>
                  <option value="biennial">Biennial</option>
                  <option value="perennial">Perennial</option>
                </select>
              </div>

              <div className="text-left">
                <label
                  htmlFor="watering"
                  className="block mb-4 text-lg font-medium text-gray-900"
                >
                  Watering Frequency
                </label>
                <select
                  id="watering"
                  name="watering"
                  value={watering}
                  onChange={(e) => setWatering(e.target.value)}
                  onFocus={() => setShowDropdown(false)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  required
                >
                  <option value="">Select watering frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="text-left">
                <label
                  htmlFor="sunlight"
                  className="block mb-4 text-lg font-medium text-gray-900"
                >
                  Sunlight Requirement
                </label>
                <select
                  id="sunlight"
                  name="sunlight"
                  value={sunlight}
                  onChange={(e) => setSunlight(e.target.value)}
                  onFocus={() => setShowDropdown(false)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                >
                  <option value="">Select sunlight requirement</option>
                  <option value="full_sun">Full Sun</option>
                  <option value="partial_shade">Partial Shade</option>
                  <option value="full_shade">Full Shade</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleLogPlant}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-16 text-lg rounded-lg font-medium transition duration-300"
            >
              Log Plant
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlantLog;
