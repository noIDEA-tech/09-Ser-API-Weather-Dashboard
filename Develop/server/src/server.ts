//Nancy note: 'dotenv' is software lib/module that allows devs to load environment variables from file named ".env"
import dotenv from 'dotenv'; 
//Nancy note: ''express' module is a web framework for Node.js and used to build web apps and APIs//
import express from 'express'; 
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder

// TODO: Implement middleware for parsing JSON and urlencoded form data

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
