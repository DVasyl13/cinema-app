const loginFormPopUpButton = document.getElementById("login-form-button");

const loginBtn = document.getElementById("main-login-button");
const regBtn = document.getElementById("registration-popup-button");

const shadowBG = document.getElementById("background-popup");

const closeLoginFormBtn  = document.getElementById("close-login-button");
const closeRegistrationFormBtn  = document.getElementById("close-registration-button");
loginBtn.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.add("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(1);
})

regBtn.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.add("active");
})
closeLoginFormBtn.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0)
})
closeRegistrationFormBtn.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0)
})
shadowBG.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0)
})
loginFormPopUpButton.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.add("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(1);
})

const controlDisapearingBG = (flag) =>{
    (flag)
    ? shadowBG.style.visibility = "visible"
    : shadowBG.style.visibility = "hidden";
}

const resisterNewUser = (event) => {
    let feadbackForm = event.target;
    let feadBack = Object.fromEntries(new FormData(feadbackForm));
    createNewUser(feadBack);
}
const createNewUser = (data) => {
    if (data["password"] !== data["repeat-password"]) {
        //TODO вивести повідомлення в формі про те що паролі не збігаються
        return;
    }
    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const loginUser = (event) => {
    let feadbackForm = event.target;
    let feadBack = Object.fromEntries(new FormData(feadbackForm));
    verifyUser(feadBack);
}
const verifyUser = (data) => {
    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

let arrayOfMovies = [];
let arrayOfCinema = [];
const sliderFrames = [];
const cinemas = [];

window.onload = function() {
    getMovies();
    getCinemas();
}

const getMovies = () => {
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
            initializeSlider();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
const getCinemas = () => {

    fetch('/api/v1/cinema', {
        method: 'Get'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Calling from [getCinemas()] => \n')
            console.log(data);
            arrayOfCinema = data;
            initializeCinemaList();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const initializeSlider = () => {
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

const initializeCinemaList = () => {
    arrayOfCinema.forEach( function (value, i) {
        cinemas.push({id: i, address: value.address});
    });
    console.log(cinemas);

    const cinemaHolder = document.getElementById('cinemas');
    cinemas.forEach((i, index) => {
        const a = document.createElement('a');
        a.href = '#';
        a.innerHTML = i.address;

        cinemaHolder.appendChild(a);
    });
}