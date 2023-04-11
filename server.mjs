//import express and mongodb and body-parse

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

//import bcrypt from 'bcryptjs'; //hash and compare passwords for security

//import user model
//import User from './usermodel.mjs';

//import functions

//import { getMovieDetails, storeMovieReview} from './database.mjs';

// Create server with port

const app = express();
const port = 3000;

// Configure app to use body-parser for JSON data
app.use(bodyParser.json());
app.use(cors());



// Define MongoDB connection string and database name
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'IMDB';

// Define a helper function to connect to the database
const connectToDatabase = async () => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  return db;
};

//designating user login and registration endpoints

// User registration endpoint
/*app.post('/register', async (req, res) => {
  try {
    // Check if user already exists in database
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });

    // Save user to database
    await user.save();

    // Return success response
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating user' });
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  try {
    // Find user in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Check if password is correct
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Return success response
    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error logging in' });
  }
});
// Designating http endpoints get and post
*/


//get movie with the given ID
app.get('/api/movies/:title', async (req, res) => {

  // Connect to the database
  const db = await connectToDatabase();

  // Get the movie ID from the request parameters
  const query = req.params.title;

  // Ask the database for the movie with the given ID
  const movie = await db.collection('Movies').find({ primaryTitle: query}).toArray();

  console.log("Movie details:", movie);

  // Return the movie as JSON
  res.json(movie);
});

app.post('/api/movies/:title/reviews', async (req, res) => {
  try {
    const { title } = req.params;
    const { rating, comment } = req.body;

    // Check if movie exists
    const movie = await Movie.findOne({ primaryTitle: title });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Add review to movie
    movie.reviews.push({ rating, comment });
    await movie.save();

    return res.status(200).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// Listen for requests
app.listen(port, () => {
  console.log('Server is listening from port '+ port)
});
