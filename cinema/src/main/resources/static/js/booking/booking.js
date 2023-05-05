let seats;
const seatContainer = document.querySelector(".row-container");
const total = document.getElementById("total");
const ticketPrice = 140;
const rows = 8;
const columns = 12;


window.onload = () => {
    getMovieInfo();
    initialize();
    //populateUI();
    updateSelectedCount();
}

const initialize = () => {
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
            seatID+=1;
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

const getMovieInfo = () => {
    try{
        // const response = async fetch("/");
        // const data = await response.json();
    } catch (e) {
        console.error("Error: " + e);
    }
}

// TEMP
const getOccupiedSeats = () => {
    const occupiesSeats = [];

    occupiesSeats.forEach((value) => {
        document.getElementById("seat-"+value).classList.add("occupied");
    });
}


function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".container .selected");

    seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat);
    });

    // Зберігає вибрані місця
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    let selectedSeatsCount = selectedSeats.length;
    total.textContent = selectedSeatsCount * ticketPrice +'';
}

// // Сетає вибрані раніше місця (при перезагрузці сторінки)
// function populateUI() {
//     const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
//
//     if (selectedSeats !== null && selectedSeats.length > 0) {
//         seats.forEach(function(seat, index) {
//             if (selectedSeats.indexOf(index) > -1) {
//                 seat.classList.add("selected");
//             }
//         });
//     }
// }


// Додає токен selected до елементу масиву seatContainer на нажаття
seatContainer.addEventListener("click", function(e) {
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

    const rowNumber = Math.ceil(seatId/columns);
    const seatNumber = (seatId % columns) == 0 ? 12 : (seatId % columns);

    row.innerHTML = "Ряд - " + rowNumber;
    seat.innerHTML = "Місце - " + seatNumber;

    orderElement.appendChild(row);
    orderElement.appendChild(seat);
    document.querySelector(".user-order").appendChild(orderElement);
}

const removeElementFromOrder = (e) => {
    let str = e.target.id;
    const seatId = str.replace(/\D/g, '');
    document.getElementById("order-seat-"+seatId).remove();
}