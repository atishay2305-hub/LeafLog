const API_BASE_URL = "http://localhost:3000/api"; 

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

export const createPlantLog = async(plantData, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/plant-logs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            credentials: token ? "omit" : "include",
            body: JSON.stringify(plantData),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("Error in createPlantLog (service) => ", data);
            throw new Error(data.message || "An error occurred");
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error in createPlantLog (service) => ", error);
        throw error;
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