// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import plantData from "../../../Backend/config/plants.json";
// import Cookies from "js-cookie";
// import { usePlants } from "../context/PlantContext";
// import { useAuth } from "../context/AuthContext";
// import { decodeToken } from "../../../Backend/utils/tokenUtils";

// interface Plant {
//   _id: {
//     $oid: string;
//   };
//   plantId?: number;
//   common_name: string;
//   scientific_name: string;
//   other_name?: string | null;
//   cycle: string;
//   watering: string;
//   sunlight: string;
// }

// interface SubmittedData {
//   _id?: {
//     $oid: string;
//   };
//   plantSpecies: string;
//   scientificName: string;
//   otherName: string | null;
//   cycle: string;
//   watering: string;
//   sunlight: string;
// }

// const PlantLog = () => {
//   const [plantSpecies, setPlantSpecies] = useState("");
//   const [scientificName, setScientificName] = useState("");
//   const [otherName, setOtherName] = useState<string | null>(null);
//   const [cycle, setCycle] = useState("");
//   const [watering, setWatering] = useState("");
//   const [sunlight, setSunlight] = useState("");
//   const { submittedDataList, setSubmittedDataList } = usePlants();
//   const [searchResults, setSearchResults] = useState<Plant[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const { user } = useAuth();
//   const [userEmail, setUserEmail] = useState(null);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const searchQuery = e.target.value.toLowerCase();
//     setPlantSpecies(searchQuery);

//     const results = plantData
//       .filter(
//         (plant) =>
//           plant.common_name.toLowerCase().includes(searchQuery) ||
//           plant.scientific_name.toLowerCase().includes(searchQuery) ||
//           (plant.other_name &&
//             plant.other_name.toLowerCase().includes(searchQuery))
//       )
//       .slice(0, 6); // Take the first 6 results

//     setSearchResults(results);
//     setShowDropdown(true);
//   };

