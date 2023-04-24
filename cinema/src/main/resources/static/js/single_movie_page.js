window.onload = function() {
    getMovieDetails();
}


const getMovieDetails = () => {
    let href = window.location.href;
    let id = href
        .substring(href.lastIndexOf('/'))
        .replace ( /[^\d.]/g, '' );

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

//[тимчасово]
//видалиться коли буде повна сторінка
const showInfo = (data) => {
    const mainDiv = document.getElementById('temp');

    const name = document.createElement('h1');
    name.innerHTML = data.title;
    mainDiv.appendChild(name);

    const img = document.createElement('img');
    img.setAttribute('src', data.posterURL)
    mainDiv.appendChild(img);

    const desc = document.createElement('p');
    desc.innerHTML = data.description;
    mainDiv.appendChild(desc);
}