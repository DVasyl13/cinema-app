import initializeSlider from "./slider.js";
import initializeMovieCards from "../movie/movie_card.js"
import initializeHeader from "../common/header-initializer.js";


window.onload = function() {
    initializeHeader();
    initializeMovieCards();
    initializeSlider();
}