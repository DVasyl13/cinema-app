import {shuffle} from "../util/helpers.js";

const initializeSlider = (arrayOfMovies) => {
    fetch('/api/v1/movie', {
        method: 'Get'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            arrayOfMovies = shuffle(data);
            createSlider(arrayOfMovies);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
const createSlider = (arrayOfMovies) => {

    const sliderGroup = document.getElementById('swiper-wrapper');

    arrayOfMovies.forEach((movie,index) => {
        const slider = document.createElement('div');
        slider.setAttribute('class', 'swiper-slide');
        const ref = document.createElement('a');
        ref.setAttribute('href', '/movie/'+movie.id);
        const img = document.createElement('img');
        img.src = movie.widePosterURL;
        img.id = 'slide-'+index;
        img.alt = `Slide ${img.id}`;
        ref.appendChild(img);
        slider.appendChild(ref);
        sliderGroup.appendChild(slider);
    });
}
export default initializeSlider