//import mongoclient so as to establish connection to database
import { MongoClient } from 'mongodb';

//define databse name and url

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'IMDB';
const collectionName = 'Movies';

//define function for getting movie details

export async function getMovieDetails(movieId) {

  //console.log(movieId); troubleshooting

  const client = await MongoClient.connect(dbUrl);
  const collection = client.db(dbName).collection(collectionName);

  const movie = await collection.findOne({ tconst: movieId });

  client.close();

  return movie;
}

//define function for adding review for a movie

export async function storeMovieReview(movieId, reviewDetails) {

  //connect client to the databse
  const client = await MongoClient.connect(dbUrl);
  const collection = client.db(dbName).collection(collectionName);

  //push review for specific movie 
  const result = await collection.updateOne({ tconst: movieId }, { $push: { reviews: reviewDetails } });

  client.close();

  return result.modifiedCount === 1; // returns true if we successfully updated database
}

/*
Troubleshooting

getMovieDetails("tt0000002").then((result) => {
  console.log(result);
  client.close();
});
*/
