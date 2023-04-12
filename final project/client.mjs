
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

//define event listener for search button
searchBtn.addEventListener("click", async(event) => {

  event.preventDefault(); //stops webpage from refreshing after click

  const movieTitle = searchInput.value.trim().replace(/\s+/g, "%20");
  console.log("Search button clicked with movie title:", movieTitle);

  fetch(`http://localhost:3000/api/movies/${movieTitle}`) //fetch data from database
    .then((response) => response.json())
    .then((data) => {
      console.log("Movie details:", data);

      if (data.length > 0) {
        // Construct HTML to display movie details
        const movieHTML = data.map(
          (movie) => `
            <div>
              <p>Movie Title: ${movie.primaryTitle}</p>
              <p>Original Title: ${movie.originalTitle}</p>
              <p>Movie Genre: ${movie.genres}</p>
              <p>Year released: ${movie.startYear}</p>
              <hr>
            </div>
          `
        );
        
        movieContainer.innerHTML = movieHTML.join("");

      } else {
        movieContainer.innerHTML = "<p>No movie found.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      movieContainer.innerHTML = "<p>Something went wrong.</p>";
    });
});

