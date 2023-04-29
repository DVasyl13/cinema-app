import initializeHeader from "../common/header-initializer.js";


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
    title.innerHTML = data.title;
    info.appendChild(title);


    const ageLimit = document.createElement('p');
    const spanAgeLimit = document.createElement('span');
    spanAgeLimit.innerHTML = data.ageLimit + '+';
    ageLimit.textContent = 'Вік: '
    ageLimit.appendChild(spanAgeLimit);
    info.appendChild(ageLimit);


    const showTimePeriod = document.createElement('p');
    const spanShowTimePeriod = document.createElement('span');
    spanShowTimePeriod.innerHTML = getDate(data.startShowDate, data.endShowDate);
    showTimePeriod.textContent = 'Період прокату: '
    showTimePeriod.appendChild(spanShowTimePeriod);
    info.appendChild(showTimePeriod);


    const genres = document.createElement('p');
    const spanGenres = document.createElement('span');
    const arrayOfGenres = data.genres.map((value) => {
        return value.name;
    });
    spanGenres.innerHTML = arrayOfGenres.toString().replaceAll(',', ', ');
    genres.textContent = 'Жанр:';
    genres.appendChild(spanGenres);
    info.appendChild(genres);


    const duration = document.createElement('p');
    const spanDuration = document.createElement('span');
    spanDuration.innerHTML = data.duration + ' хв';
    duration.textContent = 'Тривалість:';
    duration.appendChild(spanDuration);
    info.appendChild(duration);

    const director = document.createElement('p');
    const spanDirector = document.createElement('span');
    director.textContent = 'Режисер:';
    const arrayOfDirectors = data.directors.map((value) => {
        return value.name + ' ' + value.surname;
    });
    spanDirector.innerHTML = arrayOfDirectors.toString().replaceAll(',', ', ');
    director.appendChild(spanDirector);
    info.appendChild(director);

    if (data.actors.length != 0) {
        const actors = document.createElement('p');
        const spanActors = document.createElement('span');
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

const getDate = (startDate,endDate) => {
    const monthString = ["cічня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"]
    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    const startMonth = monthString[startDateObject.getMonth()]
    const endMonth = monthString[endDateObject.getMonth()]
    const startDay = startDateObject.getDate();
    const endDay = endDateObject.getDate();
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
}