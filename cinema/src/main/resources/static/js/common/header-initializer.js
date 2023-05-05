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
            console.log(data);
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

const setAuthorizeButton = () => {
    if (sessionStorage.getItem('id') != null ) {
        document.getElementById('main-login-button').hidden = true;
        const button = document.getElementById('user-button');
        button.hidden = false;
        button.innerHTML = sessionStorage.getItem('name');
    }
}


const setCinemaSelector = () => {
    if (sessionStorage.getItem('cinema-id') != null ) {
        const cinemaSelector = document.getElementById('cinemas');
        cinemaSelector.value = sessionStorage.getItem('cinema-id');
    } else {
        console.log(cinemaSelect.value);
        sessionStorage.setItem('cinema-id', cinemaSelect.value);
        sessionStorage.setItem('cinema-address', cinemaSelect.options[cinemaSelect.selectedIndex].text);
    }
}

export default initializeHeader