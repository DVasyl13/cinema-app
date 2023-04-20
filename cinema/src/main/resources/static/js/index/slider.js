const sliderFrames = [];

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
            console.log('Calling from [getMovies()] => \n');
            console.log(data);
            arrayOfMovies = data;
            createSlider(arrayOfMovies);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
const createSlider = (arrayOfMovies) => {
    arrayOfMovies.forEach( function (value, i) {
        sliderFrames.push({id: i, url: value.widePosterURL});
    });

    const slider = document.getElementById('slider');
    const sliderNav = document.getElementById('slider-nav');

    sliderFrames.forEach((image, index) => {
        const img = document.createElement('img');
        img.id = 'slide-'+index;
        img.src = image.url;
        img.alt = `Slide ${image.id}`;

        const a = document.createElement('a');
        a.href = '#'+img.getAttribute('id');

        slider.appendChild(img);
        sliderNav.appendChild(a);
    });
}
export default initializeSlider