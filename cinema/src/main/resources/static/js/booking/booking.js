import initializeHeader from "../common/header-initializer.js";
import {getDate} from "../util/helpers.js";

let seats;
const seatContainer = document.querySelector(".row-container");
const total = document.getElementById("total");
const orderButton = document.getElementById("order-button");
const ticketPrice = 140;
const rows = 8;
const columns = 12;
let order = [];
let showtime;

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
    // Ціна з константи
    document.getElementById("price").innerHTML += ticketPrice;
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
    document.getElementById("movie-name").innerHTML = data.movieName;
    let minutes = new Date(data.startTime).getMinutes();
    let minutesStr = '' + minutes;
    if (minutes < 10) {
        minutesStr = '0' + minutes;
    }
    document.getElementById("showtime-period").innerHTML =
        getDate(data.startTime, data.endTime, 0) + ' '
        + new Date(data.startTime).getHours() + ':' + minutesStr;
    document.getElementById("cinema-hall").innerHTML = 'Зал №' + data.cinemaHallId;
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
    total.textContent = selectedSeatsCount * ticketPrice + '';
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
    const orderElement = document.createElement("div");
    orderElement.setAttribute("class", "order-element");

    const str = e.target.id;
    const seatId = str.replace(/\D/g, '');
    orderElement.setAttribute("id", "order-seat-" + seatId);

    const row = document.createElement("p");
    const seat = document.createElement("p");

    const rowNumber = Math.ceil(seatId / columns);
    const seatNumber = (seatId % columns) == 0 ? columns : (seatId % columns);

    row.innerHTML = "Ряд - " + rowNumber;
    seat.innerHTML = "Місце - " + seatNumber;

    order.push({seatId: seatId, price: ticketPrice});

    orderElement.appendChild(row);
    orderElement.appendChild(seat);
    document.querySelector(".user-order").appendChild(orderElement);
}

const removeElementFromOrder = (e) => {
    let str = e.target.id;
    const seatId = str.replace(/\D/g, '');
    document.getElementById("order-seat-" + seatId).remove();
}

const doOrder = () => {
    if (sessionStorage.getItem("id") == null) {
        console.log("User is not authorized");
        return;
    }

    if (order.length == 0) {
        console.log("Empty order")
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
            document.querySelector(".user-order").textContent = '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}