//   const handleSelectPlant = (plantName: string) => {
//     setPlantSpecies(plantName);
//     setShowDropdown(false);
//   };

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       try {
//         const decodedUser = decodeToken(token);
//         console.log("User email from token:", decodedUser.email);
//         setUserEmail(decodedUser.email); // Updates state only when token changes
//       } catch (error) {
//         console.error("Error decoding token:", error);
//       }
//     }
//     const handleOutsideClick = (event: MouseEvent) => {
//       // We cast event.target to Node here because contains expects a Node type.
//       if (
//         showDropdown &&
//         !document
//           .getElementById("plantSpeciesContainer")
//           ?.contains(event.target as Node)
//       ) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [showDropdown]);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const newEntry: SubmittedData = {
//       plantSpecies,
//       scientificName,
//       otherName,
//       cycle,
//       watering,
//       sunlight,
//     };
//     setSubmittedDataList((prevList: SubmittedData[]) => [
//       ...prevList,
//       newEntry,
//     ]);
//     alert("Plant log entry submitted successfully!");
//     // Clear form fields
//     setPlantSpecies("");
//     setScientificName("");
//     setOtherName(null);
//     setCycle("");
//     setWatering("");
//     setSunlight("");
//   };

//   const sendReminder = async (plantData: SubmittedData) => {
//     console.log("Attempting to send reminder...");
//     // Since `user` can be null, the optional chaining `?.` will prevent runtime errors.

//     if (!userEmail) {
//       console.log("User email is not available.");
//       alert("User email is not available.");
//       return;
//     } else {
//       console.log("User email is available:", userEmail);
//     }

//     console.log("User email for reminder:", userEmail);
//     console.log("Plant data for reminder:", plantData);

//     try {
//       const response = await fetch(
//         "api/plant-log/plant-logs/send-watering-reminder",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             plantLogId: plantData._id, // Make sure _id exists in your SubmittedData
//             userEmail: userEmail, // Use userEmail from state
//           }),
//         }
//       );

//       const data = await response.json();
//       if (data.message) {
//         console.log("Reminder sent successfully:", data.message);
//         alert("Reminder sent successfully!");
//       } else {
//         console.log("Failed to send reminder:", data);
//         alert("Failed to send reminder.");
//       }
//     } catch (error) {
//       console.error("Failed to send reminder:", error);
//       alert("There was an error sending the reminder.");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Head>
//         <title>Log Your Plant | LeafLog</title>
//         <meta name="description" content="Create a new plant log entry" />
//       </Head>

//       <div className="top-level bg-green-300 min-h-screen flex items-center justify-center">
//         <div className="w-full max-w-5xl p-10 bg-white shadow-lg rounded-lg text-center">
//           <h1 className="text-5xl font-bold text-green-600 mb-8">
//             Create a Plant Log Entry
//           </h1>
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="text-left">
//               <label
//                 htmlFor="plantSpecies"
//                 className="block mb-4 text-lg font-medium text-gray-900"
//               >
//                 Plant Species
//               </label>
//               <div id="plantSpeciesContainer">
//                 <input
//                   type="text"
//                   id="plantSpecies"
//                   value={plantSpecies}
//                   onChange={handleSearchChange}
//                   onFocus={() => setShowDropdown(true)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
//                   placeholder="Type and search for a plant species"
//                   autoComplete="off" // Disable browser's autocomplete
//                   required
//                 />
//                 {showDropdown && (
//                   <div className="dropdown-content">
//                     {searchResults.length > 0 && (
//                       <div className="dropdown-content bg-white border border-gray-300 rounded-lg shadow-lg">
//                         {searchResults.map((plant, index) => (
//                           <div
//                             key={plant.common_name} // Make sure to use a unique key, common_name could be duplicated, consider using an ID
//                             onClick={() => handleSelectPlant(plant.common_name)}
//                             className="dropdown-item"
//                           >
//                             {plant.common_name} ({plant.scientific_name})
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <div className="text-left">
//                 <label
//                   htmlFor="cycle"
//                   className="block mb-4 text-lg font-medium text-gray-900"
//                 >
//                   Growth Cycle
//                 </label>
//                 <select
//                   id="cycle"
//                   name="cycle"
//                   value={cycle}
//                   onChange={(e) => setCycle(e.target.value)}
//                   onFocus={() => setShowDropdown(false)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
//                 >
//                   <option value="">Select a growth cycle</option>
//                   <option value="annual">Annual</option>
//                   <option value="biennial">Biennial</option>
//                   <option value="perennial">Perennial</option>
//                 </select>
//               </div>

//               <div className="text-left">
//                 <label
//                   htmlFor="watering"
//                   className="block mb-4 text-lg font-medium text-gray-900"
//                 >
//                   Watering Frequency
//                 </label>
//                 <select
//                   id="watering"
//                   name="watering"
//                   value={watering}
//                   onChange={(e) => setWatering(e.target.value)}
//                   onFocus={() => setShowDropdown(false)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
//                   required
//                 >
//                   <option value="">Select watering frequency</option>
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="biweekly">Biweekly</option>
//                   <option value="monthly">Monthly</option>
//                 </select>
//               </div>

//               <div className="text-left">
//                 <label
//                   htmlFor="sunlight"
//                   className="block mb-4 text-lg font-medium text-gray-900"
//                 >
//                   Sunlight Requirement
//                 </label>
//                 <select
//                   id="sunlight"
//                   name="sunlight"
//                   value={sunlight}
//                   onChange={(e) => setSunlight(e.target.value)}
//                   onFocus={() => setShowDropdown(false)}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
//                 >
//                   <option value="">Select sunlight requirement</option>
//                   <option value="full_sun">Full Sun</option>
//                   <option value="partial_shade">Partial Shade</option>
//                   <option value="full_shade">Full Shade</option>
//                 </select>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white py-3 px-16 text-lg rounded-lg font-medium transition duration-300"
//             >
//               Submit Log Entry
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {submittedDataList.map((data: SubmittedData, index: number) => (
//             <div
//               key={index}
//               className="submittedBox bg-white rounded-lg shadow-md p-4"
//             >
//               <h2 className="text-xl font-bold text-green-600 mb-2">
//                 Submitted Information:
//               </h2>
//               <p className="text-lg text-gray-700">
//                 Plant Species:{" "}
//                 <span className="font-medium">{data.plantSpecies}</span>
//               </p>
//               <p className="text-lg text-gray-700">
//                 Scientific Name:{" "}
//                 <span className="font-medium">{data.scientificName}</span>
//               </p>
//               <p className="text-lg text-gray-700">
//                 Other Name:{" "}
//                 <span className="font-medium">{data.otherName}</span>
//               </p>
//               <p className="text-lg text-gray-700">
//                 Growth Cycle: <span className="font-medium">{data.cycle}</span>
//               </p>
//               <p className="text-lg text-gray-700">
//                 Watering Frequency:{" "}
//                 <span className="font-medium">{data.watering}</span>
//               </p>
//               <p className="text-lg text-gray-700">
//                 Sunlight Requirement:
//                 <span className="font-medium">
//                   {data.sunlight.replace(/_/g, " ")}
//                 </span>
//               </p>
//               <button
//                 onClick={() => sendReminder(data)} // Assuming you have access to the user's email
//                 className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
//                 style={{ float: "right" }} // Position the button to the bottom right
//               >
//                 Send Watering Reminder
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default PlantLog;
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import plantData from "../../../Backend/config/plants.json";
import Cookies from "js-cookie";
import { usePlants } from "../context/PlantContext";
import { useAuth } from "../context/AuthContext";
import { decodeToken } from "../../../Backend/utils/tokenUtils";
import { logPlant } from "../../../Backend/services/plantService"; // Import the logPlant function

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
  const [plantSpecies, setPlantSpecies] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [otherName, setOtherName] = useState<string | null>(null);
  const [cycle, setCycle] = useState("");
  const [watering, setWatering] = useState("");
  const [sunlight, setSunlight] = useState("");
  const { submittedDataList, setSubmittedDataList } = usePlants();
  const [searchResults, setSearchResults] = useState<Plant[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState(null);

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
    setShowDropdown(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedUser = decodeToken(token);
        console.log("User email from token:", decodedUser.email);
        setUserEmail(decodedUser.email); // Updates state only when token changes
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    const handleOutsideClick = (event: MouseEvent) => {
      // We cast event.target to Node here because contains expects a Node type.
      if (
        showDropdown &&
        !document
          .getElementById("plantSpeciesContainer")
          ?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDropdown]);

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
      await logPlant(newEntry); // Log the new plant entry
      setSubmittedDataList((prevList: SubmittedData[]) => [
        ...prevList,
        newEntry,
      ]);
      alert("Plant log entry submitted successfully!");
    } catch (error) {
      console.error("Error logging plant:", error);
      alert("Failed to submit plant log entry.");
    }

    // Clear form fields
    setPlantSpecies("");
    setScientificName("");
    setOtherName(null);
    setCycle("");
    setWatering("");
    setSunlight("");
  };

  const sendReminder = async (plantData: SubmittedData) => {
    console.log("Attempting to send reminder...");

    if (!userEmail) {
      console.log("User email is not available.");
      alert("User email is not available.");
      return;
    } else {
      console.log("User email is available:", userEmail);
    }

    console.log("User email for reminder:", userEmail);
    console.log("Plant data for reminder:", plantData);

    try {
      const response = await fetch(
        "api/plant-log/plant-logs/send-watering-reminder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plantLogId: plantData._id, // Make sure _id exists in your SubmittedData
            userEmail: userEmail, // Use userEmail from state
          }),
        }
      );

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {submittedDataList.map((data: SubmittedData, index: number) => (
            <div
              key={data._id?.$oid || index} // Use _id as key if available, otherwise fallback to index
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
                Scientific Name:{" "}
                <span className="font-medium">{data.scientificName}</span>
              </p>
              <p className="text-lg text-gray-700">
                Other Name:{" "}
                <span className="font-medium">{data.otherName}</span>
              </p>
              <p className="text-lg text-gray-700">
                Growth Cycle: <span className="font-medium">{data.cycle}</span>
              </p>
              <p className="text-lg text-gray-700">
                Watering Frequency:{" "}
                <span className="font-medium">{data.watering}</span>
              </p>
              <p className="text-lg text-gray-700">
                Sunlight Requirement:
                <span className="font-medium">
                  {data.sunlight.replace(/_/g, " ")}
                </span>
              </p>
              <button
                onClick={() => sendReminder(data)} // Assuming you have access to the user's email
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                style={{ float: "right" }} // Position the button to the bottom right
              >
                Send Watering Reminder
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
