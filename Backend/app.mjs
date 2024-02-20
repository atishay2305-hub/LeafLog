// Import other necessary modules
import express from 'express';
import plantDataRouter from './routes/plant_dataRoutes.mjs';
import diseaseDataRouter from './routes/diseaseRoutes.mjs';
import { plant_data } from './data/plant_data.mjs';
import { diseaseData } from './data/diseases.mjs';
import { detailsData } from './data/details.mjs';
import emailRoute from './routes/node-mailer_route.mjs';
import userRoutes from './routes/users.mjs';  // Import your user routes

const app = express();
const port = 3000;

// Connect to MongoDB
// mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// Other middleware configurations

app.use(express.json());
app.use('/email', emailRoute);
app.use(userRoutes);  // Use your user routes

app.use(plantDataRouter);
app.use(diseaseDataRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Load initial data
plant_data();
diseaseData();
detailsData();
