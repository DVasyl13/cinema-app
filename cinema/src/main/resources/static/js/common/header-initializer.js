let arrayOfCinema = [];


const initializeHeader = () => {
    setAuthorizeButton();

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
            arrayOfCinema = data;
            initializeCinemaList(); // 1
            setCinemaSelector(); // 2
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const initializeCinemaList = () => {
    const cinemas = [];
    arrayOfCinema.forEach(function (value) {
        cinemas.push({id: value.id, address: value.address});
    });

    const cinemaHolder = document.getElementById('cinemas');
    cinemas.forEach((cinema) => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', ''+cinema.id);
        optionElement.innerHTML = cinema.address;

        cinemaHolder.appendChild(optionElement);
    });
}

//TODO: замінити
const setAuthorizeButton = () => {
    if (sessionStorage.getItem('id') != null ) {
        document.getElementById('main-login-button').remove();
        const button = document.createElement('button');
        button.setAttribute('id', 'user-button');
        button.innerHTML = sessionStorage.getItem('name');
        document.getElementById('header').appendChild(button);
    }
}


const setCinemaSelector = () => {
    if (sessionStorage.getItem('cinema-id') != null ) {
        console.log(sessionStorage.getItem('cinema-id'));
        const cinemaSelector = document.getElementById('cinemas');
        cinemaSelector.value = sessionStorage.getItem('cinema-id');
    }
}

export default initializeHeader