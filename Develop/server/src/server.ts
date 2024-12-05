//Nancy note: 'dotenv' is software lib/module that allows devs to load environment variables from file named ".env"
import dotenv from 'dotenv'; 
//Nancy note: ''express' module is a web framework for Node.js and used to build web apps and APIs//
import express from 'express'; 
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// NANCY-VERIFY PATH TO DIST!! TODO: Serve static files of entire client dist folder
app.use(express.static('../client/dist'));
// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);
 
// TODO: Implement middleware to connect the routes
app.use('/api', routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
