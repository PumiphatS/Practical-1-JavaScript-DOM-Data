const wrapper = document.getElementById("wrapper");
const countEl = document.getElementById("count");
const countElement = document.getElementById("x");

let movies = [];
let currentList = [];

const sortMethods = {
  "alpha-ascend": (a, b) => a.movieName.localeCompare(b.movieName),
  "alpha-descend": (a, b) => b.movieName.localeCompare(a.movieName),
  "year-ascend": (a, b) => a.year - b.year,
  "year-descend": (a, b) => b.year - a.year
};

async function loadMovies() {
  try {
    const response = await fetch("movies.json");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    movies = await response.json();
    currentList = [...movies];
    render(currentList);
  } catch (error) {
    console.error("Could not load movies:", error);
    wrapper.textContent = "Sorry, the movies could not be loaded.";
  }
}
//.replace(/\s+/g, "-")

function createMovieElement(movie) {
  const card = document.createElement("div");
  card.className = "movie";
  const genreClass = movie.genre.toLowerCase();

  card.style.border = "2px solid black";
    card.style.borderRadius = "5px";
    card.style.padding = "10px";
    card.style.marginBottom = "10px";
    card.style.width = "120px";

  card.innerHTML = `
    <div class="cover ${genreClass}s">
      <span class="cover-title">${movie.movieName}</span>
    </div>
    <p class="genre">${movie.genre} ${movie.year}</p>
    <p class="meta">${movie.length} min</p>
  `;
  return card;
}

function render(list) {
  wrapper.innerHTML = "";
  wrapper.append(...list.map(createMovieElement));
  countEl.textContent = `Showing ${list.length} of ${movies.length} movies`;
}


let movieNameAscending = true;
let pageAscending = true;
let yearAscending = true;

document.getElementById("sortmovieNameBtn").addEventListener("click", () => {
  currentList.sort(sortMethods[movieNameAscending ? "alpha-ascend" : "alpha-descend"]);
  movieNameAscending = !movieNameAscending;
  render(currentList);
});


document.getElementById("sortYearBtn").addEventListener("click", () => {
  currentList.sort(sortMethods[yearAscending ? "year-ascend" : "year-descend"]);
  yearAscending = !yearAscending;
  render(currentList);
});

document.getElementById("genreSelect").addEventListener("change", (e) => {
  const genre = e.target.value;
  currentList = genre === "All" ? [...movies] : movies.filter(movie => movie.genre === genre);
  movieNameAscending = true;
  yearAscending = true;
  render(currentList);
});

document.getElementById("pickForMe").addEventListener("click", () => {
    const randomElement = movies[Math.floor(Math.random() * movies.length)];
    console.log(randomElement.movieName);
      countElement.textContent = `Tonight you are watching ${randomElement.movieName} (${randomElement.year}).`;
});

console.log(movies);


loadMovies();