import React, { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import Router from "next/router";
import plantData from "../../../Backend/config/plants.json";
import Plant from "./search";

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

interface SubmittedData {
  plantSpecies: string;
  scientificName: string;
  otherName: string | null;
  cycle: string;
  watering: string;
  sunlight: string;
  petName: string;
  otherNotes: string;
}

const PlantLog = () => {
  const [plantSpecies, setPlantSpecies] = useState<string>("");
  const [scientificName, setScientificName] = useState<string>("");
  const [otherName, setOtherName] = useState<string | null>(null);
  const [cycle, setCycle] = useState<string>("");
  const [watering, setWatering] = useState<string>("");
  const [sunlight, setSunlight] = useState<string>("");
  const [petName, setPetName] = useState<string>("");
  const [otherNotes, setOtherNotes] = useState<string>("");
  const [submittedDataList, setSubmittedDataList] = useState<SubmittedData[]>(
    []
  );
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setPlantSpecies(searchQuery);

    const results = plantData
      .filter(
        (plant) =>
          plant.common_name.toLowerCase().includes(searchQuery) ||
          plant.scientific_name.toLowerCase().includes(searchQuery) ||
          (plant.other_name &&
            plant.other_name.toLowerCase().includes(searchQuery))
      )
      .slice(0, 6); // Take the first 6 results

    setSearchResults(results);
    setShowDropdown(true);
  };

  const handleSelectPlant = (plantName: string) => {
    setPlantSpecies(plantName);
    setShowDropdown(false); // Hide the dropdown once a selection is made
  };

  const handleBlur = (event: React.FocusEvent) => {
    // Check if the new focus target is not within the dropdown
    setTimeout(() => setShowDropdown(false), 8);
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showDropdown &&
        event.target &&
        (event.target as Element).id !== "plantSpecies" &&
        !(event.target as Element).classList.contains("dropdown-content") &&
        !(event.target as Element).classList.contains("dropdown-item")
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newEntry: SubmittedData = {
      plantSpecies,
      scientificName,
      otherName,
      cycle,
      watering,
      sunlight,
      petName,
      otherNotes,
    };
    setSubmittedDataList([...submittedDataList, newEntry]);
    setPlantSpecies("");
    setScientificName("");
    setOtherName(null);
    setCycle("");
    setWatering("");
    setSunlight("");
    setPetName("");
    setOtherNotes("");
  };

  return (
    <>
      <Header />
      <Head>
        <title>Log Your Plant | LeafLog</title>
        <meta name="description" content="Create a new plant log entry" />
      </Head>

      <div className=" top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className=" w-full max-w-5xl p-10 bg-white shadow-lg rounded-lg text-center">
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
              <div onBlur={handleBlur}>
                <input
                  type="text"
                  id="plantSpecies"
                  name="plantSpecies"
                  value={plantSpecies}
                  onChange={handleSearchChange}
                  onFocus={() => setShowDropdown(false)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Type and search for a plant species"
                  autoComplete="off" // Disable browser's autocomplete
                  required
                />
                {searchResults.length > 0 && (
                  <div className="dropdown-content bg-white border border-gray-300 rounded-lg shadow-lg">
                    {searchResults.map((plant, index) => (
                      <div
                        key={plant.common_name} // Make sure to use a unique key, common_name could be duplicated, consider using an ID
                        onClick={() => handleSelectPlant(plant.common_name)}
                        className="dropdown-item"
                      >
                        {plant.common_name} ({plant.scientific_name})
                      </div>
                    ))}
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
              <div className="text-left">
                <label
                  htmlFor="petName"
                  className="block mb-4 text-lg font-medium text-gray-900"
                >
                  Pet Name
                </label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="What do you call your plant?"
                />
              </div>
              <div className="text-left">
                <label
                  htmlFor="otherNotes"
                  className="block mb-4 text-lg font-medium text-gray-900"
                >
                  Other Notes
                </label>
                <textarea
                  id="otherNotes"
                  name="otherNotes"
                  value={otherNotes}
                  onChange={(e) => setOtherNotes(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                  placeholder="Any special care instructions or notes?"
                />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {submittedDataList.map((data, index) => (
            <div
              key={index}
              className="submittedBox bg-white rounded-lg shadow-md p-4"
            >
              <h2 className="text-xl font-bold text-green-600 mb-2">
                Submitted Information:
              </h2>
              <p className="text-lg text-gray-700">
                Plant Species:{" "}
                <span className="font-medium">{data.plantSpecies}</span>
              </p>
              <p className="text-lg text-gray-700">
                Pet Name: <span className="font-medium">{data.petName}</span>
              </p>
              <p className="text-lg text-gray-700">
                Other Notes:{" "}
                <span className="font-medium">{data.otherNotes}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PlantLog;
