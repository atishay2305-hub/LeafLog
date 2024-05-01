import axios from "axios";
import { diseases as diseasesCollection } from "../config/mongoCollections.mjs";

const apiKey = process.env.API_KEY || "sk-1cDo65c5314199c384079";
const apiURL = process.env.API_URL || "https://perenual.com/api/pest-disease-list?key=sk-1cDo65c5314199c384079";

export const diseaseData = async () => {
  try {
    const response = await axios.get(apiURL, {
      params: { key: apiKey },
    });

    let diseaseData = response.data.data;

    const collection = await diseasesCollection();
    await collection.insertMany(diseaseData);

    console.log(`${diseaseData.length} documents have been stored in MongoDB`);
  } catch (error) {
    console.error(
      "Error: ",
      error.message || (error.response && error.response.data)
    );
  }
};

export const getAllCommonNames = async () => {
  try {
    const diseasesCollectionRef = await diseasesCollection();
    const diseases = await diseasesCollectionRef
      .find({}, { common_name: 1 })
      .toArray();
    const commonNames = diseases.map((disease) => disease.common_name);
    return commonNames;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
};

export const getAllScientificNames = async () => {
  try {
    const diseasesCollectionRef = await diseasesCollection();
    const diseases = await diseasesCollectionRef
      .find({}, { scientific_name: 1 })
      .toArray();
    const scientificNames = diseases.map((disease) => disease.scientific_name);
    return scientificNames;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
};

export const getAllDescriptions = async () => {
  try {
    const diseasesCollectionRef = await diseasesCollection();
    const diseases = await diseasesCollectionRef
      .find({}, { description: 1 })
      .toArray();
    const descriptions = diseases.map((disease) => disease.description);
    return descriptions;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
};

export const getAllHosts = async () => {
  try {
    const diseasesCollectionRef = await diseasesCollection();
    const diseases = await diseasesCollectionRef
      .find({}, { host: 1 })
      .toArray();
    const hosts = diseases.map((disease) => disease.host);
    return hosts;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
};

export const getAllOtherNames = async () => {
  try {
    const diseasesCollectionRef = await diseasesCollection();
    const diseases = await diseasesCollectionRef
      .find({}, { other_name: 1 })
      .toArray();
    const otherNames = diseases.map(
      (disease) => disease.other_name || "there is no other name"
    );
    return otherNames;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
};

diseaseData();
