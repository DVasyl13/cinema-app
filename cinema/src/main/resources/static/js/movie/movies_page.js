import initializeHeader from "../common/header-initializer.js";
import {shuffle} from "../util/helpers.js";

window.onload = function() {
    initializeHeader();
    getMoviesDetails();
}

const getMoviesDetails = () => {
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
            showInfo(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const showInfo = (data) => {
    let movies = [];
    console.log(data);

    data.forEach( function (value) {
        movies.push({
            id: value.id,
            widePosterURL: value.widePosterUrl,
            title: value.title,
            ageLimit: value.ageLimit,
            description: value.description,
            duration: value.duration,
            genres: value.genres
        });
    });

    movies = shuffle(movies);
    const moviesBox = document.getElementById('movie-card-box');

    movies.forEach((movie, index) => {
        const ref = document.createElement('a');
        ref.setAttribute('href', '/movie/'+movie.id);

        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const poster = document.createElement('div');
        poster.setAttribute('class','poster')
        const img = document.createElement('img');
        img.setAttribute('src', movie.widePosterURL);
        img.setAttribute('alt', 'bigLogo');
        poster.appendChild(img);

        const info = document.createElement('div');
        info.setAttribute('class', 'information');

        const title = document.createElement('h1');
        title.setAttribute('class','title');
        title.innerHTML = movie.title;
        info.appendChild(title);

        const ageLimit = document.createElement('p');
        ageLimit.setAttribute('class','age');
        const spanAgeLimit = document.createElement('span');
        spanAgeLimit.innerHTML = movie.ageLimit + '+';
        ageLimit.appendChild(spanAgeLimit);
        info.appendChild(ageLimit);

        const duration = document.createElement('p');
        duration.setAttribute('class','duration');
        const spanDuration = document.createElement('span');
        spanDuration.innerHTML = movie.duration + ' хв';
        duration.textContent = 'Тривалість: ';
        duration.appendChild(spanDuration);
        info.appendChild(duration);

        const genres = document.createElement('p');
        genres.setAttribute('class','genres');
        const spanGenres = document.createElement('span');
        genres.textContent = 'Жанр: ';

        const arrayOfGenres = movie.genres.map((value) => {
            return value.name;
        });
        spanGenres.innerHTML = arrayOfGenres.toString().replaceAll(',', ', ');
        genres.appendChild(spanGenres);
        info.appendChild(genres);

        const description = document.createElement('p');
        description.setAttribute('class','description');
        description.textContent = movie.description;
        info.appendChild(description);

        card.appendChild(poster);
        card.appendChild(info);
        ref.appendChild(card);
        moviesBox.appendChild(ref);
        console.log(ref);
    });
}