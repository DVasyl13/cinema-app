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
            arrayOfMovies = data;
            createSlider(arrayOfMovies)
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
const createSlider = (arrayOfMovies) => {
    arrayOfMovies.forEach( function (value, i) {
        sliderFrames.push({id: i, url: value.widePosterURL});
    });

    const sliderGroup = document.getElementById('swiper-wrapper');

    sliderFrames.forEach((image, index) => {
        const slider = document.createElement('div');
        slider.setAttribute('class', 'swiper-slide');
        const img = document.createElement('img');
        img.id = 'slide-'+index;
        img.src = image.url;
        img.alt = `Slide ${image.id}`;
        slider.appendChild(img);

        sliderGroup.appendChild(slider);
    });
}
export default initializeSlider