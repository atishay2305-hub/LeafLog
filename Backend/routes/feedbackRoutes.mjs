// import express from 'express';
// import { feedback } from '../config/mongoCollections.mjs';

// const router = express.Router();

// router.use(express.json());



// router.post('/feedback', async (req, res) => {
//   try {
//     const collection = await feedback();
//     const newFeedback = await collection.insertOne(req.body);
//     if (newFeedback) {
//       res.status(200).json(newFeedback);
//     } else {
//       throw new Error('Failed to store feedback');
//     }
//   } catch (error) {
//     console.error('Error storing feedback:', error.message);
//     res.status(500).json({ error: 'Failed to store feedback. Please try again later.' });
//   }
// });



// router.get('/feedback', async (req, res) => {
//   try {
//     const collection = await feedback();
//     const allFeedbacks = await collection.find({}).toArray();
//     res.status(200).json(allFeedbacks);
//   } catch (error) {
//     console.error('Error retrieving feedbacks:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// export default router;
// backend.js
import express from 'express';
import { feedback } from '../config/mongoCollections.mjs';

const router = express.Router();

router.use(express.json());

router.post('/feedback', async (req, res) => {
  try {
    const collection = await feedback();
    const newFeedback = await collection.insertOne(req.body);
    if (newFeedback.insertedCount === 1) { // Checking if feedback was successfully inserted
      res.status(200).json(newFeedback.ops[0]); // Returning the inserted feedback
    } else {
      throw new Error('Failed to store feedback');
    }
  } catch (error) {
    console.error('Error storing feedback:', error.message);
    res.status(500).json({ error: 'Failed to store feedback. Please try again later.' });
  }
});

router.get('/feedback', async (req, res) => {
  try {
    const collection = await feedback();
    const allFeedbacks = await collection.find({}).toArray();
    res.status(200).json(allFeedbacks);
  } catch (error) {
    console.error('Error retrieving feedbacks:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
