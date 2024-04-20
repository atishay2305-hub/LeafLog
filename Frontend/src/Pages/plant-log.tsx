import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePlants } from "../context/PlantContext";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import { logPlant } from "../../../Backend/services/plantService";
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
  const { submittedDataList, setSubmittedDataList } = usePlants();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SubmittedData[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("Token not found.");
        }

        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );

        const decodedToken = JSON.parse(jsonPayload);

        setUserEmail(decodedToken.email);
        setToken(token);
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


  const sendReminder = async (plantData: SubmittedData) => {
    console.log("Attempting to send reminder...");

    if (!userEmail) {
      console.log("User email is not available.");
      alert("User email is not available.");
      return;
    }

    console.log("User email for reminder:", userEmail);
    console.log("Plant data for reminder:", plantData);

    try {
      const response = await fetch("/send-watering-reminder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plantLogId: plantData._id,
          userEmail: userEmail,
        }),
      });

      const data = await response.json();
      if (data.message) {
        console.log("Reminder sent successfully:", data.message);
        alert("Reminder sent successfully!");
      } else {
        console.log("Failed to send reminder:", data);
        alert("Failed to send reminder.");
      }
    } catch (error) {
      console.error("Failed to send reminder:", error);
      alert("There was an error sending the reminder.");
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
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-16 text-lg rounded-lg font-medium transition duration-300"
            >
              Submit Log Entry
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {submittedDataList.map((data, index) => (
            <div
              key={data._id ? data._id.$oid : index}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                {data.plantSpecies}
              </h2>
              <p className="text-gray-600 mb-4">{data.scientificName}</p>
              <p className="text-gray-600 mb-4">{data.otherName}</p>
              <p className="text-gray-600 mb-4">Cycle: {data.cycle}</p>
              <p className="text-gray-600 mb-4">Watering: {data.watering}</p>
              <p className="text-gray-600 mb-4">Sunlight: {data.sunlight}</p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                onClick={() => sendReminder(data)}
              >
                Send Reminder
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlantLog;
