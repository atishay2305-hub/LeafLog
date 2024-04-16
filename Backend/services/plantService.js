const API_BASE_URL = "http://localhost:3000/api"; // Set the base URL for your API

// Function to get all plant logs for the current user
export const getUserPlants = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/plant-logs`, {
            method: "GET",
            credentials: "include", // Needed to include cookies for auth, if your API uses session authentication
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.json();
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
};

// Function to create a new plant log
export const createPlantLog = async(plantData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/plant-logs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Include the Authorization header if a token is provided
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            // Include credentials if your API uses session-based authentication
            credentials: token ? "omit" : "include",
            body: JSON.stringify(plantData),
        });

        const data = await response.json();
        if (!response.ok) {
            // Log the error and throw or return an error object based on your error handling strategy
            console.error("Error in createPlantLog (service) => ", data);
            throw new Error(data.message || "An error occurred");
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error in createPlantLog (service) => ", error);
        // Depending on your front-end error handling, either throw the error or return an object indicating failure
        throw error;
        // or
        // return { success: false, message: error.message };
    }
};

export const getPlantLogEntries = async(token) => {
    try {
        const res = await fetch("http://localhost:3000/api/plantlogs", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in getPlantLogEntries (service) => ", error);
        return { success: false, message: error.message };
    }
};

// plantService.js

// Function to send a watering reminder email for a plant log entry
export const sendWateringReminder = async(plantLogId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/send-watering-reminder`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ plantLogId }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.json();
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
};