let arrayOfCinema = [];
const cinemas = [];


const initializeHeader = () => {

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

const initializeCinemaList = () => {
    arrayOfCinema.forEach(function (value, i) {
        cinemas.push({id: i, address: value.address});
    });

    const cinemaHolder = document.getElementById('cinemas');
    cinemas.forEach((i) => {
        const a = document.createElement('a');
        a.href = '#';
        a.innerHTML = i.address;

        cinemaHolder.appendChild(a);
    });
}
export {initializeHeader};