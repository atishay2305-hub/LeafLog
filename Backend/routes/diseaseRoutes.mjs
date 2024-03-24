import express from 'express';
import { diseases } from '../config/mongoCollections.mjs';

const router = express.Router();


router.get('/api/diseasedata', async (req, res) => {
    try {
        const collection = await diseases();
        const allDiseaseData = await collection.find().toArray();

        const filteredData = allDiseaseData.flatMap(disease =>
            disease.data ? disease.data.map(diseaseEntry => ({
                common_name: diseaseEntry.common_name,
                scientific_name: diseaseEntry.scientific_name[0],
                other_name: diseaseEntry.other_name ? diseaseEntry.other_name[0] : null,
                family: diseaseEntry.family,
                description: diseaseEntry.description,
                host: diseaseEntry.host
            })) : []
        );

        res.json(filteredData);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to fetch all common names
router.get('/api/commonnames', async (req, res) => {
    try {
        const commonNames = await getAllCommonNames();
        res.json(commonNames);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch all scientific names
router.get('/api/scientificnames', async (req, res) => {
    try {
        const scientificNames = await getAllScientificNames();
        res.json(scientificNames);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch all descriptions
router.get('/api/descriptions', async (req, res) => {
    try {
        const descriptions = await getAllDescriptions();
        res.json(descriptions);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch all hosts
router.get('/api/hosts', async (req, res) => {
    try {
        const hosts = await getAllHosts();
        res.json(hosts);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to fetch all other names
router.get('/api/othernames', async (req, res) => {
    try {
        const otherNames = await getAllOtherNames();
        res.json(otherNames);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
