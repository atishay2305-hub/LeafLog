import {
    diseaseData,
    getAllCommonNames,
    getAllScientificNames,
    getAllDescriptions,
    getAllHosts,
    getAllOtherNames
} from '../data/diseases.mjs';

async function test() {
    console.log("Testing diseaseData...");
    await diseaseData();

    console.log("\nTesting getAllCommonNames...");
    const commonNames = await getAllCommonNames();
    console.log("Common Names:", commonNames);

    console.log("\nTesting getAllScientificNames...");
    const scientificNames = await getAllScientificNames();
    console.log("Scientific Names:", scientificNames);

    console.log("\nTesting getAllDescriptions...");
    const descriptions = await getAllDescriptions();
    console.log("Descriptions:", descriptions);

    console.log("\nTesting getAllHosts...");
    const hosts = await getAllHosts();
    console.log("Hosts:", hosts);

    console.log("\nTesting getAllOtherNames...");
    const otherNames = await getAllOtherNames();
    console.log("Other Names:", otherNames);
}

test();
