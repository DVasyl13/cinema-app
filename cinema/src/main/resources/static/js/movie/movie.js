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
            initShowtimes(data.showtimes);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const showInfo = (data) => {
    const navigator = document.getElementById('movie-navigation');
    const navigatorTitle = document.createElement('span');
    navigatorTitle.setAttribute('class', 'nav-movie-title');
    navigatorTitle.innerHTML = data.title;
    navigator.appendChild(navigatorTitle);

    const wrapper = document.getElementById('movie-box');


    const imageContainer = document.createElement('div');
    imageContainer.setAttribute('id', 'image-container');
    const img = document.createElement('img');
    img.setAttribute('src', data.posterURL);
    img.setAttribute('alt', 'movieLogo');
    imageContainer.appendChild(img);


    const trailerUrl = document.createElement('a');
    trailerUrl.setAttribute('class', 'trailer-button');
    trailerUrl.setAttribute("href", data.trailerUrl);
    const trailerDiv = document.createElement('div');
    trailerDiv.setAttribute('class', 'trailer-description');
    const playIcon = document.createElement('span');
    playIcon.setAttribute('class', 'material-symbols-outlined');
    playIcon.classList.add("play-icon");
    playIcon.innerHTML = 'play_circle';
    const trailerSpan = document.createElement('span');
    trailerSpan.setAttribute('class', 'trailer-button-text');
    trailerSpan.innerHTML = 'Трейлер';
    trailerDiv.appendChild(playIcon);
    trailerDiv.appendChild(trailerSpan);
    trailerUrl.appendChild(trailerDiv);
    imageContainer.appendChild(trailerUrl);

    const ticket = document.createElement("div");

    const time = document.createElement("p");


    const info = document.createElement('div');
    info.setAttribute('class', 'info-section');


    const title = document.createElement('h1');
    title.setAttribute('class', 'movie-title');
    title.innerHTML = data.title;
    info.appendChild(title);


    const ageLimit = document.createElement('p');
    ageLimit.setAttribute('class', 'info-type');
    const spanAgeLimit = document.createElement('span');
    spanAgeLimit.setAttribute('class', 'description');
    spanAgeLimit.innerHTML = data.ageLimit + '+';
    ageLimit.textContent = 'Вік: '
    ageLimit.appendChild(spanAgeLimit);
    info.appendChild(ageLimit);

    const movieAge = document.createElement('p');
    movieAge.setAttribute('class', 'info-type');
    movieAge.textContent = 'Рік: '
    const spanMovieAge = document.createElement('span');
    spanMovieAge.setAttribute('class', 'description');
    spanMovieAge.innerHTML = new Date(data.releaseDate).getFullYear();
    movieAge.appendChild(spanMovieAge);
    info.appendChild(movieAge);


    const showTimePeriod = document.createElement('p');
    showTimePeriod.setAttribute('class', 'info-type');
    const spanShowTimePeriod = document.createElement('span');
    spanShowTimePeriod.setAttribute('class', 'description');
    spanShowTimePeriod.innerHTML = getDate(data.startShowDate, data.endShowDate, 1);
    showTimePeriod.textContent = 'Період прокату: '
    showTimePeriod.appendChild(spanShowTimePeriod);
    info.appendChild(showTimePeriod);


    const genres = document.createElement('p');
    genres.setAttribute('class', 'info-type');
    const spanGenres = document.createElement('span');
    spanGenres.setAttribute('class', 'description');
    const arrayOfGenres = data.genres.map((value) => {
        return value.name;
    });
    spanGenres.innerHTML = arrayOfGenres.toString().replaceAll(',', ', ');
    genres.textContent = 'Жанр:';
    genres.appendChild(spanGenres);
    info.appendChild(genres);


    const duration = document.createElement('p');
    duration.setAttribute('class', 'info-type');
    const spanDuration = document.createElement('span');
    spanDuration.setAttribute('class', 'description');
    spanDuration.innerHTML = data.duration + ' хв';
    duration.textContent = 'Тривалість:';
    duration.appendChild(spanDuration);
    info.appendChild(duration);

    const director = document.createElement('p');
    director.setAttribute('class', 'info-type');
    const spanDirector = document.createElement('span');
    spanDirector.setAttribute('class', 'description');
    director.textContent = 'Режисер:';
    const arrayOfDirectors = data.directors.map((value) => {
        return value.name + ' ' + value.surname;
    });
    spanDirector.innerHTML = arrayOfDirectors.toString().replaceAll(',', ', ');
    director.appendChild(spanDirector);
    info.appendChild(director);

    if (data.actors.length != 0) {
        const actors = document.createElement('p');
        actors.setAttribute('class', 'info-type');
        const spanActors = document.createElement('span');
        spanActors.setAttribute('class', 'description');
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
    description.textContent = data.description;
    info.appendChild(description);


    wrapper.appendChild(imageContainer);
    wrapper.appendChild(info);
}

const initShowtimes = (data) => {
    const cinemaId = sessionStorage.getItem("cinema-id");
    data = data.filter(a => a.cinemaId == cinemaId);
    console.log(data);

    const currentDate = new Date();
    const filteredData = data.filter(obj => new Date(obj.startTime) > currentDate);

    filteredData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    const result = filteredData.slice(0, 3);

    const ticketWrapper = document.querySelector(".tickets-wrapper");
    let href = window.location.href;
    let id = href
        .substring(href.lastIndexOf('/'))
        .replace(/[^\d.]/g, '');
    result.forEach((e) => {
        const ref = document.createElement("a");
        ref.setAttribute("class", "ticket");
        ref.setAttribute("href", "/movie/" + id + "/booking/" + e.id);

        const ticket = document.createElement("div");

        const date = document.createElement("p");
        date.setAttribute("class", "movie-date");
        date.innerHTML = getDate(e.startTime, e.endTime, 0);
        let minutes = new Date(e.startTime).getMinutes();
        let minutesStr = '' + minutes;
        if (minutes < 10) {
            minutesStr = '0' + minutes;
        }
        const time = document.createElement("p");
        time.setAttribute("class", "movie-time");
        time.innerHTML = new Date(e.startTime).getHours() + ':' + minutesStr;

        const price = document.createElement("p");
        price.setAttribute("class", "ticket-price");
        price.innerHTML = "140 грн";

        ticket.appendChild(date);
        ticket.appendChild(time);
        ticket.appendChild(price);
        ref.appendChild(ticket);
        ticketWrapper.appendChild(ref);
    });
}