import initializeHeader from "../common/header-initializer.js";
import {getDate} from "../util/helpers.js";

window.onload = function () {
    initializeHeader();
    getMovieDetails();
}

const getMovieDetails = () => {
    let href = window.location.href;
    let id = href
        .substring(href.lastIndexOf('/'))
        .replace(/[^\d.]/g, '');

    fetch('/api/v1/movie/' + id, {
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
    const navigator = document.getElementById('movie-navigation');
    const navigatorTitle = document.createElement('span');
    navigatorTitle.setAttribute('class','nav-movie-title');
    navigatorTitle.innerHTML = data.title;
    navigator.appendChild(navigatorTitle);

    const wrapper = document.getElementById('movie-box');


    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('id', 'image-container');
    const img = document.createElement('img');
    img.setAttribute('src', data.posterURL);
    img.setAttribute('alt', 'movieLogo');
    imageContainer.appendChild(img);


    const info = document.createElement('div');
    info.setAttribute('class', 'info-section');


    const title = document.createElement('h1');
    title.setAttribute('class','movie-title');
    title.innerHTML = data.title;
    info.appendChild(title);


    const ageLimit = document.createElement('p');
    ageLimit.setAttribute('class','info-type');
    const spanAgeLimit = document.createElement('span');
    spanAgeLimit.setAttribute('class','description');
    spanAgeLimit.innerHTML = data.ageLimit + '+';
    ageLimit.textContent = 'Вік: '
    ageLimit.appendChild(spanAgeLimit);
    info.appendChild(ageLimit);

    const movieAge = document.createElement('p');
    movieAge.setAttribute('class','info-type');
    movieAge.textContent = 'Рік: '
    const spanMovieAge = document.createElement('span');
    spanMovieAge.setAttribute('class','description');
    spanMovieAge.innerHTML = new Date(data.releaseDate).getFullYear();
    movieAge.appendChild(spanMovieAge);
    info.appendChild(movieAge);


    const showTimePeriod = document.createElement('p');
    showTimePeriod.setAttribute('class','info-type');
    const spanShowTimePeriod = document.createElement('span');
    spanShowTimePeriod.setAttribute('class','description');
    spanShowTimePeriod.innerHTML = getDate(data.startShowDate, data.endShowDate);
    showTimePeriod.textContent = 'Період прокату: '
    showTimePeriod.appendChild(spanShowTimePeriod);
    info.appendChild(showTimePeriod);


    const genres = document.createElement('p');
    genres.setAttribute('class','info-type');
    const spanGenres = document.createElement('span');
    spanGenres.setAttribute('class','description');
    const arrayOfGenres = data.genres.map((value) => {
        return value.name;
    });
    spanGenres.innerHTML = arrayOfGenres.toString().replaceAll(',', ', ');
    genres.textContent = 'Жанр:';
    genres.appendChild(spanGenres);
    info.appendChild(genres);


    const duration = document.createElement('p');
    duration.setAttribute('class','info-type');
    const spanDuration = document.createElement('span');
    spanDuration.setAttribute('class','description');
    spanDuration.innerHTML = data.duration + ' хв';
    duration.textContent = 'Тривалість:';
    duration.appendChild(spanDuration);
    info.appendChild(duration);

    const director = document.createElement('p');
    director.setAttribute('class','info-type');
    const spanDirector = document.createElement('span');
    spanDirector.setAttribute('class','description');
    director.textContent = 'Режисер:';
    const arrayOfDirectors = data.directors.map((value) => {
        return value.name + ' ' + value.surname;
    });
    spanDirector.innerHTML = arrayOfDirectors.toString().replaceAll(',', ', ');
    director.appendChild(spanDirector);
    info.appendChild(director);

    if (data.actors.length != 0) {
        const actors = document.createElement('p');
        actors.setAttribute('class','info-type');
        const spanActors = document.createElement('span');
        spanActors.setAttribute('class','description');
        actors.textContent = 'У головних ролях: ';
        const arrayOfActors = data.actors.map((value) => {
            return value.name + ' ' + value.surname;
        });
        spanActors.innerHTML = arrayOfActors.toString().replaceAll(',', ', ');
        actors.appendChild(spanActors);
        info.appendChild(actors);
    }

    const description = document.createElement('p');
    description.setAttribute('id', 'movie-description');
    description.textContent =  data.description;
    info.appendChild(description);


    wrapper.appendChild(imageContainer);
    wrapper.appendChild(info);
}