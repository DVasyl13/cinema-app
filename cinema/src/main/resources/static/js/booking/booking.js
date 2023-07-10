import initializeHeader from "../common/header-initializer.js";
import {getDate} from "../util/helpers.js";

let seats;
const seatContainer = document.querySelector(".row-container");
const totalPrice = document.getElementById("total-price");
const orderButton = document.getElementById("order-button");
const ticketPrice = 140;
const rows = 8;
const columns = 12;
let order = [];
let showtime;

document.querySelectorAll('.close-button').forEach(item => {
    item.addEventListener('click', event => {
        //handle click
    })
})

window.onload = () => {
    initializeHeader();
    getMovieInfo();
    initializeSeats();
    updateSelectedCount();
}

orderButton.addEventListener("click", () => {
    doOrder();
});

const initializeSeats = () => {
    const wrapper = document.getElementById('booking-box');



    // Ініціалізація сидінь
    let seatID = 1;
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        for (let j = 1; j <= columns; j++) {
            const seat = document.createElement("div");
            seat.setAttribute("class", "seat");
            seat.setAttribute("id", "seat-" + seatID);
            row.appendChild(seat);
            seatID += 1;
        }
        seatContainer.appendChild(row);
    }
    // Вже зайняті місця
    getOccupiedSeats();

    // Масив можливих сидінь
    seats = document.querySelectorAll(".row .seat:not(.occupied)");
}

async function getMovieInfo() {
    try {
        let href = window.location.href;
        let id = href
            .substring(href.lastIndexOf('/'))
            .replace(/[^\d.]/g, '');
        const response = await fetch('/api/v1/showtime/' + id);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        showtime = await response.json();
        initializePageDescription(showtime);
    } catch (e) {
        console.error("Error: " + e);
    }
}

const initializePageDescription = (data) => {
    const movieWrapper = document.getElementById('movie-box');

    const imageContainer = document.getElementById('image-container');
    const img = document.createElement('img');
    img.setAttribute('src', data.posterUrl);
    img.setAttribute('alt', 'movieLogo');
    imageContainer.appendChild(img);


    document.getElementById("movie-name").innerHTML = data.movieName;

    const cinemaSelect = document.getElementById("cinemas");
    const movieLocation = document.getElementById("location-text");
    movieLocation.innerHTML += cinemaSelect.options[cinemaSelect.selectedIndex].text + ", Зал № " + data.cinemaHallId;


    const date = new Date(data.startTime);
    var dayAndMonth = getDate(date,date,false);
    var year = date.getUTCFullYear();
    document.getElementById("date-text").innerHTML += dayAndMonth + " " + year;



    let minutes = new Date(data.startTime).getMinutes();
    let minutesStr = '' + minutes;
    if (minutes < 10) {
        minutesStr = '0' + minutes;
    }

    var movieTime = document.getElementById("time-text");
    var startTime = new Date(data.startTime);
    var endTime =  new Date(data.endTime);

    let startMinutesStr = '' + startTime.getMinutes();
    if (startTime.getMinutes() < 10) {
        startMinutesStr = '0' + startTime.getMinutes();
    }

    let endMinutesStr = '' + endTime.getMinutes();
    if (endTime.getMinutes() < 10) {
        endMinutesStr = '0' + endTime.getMinutes();
    }

    var startTimeStr = startTime.getHours() + ':' + startMinutesStr;
    var endTimeStr = endTime.getHours() + ':' + endMinutesStr;
    movieTime.innerHTML += startTimeStr + " - " + endTimeStr
}


async function getOccupiedSeats() {
    try {
        let href = window.location.href;
        let id = href
            .substring(href.lastIndexOf('/'))
            .replace(/[^\d.]/g, '');
        const response = await fetch('/api/v1/booking/showtime/' + id);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const responseJson = await response.json();

        const occupiesSeats = responseJson.flatMap((item) =>
            item.seats.map((seat) => seat.id.seatNumber)
        );
        initializeOccupiedSeats(occupiesSeats);
    } catch (e) {
        console.error("Error: " + e);
    }
}

