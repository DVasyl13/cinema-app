import initializeSlider from "./slider.js";
import initializeMovieCards from "../movie/movie_card.js"
import initializeHeader from "../common/header-initializer.js";
let arrayOfMovies = [];


window.onload = function() {
    initializeHeader();
    arrayOfMovies = initializeMovieCards();
    initializeSlider(arrayOfMovies);
}