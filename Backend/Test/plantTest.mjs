import {
    plant_data,
    getPlantCommonNames,
    getScientificNames,
    detailsData,
    getPlantDetailsByCommonName,
    getPlantDetailsByScientificName,
    getAllOtherNames,
    getAllFamilies,
    getAllOrigins
} from '../data/plantData.mjs';

async function test() {
    console.log("Testing plant_data...");
    await plant_data();

    console.log("\nTesting getPlantCommonNames...");
    const commonNames = await getPlantCommonNames();
    console.log("Common Names:", commonNames);

    console.log("\nTesting getScientificNames...");
    const scientificNames = await getScientificNames();
    console.log("Scientific Names:", scientificNames);

    console.log("\nTesting detailsData...");
    await detailsData();

    console.log("\nTesting getPlantDetailsByCommonName...");
    const plantDetailsByCommonName = await getPlantDetailsByCommonName("Common Name");
    console.log("Plant Details By Common Name:", plantDetailsByCommonName);

    console.log("\nTesting getPlantDetailsByScientificName...");
    const plantDetailsByScientificName = await getPlantDetailsByScientificName("Scientific Name");
    console.log("Plant Details By Scientific Name:", plantDetailsByScientificName);

    console.log("\nTesting getAllOtherNames...");
    const otherNames = await getAllOtherNames();
    console.log("Other Names:", otherNames);

    console.log("\nTesting getAllFamilies...");
    const families = await getAllFamilies();
    console.log("Families:", families);

    console.log("\nTesting getAllOrigins...");
    const origins = await getAllOrigins();
    console.log("Origins:", origins);
}

test();
