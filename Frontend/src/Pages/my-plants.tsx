// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import Router, { useRouter } from "next/router";
// import "../styles/global.css";

// interface Plant {
//   _id: string;
//   plantSpecies: string;
//   scientificName: string;
//   cycle: string;
//   watering: string;
//   sunlight: string[] | string; // If sunlight can be both an array and a string, you need to specify both types
// }

// const MyPlants = () => {
//   const [plants, setPlants] = useState<Plant[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const tokenFromCookie = Cookies.get("token");
//     if (!tokenFromCookie) {
//       // Redirect user to login page if token is not found
//       Router.push("/login");
//       return;
//     }

//     const fetchPlants = async () => {
//       try {
//         const response = await axios.get("http://localhost:5002/userplants", {
//           headers: {
//             Authorization: `Bearer ${tokenFromCookie}`,
//           },
//         });
//         setPlants(response.data);
//       } catch (error) {
//         console.error("Error fetching plants:", error);
//         setError(error);
//       }
//     };

//     fetchPlants();
//   }, []);

//   const handleNavigation = (path: string) => {
//     router.push(path);
//   };

//   const mapWateringSchedule = (apiSchedule: string) => {
//     const scheduleMapping: Record<string, string> = {
//       Frequent: "Daily",
//       Average: "Weekly",
//       // Add more mappings as needed
//     };
//     return scheduleMapping[apiSchedule] || apiSchedule; // Fallback to the original if no mapping is found
//   };

//   const capitalizeAndReplaceUnderscores = (str: string) => {
//     return str
//       .split("_")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };

//   return (
//     <>
//       {" "}
//       <Head>
//         <title>My Plants | LeafLog</title>
//       </Head>
//       <Header />
//       <div className="top-level bg-green-300 min-h-screen flex items-center justify-center">
//         <div className="container mx-auto p-4 flex-grow">
//           <h1 className="text-5xl font-bold text-white mb-8">My Plants</h1>
//           {error && <div className="text-red-500">Error: {error.message}</div>}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {plants.length > 0 ? (
//               plants.map((plant) => (
//                 <div
//                   key={plant._id}
//                   className="p-6 bg-white rounded-lg shadow-lg"
//                 >
//                   <h2 className="text-xl font-bold mb-2">
//                     {plant.plantSpecies}
//                   </h2>
//                   <p>Scientific Name: {plant.scientificName}</p>
//                   <p>Cycle: {capitalizeAndReplaceUnderscores(plant.cycle)}</p>
//                   <p>
//                     Watering:{" "}
//                     {capitalizeAndReplaceUnderscores(
//                       mapWateringSchedule(plant.watering)
//                     )}
//                   </p>

//                   <p>
//                     Sunlight:{" "}
//                     {Array.isArray(plant.sunlight)
//                       ? plant.sunlight
//                           .map((s) => capitalizeAndReplaceUnderscores(s))
//                           .join(", ")
//                       : capitalizeAndReplaceUnderscores(plant.sunlight)}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-green-600">
//                 No plants found. Please log some plants first.
//               </p>
//             )}
//           </div>
//           <button
//             onClick={() => handleNavigation("/plant-log")}
//             text-white
//             font-semibold
//             py-2
//             px-4
//             mt-4
//             rounded-lg
//             style={{ marginRight: "10px" }}
//             className="bg-green-600 hover:bg-green-800 text-white font-semibold py-4 px-4 mt-4 rounded-lg"
//           >
//             Log New Plant
//           </button>
//           <button
//             onClick={() => handleNavigation("/search")}
//             className="bg-green-600 hover:bg-green-800 text-white font-semibold py-4 px-4 mt-4 rounded-lg"
//           >
//             Discover Plants
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyPlants;
import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Router, { useRouter } from "next/router";
import "../styles/global.css";

interface Plant {
  _id: string;
  plantSpecies: string;
  scientificName: string;
  cycle: string;
  watering: string;
  sunlight: string[] | string; 
}

const MyPlants = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (!tokenFromCookie) {
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
        setError("An error occurred while fetching plants.");
      }
    };

    fetchPlants();
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const mapWateringSchedule = (apiSchedule: string) => {
    const scheduleMapping: Record<string, string> = {
      Frequent: "Daily",
      Average: "Weekly",
    };
    return scheduleMapping[apiSchedule] || apiSchedule; 
  };

  // const capitalizeAndReplaceUnderscores = (str: string) => {
  //   return str
  //     .split("_")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");
  // };
  const capitalizeAndReplaceUnderscores = (str: string | null) => {
    if (!str) return ""; 
    
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  

  return (
    <>
      <Head>
        <title>My Plants | LeafLog</title>
      </Head>
      <Header />
      <div className="top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className="container mx-auto p-4 flex-grow">
          <h1 className="text-5xl font-bold text-white mb-8">My Plants</h1>
          {error && <div className="text-red-500">Error: {error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.length > 0 ? (
              plants.map((plant) => (
                <div
                  key={plant._id}
                  className="p-6 bg-white rounded-lg shadow-lg"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {plant.plantSpecies}
                  </h2>
                  <p>Scientific Name: {plant.scientificName}</p>
                  <p>Cycle: {capitalizeAndReplaceUnderscores(plant.cycle)}</p>
                  <p>
                    Watering:{" "}
                    {capitalizeAndReplaceUnderscores(
                      mapWateringSchedule(plant.watering)
                    )}
                  </p>

                  <p>
                    Sunlight:{" "}
                    {Array.isArray(plant.sunlight)
                      ? plant.sunlight
                          .map((s) => capitalizeAndReplaceUnderscores(s))
                          .join(", ")
                      : capitalizeAndReplaceUnderscores(plant.sunlight)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-green-600">
                No plants found. Please log some plants first.
              </p>
            )}
          </div>
          <button
            onClick={() => handleNavigation("/plant-log")}
            text-white
            font-semibold
            py-2
            px-4
            mt-4
            rounded-lg
            style={{ marginRight: "10px" }}
            className="bg-green-600 hover:bg-green-800 text-white font-semibold py-4 px-4 mt-4 rounded-lg"
          >
            Log New Plant
          </button>
          <button
            onClick={() => handleNavigation("/search")}
            className="bg-green-600 hover:bg-green-800 text-white font-semibold py-4 px-4 mt-4 rounded-lg"
          >
            Discover Plants
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPlants;
