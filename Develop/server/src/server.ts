//Nancy note: 'dotenv' is software lib/module that allows devs to load environment variables from file named ".env"
//Nancy note: ''express' module is a web framework for Node.js and used to build web apps and APIs//
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

// import bodyParser from 'body-parser';

// import htmlRoutes from './routes/htmlRoutes.js';


// import { Router } from 'express';
// const router = Router();

// export default router;

const app = express();

const PORT = process.env.PORT || 3001;

// NANCY-VERIFY PATH TO DIST!! TODO: Serve static files of entire client dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));
// app.use(express.static('../client/dist'));
// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', htmlRoutes);
app.use('/api', routes);
 
// TODO: Implement middleware to connect the routes
// app.use(routes);
// Serve the index.html for any other routes (client-side routing)
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
// Start the server on the port

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
