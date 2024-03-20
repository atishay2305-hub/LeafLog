import express from 'express';
import { plantData, detailsData } from '../data/plantData.mjs';
import { details, plants as plantCollection } from '../config/mongoCollections.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();

plantData();
detailsData();

router.get('/api/plantdata', async(req, res) => {
    try {
        const collection = await plantCollection();
        const allPlantData = await collection.find().toArray();

        const filteredData = allPlantData.flatMap(plant =>
            plant.data ? plant.data.map(plantEntry => ({
                common_name: plantEntry.common_name,
                scientific_name: plantEntry.scientific_name[0],
                other_name: plantEntry.other_name ? plantEntry.other_name[0] : null,
                cycle: plantEntry.cycle,
                watering: plantEntry.watering,
                sunlight: plantEntry.sunlight ? plantEntry.sunlight[0] : null,
            })) : []
        );

        res.json(filteredData);
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


router.get('/api/plantdata/:id', async(req, res) => {
    try {
        const requestedId = new ObjectId(req.params.id);
        const collection = await details();
        const allDetails = await collection.findOne({ _id: requestedId });

        if (!allDetails) {
            return res.status(404).json({ error: 'Plant details not found' });
        }

        const filteredData = allDetails.data ?
            allDetails.data.map(detailEntry => ({
                common_name: detailEntry.common_name,
                scientific_name: detailEntry.scientific_name[0],
                other_name: detailEntry.other_name ? detailEntry.other_name[0] : null,
                family: detailEntry.family || null,
                origin: detailEntry.origin || [],
                type: detailEntry.type || null,
                dimension: detailEntry.dimension || null,
                dimensions: detailEntry.dimensions || {},
                cycle: detailEntry.cycle || null,
                attracts: detailEntry.attracts || [],
                propagation: detailEntry.propagation || [],
                hardiness: detailEntry.hardiness || {},
                hardiness_location: detailEntry.hardiness_location || {},
                watering: detailEntry.watering || null,
                depth_water_requirement: detailEntry.depth_water_requirement || {},
                volume_water_requirement: detailEntry.volume_water_requirement || [],
                watering_period: detailEntry.watering_period || null,
                watering_general_benchmark: detailEntry.watering_general_benchmark || {},
                plant_anatomy: detailEntry.plant_anatomy || [],
                sunlight: detailEntry.sunlight || [],
                pruning_month: detailEntry.pruning_month || [],
                pruning_count: detailEntry.pruning_count || [],
                seeds: detailEntry.seeds || 0,
                maintenance: detailEntry.maintenance || null,
                care_guides: detailEntry["care-guides"] || null,
                soil: detailEntry.soil || [],
                growth_rate: detailEntry.growth_rate || null,
                drought_tolerant: detailEntry.drought_tolerant || false,
                salt_tolerant: detailEntry.salt_tolerant || false,
                thorny: detailEntry.thorny || false,
                invasive: detailEntry.invasive || false,
                tropical: detailEntry.tropical || false,
                indoor: detailEntry.indoor || false,
                care_level: detailEntry.care_level || null,
                pest_susceptibility: detailEntry.pest_susceptibility || [],
                pest_susceptibility_api: detailEntry.pest_susceptibility_api || "Coming Soon",
                flowers: detailEntry.flowers || false,
                flowering_season: detailEntry.flowering_season || null,
                flower_color: detailEntry.flower_color || "",
                cones: detailEntry.cones || false,
                fruits: detailEntry.fruits || false,
                edible_fruit: detailEntry.edible_fruit || false,
                edible_fruit_taste_profile: detailEntry.edible_fruit_taste_profile || "Coming Soon",
                fruit_nutritional_value: detailEntry.fruit_nutritional_value || "Coming Soon",
                fruit_color: detailEntry.fruit_color || [],
                harvest_season: detailEntry.harvest_season || null,
                leaf: detailEntry.leaf || false,
                leaf_color: detailEntry.leaf_color || [],
                edible_leaf: detailEntry.edible_leaf || false,
                cuisine: detailEntry.cuisine || false,
                medicinal: detailEntry.medicinal || false,
                poisonous_to_humans: detailEntry.poisonous_to_humans || 0,
                poisonous_to_pets: detailEntry.poisonous_to_pets || 0,
                description: detailEntry.description || "",
                default_image: detailEntry.default_image || {},
            })) : [];

        res.json(filteredData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});



router.get('/api/plantdata/search', async(req, res) => {
    try {
        const collection = await plantCollection();
        const nameQuery = req.query.name;

        if (!nameQuery) {
            return res.status(400).json({ error: 'Bad Request: Missing name query parameter' });
        }

        const searchCriteria = { 'data.common_name': new RegExp(nameQuery, 'i') };
        const searchResults = await collection.find(searchCriteria).toArray();

        if (searchResults.length > 0) {
            const result = searchResults.map(plantDoc => {
                const plantData = plantDoc.data.find(plant => plant.common_name.toLowerCase() === nameQuery.toLowerCase());

                if (plantData) {
                    return {
                        common_name: plantData.common_name,
                        scientific_name: plantData.scientific_name[0],
                        other_name: plantData.other_name ? plantData.other_name[0] : null,
                        cycle: plantData.cycle,
                        watering: plantData.watering,
                        sunlight: plantData.sunlight ? plantData.sunlight[0] : null,
                    };
                }
            }).filter(Boolean);

            if (result.length > 0) {
                // Return only the first result - 3/18 mm changing this so we get more than one result, was result[0]
                res.json(result);
            } else {
                res.status(404).json({ error: 'Plant not found' });
            }
        } else {
            res.status(404).json({ error: 'Plant not found' });
        }
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.post('/api/plantdata', async(req, res) => {
    try {
        const collection = await plantCollection();

        const newPlantData = req.body;

        if (
            // Uncomment these lines if the newPlantData and newPlantData.data checks are needed
            // !newPlantData || 
            // !newPlantData.data ||
            !newPlantData.common_name ||
            !newPlantData.scientific_name ||
            !newPlantData.cycle ||
            !newPlantData.watering ||
            !newPlantData.sunlight
        ) {
            return res.status(400).json({ error: 'All parameters are required.' });
        }

        const result = await collection.insertOne(newPlantData);
        res.status(201).json({ success: true, insertedId: result.insertedId });

    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

export default router;