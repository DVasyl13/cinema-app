let arrayOfMovies = []
const movieCards = [];




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
            console.log('Calling from [getMovies()] => \n');
            console.log(data);
            arrayOfMovies = data;
            createMovieCards();
            /*initializeSlider();*/
        })
        .catch(error => {
            console.error('Error:', error);
        });
    return arrayOfMovies;
}


const createMovieCards = () => {
    arrayOfMovies.forEach( function (value, i) {
        movieCards.push({
            id: i,
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
        date.innerHTML = getDate(movie.startShowDate,movie.endShowDate);
        cardBody.appendChild(date);

        card.appendChild(cardBody);
        movieFlexBox.appendChild(card);
    });
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

export default initializeMovieCards;