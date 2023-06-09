import {getDate, shuffle} from "../util/helpers.js";

let arrayOfMovies = [];

function initializeMovieCards ()  {
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
            console.log(data);
            arrayOfMovies = data;
            createMovieCards();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


const createMovieCards = () => {
    let movieCards = [];
    arrayOfMovies.forEach( function (value) {
        movieCards.push({
            id: value.id,
            posterURL: value.posterURL,
            title: value.title,
            ageLimit: value.ageLimit,
            duration: value.duration,
            genres: value.genres,
            releaseDate: value.releaseDate,
            startShowDate: value.startShowDate,
            endShowDate: value.endShowDate
        });
    });


    const movieFlexBox = document.getElementById('card-container');
    movieCards.forEach((movie, index) => {
        const ref = document.createElement('a');
        ref.setAttribute('href', '/movie/'+movie.id);

        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const img = document.createElement('img');
        img.src = movie.posterURL;
        img.alt = 'movie ' + index;
        card.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body')

        const filmTitle = document.createElement('h1');
        filmTitle.setAttribute('class','film-title')
        filmTitle.innerHTML = movie.title;
        cardBody.appendChild(filmTitle);

        const ageLimit = document.createElement('p');
        ageLimit.setAttribute('class', 'info-type');
        ageLimit.innerHTML = ''+movie.ageLimit+'+';
        cardBody.appendChild(ageLimit);


        const genre = document.createElement('p');
        genre.setAttribute('class', 'info-type');
        genre.innerHTML = 'Жанр';
        cardBody.appendChild(genre);

        const genres = document.createElement('p');
        const arrayOfGenres = movie.genres.map((value) => {
            return value.name;
        });
        genres.innerHTML = arrayOfGenres.toString().replaceAll(',', ', ');
        genres.setAttribute('class', 'description');
        cardBody.appendChild(genres);

        const duration = document.createElement('p');
        duration.setAttribute('class', 'info-type');
        duration.innerHTML = 'Тривалість';
        cardBody.appendChild(duration);


        const numOfMin = document.createElement('p');
        numOfMin.innerHTML = ''+movie.duration+' хв.';
        numOfMin.setAttribute('class', 'description');
        cardBody.appendChild(numOfMin);


        const date = document.createElement('p');
        date.setAttribute('class', 'date');
        date.innerHTML = getDate(movie.startShowDate,movie.endShowDate, 1);
        cardBody.appendChild(date);

        card.appendChild(cardBody);
        ref.appendChild(card);
        movieFlexBox.appendChild(ref);
    });
}

export default initializeMovieCards;