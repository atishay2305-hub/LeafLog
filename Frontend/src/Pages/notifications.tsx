import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { usePlants } from "../context/PlantContext";

const NotificationsPage = () => {
  const [email, setEmail] = useState("");
  const [selectedPlants, setSelectedPlants] = useState(new Map());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { submittedDataList } = usePlants();

  const handleCheckboxChange = (plantId: string, isChecked: boolean) => {
    setSelectedPlants((prev) => new Map(prev).set(plantId, isChecked));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement actual submission logic here.
    setIsSubmitted(true);
  };

  const subscribedPlantsSummary = Array.from(selectedPlants)
    .filter(([_, isChecked]) => isChecked)
    .map(
      ([plantId]) =>
        submittedDataList.find((plant) => plant._id?.$oid === plantId)
          ?.otherName || "Unknown Plant"
    )
    .join(", ");

  return (
    <>
      <Header />
      <Head>
        <title>Plant Care Notifications | LeafLog</title>
      </Head>
      <div className="top-level bg-green-300 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl p-10 bg-white shadow-lg rounded-lg text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-8">
            Set Up Plant Care Notifications
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="text-left">
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
            <div className="text-left">
              <label className="block mb-4 text-lg font-medium text-gray-900">
                Which plant would you like notifications for?
              </label>
              {submittedDataList.map((plant) => (
                <div key={plant._id?.$oid}>
                  <input
                    type="checkbox"
                    id={plant._id?.$oid}
                    checked={!!selectedPlants.get(plant._id?.$oid)}
                    onChange={(e) =>
                      handleCheckboxChange(plant._id?.$oid, e.target.checked)
                    }
                  />
                  <label htmlFor={plant._id?.$oid} className="ml-2">
                    {plant.otherName} - Water every {plant.cycle}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-16 text-lg rounded-lg font-medium transition duration-300"
            >
              Submit
            </button>
            {isSubmitted && !submitError && (
              <div className="alert-success">
                Notification settings have been saved.
              </div>
            )}
            {submitError && (
              <div className="alert-error">Error: {submitError}</div>
            )}
          </form>
          <div className="summary-box mt-8 p-5 bg-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Subscribed Notifications:
            </h3>
            <p>
              {subscribedPlantsSummary ||
                "No plants selected for notifications yet."}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationsPage;
