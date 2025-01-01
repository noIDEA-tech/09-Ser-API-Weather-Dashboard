import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import path from 'path';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

//  TODO: Serve static files of entire client dist folder
app.use(express.static(path.join(__dirname, '../../client/dist')));
 

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', htmlRoutes);
app.use(routes);
 

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// Import the routes
//Nancy note: 'dotenv' is software lib/module that allows devs to load environment variables from file named ".env"
//Nancy note: ''express' module is a web framework for Node.js and used to build web apps and APIs//

// import { Router } from 'express';
// const router = Router();
// TODO: Implement middleware to connect the routes
// app.use(routes);
// app.use(express.static('public'));
// Serve the index.html for any other routes (client-side routing)
// app.get('*', (_, res) => {
//     res.sendFile(path.join(__dirname, '../client/index.html'));
// });
// export default router;