import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Router from "next/router";
import { usePlants } from "../context/PlantContext";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationsPage = () => {
  const [email, setEmail] = useState("");
  const [userPlants, setUserPlants] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState(
    new Map<string, boolean>()
  );
  const [error, setError] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (!tokenFromCookie) {
      Router.push("/login");
      return;
    }

    const fetchUserPlants = async () => {
      try {
        const response = await axios.get("http://localhost:5002/userplants", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        });
        setUserPlants(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching user plants:", error.message);
          setError(error.message);
        } else {
          console.error("An unexpected error occurred", error);
          setError("An unexpected error occurred");
        }
      }
    };

    fetchUserPlants();
  }, []);

  const handleCheckboxChange = (plantId: string, isChecked: boolean) => {
    setSelectedPlants((prev) => new Map(prev).set(plantId, isChecked));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    await sendNotificationEmail(email);
  };


  const sendNotificationEmail = async (recipientEmail: string) => {
    const emailData = {
      email: recipientEmail,
    };
    try {
      const response = await axios.post(
        "http://localhost:5002/send-notification-email",
        emailData,
        {
          withCredentials: true, 
        }
      );
      if (response.status === 200) {
        setSubmissionStatus(
          "Notification set up successfully. An email has been sent."
        );
        toast.success("Email sent successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmissionStatus(
        "Failed to set up notification. Please try again later."
      );
    }
  };

  const mapWateringSchedule = (apiSchedule: string) => {
    const scheduleMapping: Record<string, string> = {
      Frequent: "Daily",
      Average: "Weekly",
    };
    return scheduleMapping[apiSchedule] || apiSchedule; 
  };

  // TODO: Replace with the actual rendering logic for errors and loading state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <Head>
        <title>Plant Care Notifications | LeafLog</title>
      </Head>
      <div className="top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl p-10 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-8">
            Set Up Plant Care Notifications
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-center">
              <label
                htmlFor="email"
                className="block mb-4 text-lg font-medium text-gray-900"
              >
                What email would you like the notification sent to?
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3"
                required
              />
            </div>
            <div>
              <label className="block mb-4 text-lg font-medium text-gray-900">
                Select the plants you want to receive notifications for:
              </label>
              {/* Map through user plants */}
              {userPlants.length === 0 ? (
                <p>No plants found. Please log some plants first.</p>
              ) : (
                userPlants.map((plant: any) => (
                  <div
                    key={plant._id}
                    className="plant-item text-left text-lg leading-relaxed "
                  >
                    <input
                      type="checkbox"
                      id={plant._id}
                      checked={selectedPlants.get(plant._id) || false}
                      onChange={(e) =>
                        handleCheckboxChange(plant._id, e.target.checked)
                      }
                      className="mr-4"
                    />
                    <label htmlFor={plant._id} className="ml-2">
                      {plant.otherName || plant.plantSpecies} - Water{" "}
                      {mapWateringSchedule(plant.watering)}
                    </label>
                  </div>
                ))
              )}
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-16 text-lg rounded-lg font-medium transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default NotificationsPage;
