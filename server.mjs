//import express and mongodb and body-parse

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

//import functions

import { getMovieDetails, storeMovieReview} from './database.mjs';

// Create server with port

const app = express();
const port = 3000;

// Configure app to use body-parser for JSON data
app.use(bodyParser.json());



// Define MongoDB connection string and database name
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'IMDB';

// Define a helper function to connect to the database
const connectToDatabase = async () => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  return db;
};

// Designating http endpoints get and post

//get movie with the given ID
app.get('/Movies/:id', async (req, res) => {

  // Connect to the database
  const db = await connectToDatabase();

  // Get the movie ID from the request parameters
  const id = req.params.id;

  // Ask the database for the movie with the given ID
  const movie = await db.collection('Movies').findOne({ tconst: id });

  // Return the movie as JSON
  res.json(movie);
});

// Define a route to add a review for a movie
app.post('/Movies/:id/reviews', async (req, res) => {
  // Connect to the database
  const db = await connectToDatabase();

  // Get the movie ID from the request parameters
  const id = req.params.id;

  // Get the review data from the request body
  const review = req.body;

  // Add the review to the database for the given movie ID
  const result = await db.collection('Movies').updateOne(
    { tconst: id },
    { $push: { reviews: review } }
  );

  // Return the result as JSON
  res.json(result);
});

// Listen for requests
app.listen(port, () => {
  console.log('Server is listening from port '+ port)
});