const initializeOccupiedSeats = (data) => {
    data.forEach((value) => {
        const seat = document.getElementById("seat-" + value);
        seat.classList.add("occupied");
        if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
        }
    });
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".container .selected");

    let seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    });

    // Зберігає вибрані місця
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    let selectedSeatsCount = selectedSeats.length;
    totalPrice.textContent = selectedSeatsCount * ticketPrice + "";
}

// Додає токен selected до елементу масиву seatContainer на нажаття
seatContainer.addEventListener("click", function (e) {
    if (
        e.target.classList.contains("seat")
        && !e.target.classList.contains("occupied")
    ) {
        if (e.target.classList.toggle("selected")) {
            addElementToOrder(e);
        } else {
            removeElementFromOrder(e);
        }
        updateSelectedCount();
    }
});

const addElementToOrder = (e) => {
    const ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket");

    const ticketInfo = document.createElement("p");
    ticketInfo.setAttribute("class","ticket-info")
    const str = e.target.id;
    const seatId = str.replace(/\D/g, '');
    ticket.setAttribute("id", "order-seat-" + seatId);

    const rowSpan = document.createElement("span");
    rowSpan.setAttribute("class","ticket-row");
    const rowNumberSpan =  document.createElement("span");
    rowNumberSpan.setAttribute("class","ticket-row-number");

    const seatSpan = document.createElement("span");
    seatSpan.setAttribute("class","ticket-seat");
    const seatNumberSpan =  document.createElement("span");
    seatNumberSpan.setAttribute("class","ticket-seat-number");

    const priceSpan = document.createElement("span");
    priceSpan.setAttribute("class","ticket-price");


    const rowNumber = Math.ceil(seatId / columns);
    const seatNumber = (seatId % columns) == 0 ? columns : (seatId % columns);

    rowNumberSpan.innerHTML = rowNumber.toString();
    rowSpan.appendChild(rowNumberSpan);
    rowSpan.innerHTML += " ряд";

    seatNumberSpan.innerHTML = seatNumber.toString();
    seatSpan.appendChild(seatNumberSpan);
    seatSpan.innerHTML += " місце";

    priceSpan.innerHTML = ticketPrice + " грн";


    order.push({seatId: seatId, price: ticketPrice});

    const closeButton = document.createElement("span");
    closeButton.setAttribute("class","material-icons");
    closeButton.classList.add("close-button");
    closeButton.setAttribute("id", "close-order-seat-" + seatId);
    closeButton.innerHTML = "close";
    closeButton.addEventListener("click", function (e) {
        removeElementFromOrder(e);
    });

    ticketInfo.appendChild(closeButton)
    ticketInfo.appendChild(rowSpan);
    ticketInfo.appendChild(seatSpan);
    ticketInfo.appendChild(priceSpan);
    ticket.appendChild(ticketInfo);
    let ticketOrdersDiv = document.querySelector(".user-ticket-order");
    ticketOrdersDiv.appendChild(ticket);


}

const removeElementFromOrder = (e) => {
    let str = e.target.id;
    const seatId = str.replace(/\D/g, '');
    order = order.filter(a => a.seatId != seatId);
    document.getElementById("order-seat-" + seatId).remove();
    document.getElementById("seat-" + seatId).classList.remove("selected");

    //const totalPrice = parseInt(document.getElementById("total-price").innerHTML) - ticketPrice;
    updateSelectedCount();
}

const doOrder = () => {
    if (sessionStorage.getItem("id") == null) {
        console.log("User is not authorized");
        return;
    }

    if (order.length == 0) {
        console.log("Empty order");
        return;
    }

    const requestBody = {
        userId: sessionStorage.getItem("id"),
        showtimeId: showtime.id,
        userEmail: sessionStorage.getItem("email"),
        seats: order
    }
    console.log(requestBody);

    fetch('/api/v1/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            initializeOccupiedSeats(order.map(e => e.seatId));
            order = [];
            document.querySelector(".user-ticket-order").innerHTML = '';
            totalPrice.textContent = "0";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}