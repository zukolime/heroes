"use strict";

const heroesWrapper = document.querySelector(".heroes-wrapper");
const movieFilter = document.querySelector(".movie-filter");

let heroesData = [];

const getHeroesData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(`Error: ${error}`));
};

const createHeroes = (data) => {
  heroesWrapper.innerHTML = "";

  data.forEach((hero) => {
    const card = document.createElement("div");
    card.className = "heroes-card";

    card.innerHTML = `
      <div class="heroes-card--content">
        <div class="heroes-card--image">
          <img src="${hero.photo}" alt="${hero.name}" />
        </div>
        <div class="heroes-card--info">
          <h2 class="heroes-card--name">${hero.name}</h2>
          ${
            hero.realName
              ? `<p class="heroes-card--details"><b>Real Name</b>: ${hero.realName}</p>`
              : ""
          }
          ${
            hero.species
              ? `<p class="heroes-card--details"><b>Species</b>: ${hero.species}</p>`
              : ""
          }
          ${
            hero.citizenship
              ? `<p class="heroes-card--details"><b>Citizenship</b>: ${hero.citizenship}</p>`
              : ""
          }
          ${
            hero.gender
              ? `<p class="heroes-card--details"><b>Gender</b>: ${hero.gender}</p>`
              : ""
          }
          ${
            hero.birthDay
              ? `<p class="heroes-card--details"><b>Birth Day</b>: ${hero.birthDay}</p>`
              : ""
          }
          ${
            hero.deathDay
              ? `<p class="heroes-card--details"><b>Death Day</b>: ${hero.deathDay}</p>`
              : ""
          }
          ${
            hero.status
              ? `<p class="heroes-card--details"><b>Status</b>: ${hero.status}</p>`
              : ""
          }
          ${
            hero.actors
              ? `<p class="heroes-card--details"><b>Actors</b>: ${hero.actors}</p>`
              : ""
          }
          ${
            hero.movies
              ? `<p class="heroes-card--details"><b>Movies</b>: ${hero.movies.join(
                  ", "
                )}</p>`
              : ""
          }
        </div>
      </div>
    `;

    heroesWrapper.append(card);
  });
};

const addMovieInFilter = (data) => {
  const movies = [];

  data.forEach((hero) => {
    if (hero.movies) {
      hero.movies.forEach((movie) => {
        if (!movies.includes(movie)) {
          movies.push(movie);
        }
      });
    }
  });

  movies.forEach((movie) => {
    const option = document.createElement("option");

    option.value = movie;
    option.textContent = movie;
    movieFilter.append(option);
  });
};

const filterByMovie = () => {
  const selectedMovie = movieFilter.value;

  let filteredHeroes;

  if (selectedMovie === "all") {
    filteredHeroes = heroesData;
  } else {
    filteredHeroes = heroesData.filter(
      (hero) => hero.movies && hero.movies.includes(selectedMovie)
    );
  }

  createHeroes(filteredHeroes);
};

getHeroesData("dbHeroes.json")
  .then((data) => {
    heroesData = data;
    createHeroes(data);
    addMovieInFilter(data);
  })
  .catch((error) => console.log(`Error: ${error}`));

movieFilter.addEventListener("change", filterByMovie);
