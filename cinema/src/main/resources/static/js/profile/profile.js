import initializeHeader from "../common/header-initializer.js";

const tabBtn = document.querySelectorAll(".tab");
const tab = document.querySelectorAll(".tabShow");
const profileButton = document.getElementById("profile-box-button");
const ticketButton = document.getElementById("ticket-box-button");
const profileBox = document.getElementById("profile-box");
const ticketBox = document.getElementById("ticket-box");

const firstNameChangeButton = document.getElementById("first-name-button");
const lastNameChangeButton = document.getElementById("last-name-button");
const emailChangeButton = document.getElementById("email-button");
const passwordChangeButton = document.getElementById("password-button");
const saveButton = document.getElementById("save-button");

let changedFields = [];
let changeFieldCounter = 0;


window.onload = function () {
    initializeHeader();
    getProfileDetails();
    initializePage();
    showProfileBox(1);
}
firstNameChangeButton.addEventListener('click', function (e) {

    if (e.target.classList.toggle("selected")) {
        document.getElementById("first-name").style.display = "none"
        document.getElementById("first-name-input").style.display = "block";
        changeFieldCounter--;
        updateSaveButton();
    } else {
        document.getElementById("first-name").style.display = "block"
        document.getElementById("first-name-input").style.display = "none";
        changeFieldCounter++;
        updateSaveButton();
    }


});
lastNameChangeButton.addEventListener('click', function (e) {

    if (e.target.classList.toggle("selected")) {
        document.getElementById("last-name").style.display = "none"
        document.getElementById("last-name-input").style.display = "block";
        changeFieldCounter--;
        updateSaveButton();
    } else {
        document.getElementById("last-name").style.display = "block"
        document.getElementById("last-name-input").style.display = "none";
        changeFieldCounter++;
        updateSaveButton();
    }
});
emailChangeButton.addEventListener('click', function (e) {

    if (e.target.classList.toggle("selected")) {
        document.getElementById("user-email").style.display = "none"
        document.getElementById("email-input").style.display = "block";
        changeFieldCounter--;
        updateSaveButton();
    } else {
        document.getElementById("user-email").style.display = "block"
        document.getElementById("email-input").style.display = "none";
        changeFieldCounter++;
        updateSaveButton();
    }
});
passwordChangeButton.addEventListener('click', function (e) {
    if (e.target.classList.toggle("selected")) {
        document.getElementById("user-password").style.display = "none"
        document.getElementById("password-input").style.display = "block";
        changeFieldCounter--;
        updateSaveButton();
    } else {
        document.getElementById("user-password").style.display = "block"
        document.getElementById("password-input").style.display = "none";
        changeFieldCounter++;
        updateSaveButton();
    }
});

saveButton.addEventListener('click', () => {
    /*document.getElementById("profile-box").style.height = "660px";
    saveButton.style.backgroundColor = "#fff";
    saveButton.style.height = "0";*/
    document.querySelectorAll('.change-input-field').forEach(field => {
        if (field.value != null && field.value != "") {
            changedFields.push({fieldName: field.id, fieldValue: field.value});
        }
    });
    console.log(changedFields);
    location.reload();
});

function updateSaveButton() {
    if (changeFieldCounter !== 0) {
        document.getElementById("profile-box").style.height = "700px";
        saveButton.style.height = "65px";
        saveButton.style.backgroundColor = "#0e224d";
    } else {
        document.getElementById("profile-box").style.height = "660px";
        saveButton.style.backgroundColor = "#fff";
        saveButton.style.height = "0";
    }

}

function initializePage() {
    const activeSection = window.location.href;
    /*const section = activeSection
        .substring(activeSection.lastIndexOf('/'))
        .replace(/[^\d.]/g, '');
    section === 'account' ? tabs(0): tabs(1);*/


}

async function getProfileDetails() {
    try {
        const data = {
            id: sessionStorage.getItem("id"),
            password: sessionStorage.getItem("password")
        };

        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('/api/v1/user', settings);
        const responseBody = await response.json();
        setUserDetails(responseBody.data);
        setTicketsDetails(responseBody.data.bookings);

    } catch (e) {
        console.error("Error: " + e);
    }
}

profileButton.addEventListener('click', () => {
    showProfileBox(1);
});
ticketButton.addEventListener('click', () => {
    showProfileBox(0);
});

function showProfileBox(flag) {
    if (flag === 1) {
        ticketBox.style.display = "none";
        ticketButton.style.backgroundColor = "#000";
        ticketButton.style.color = "#fff";
        profileBox.style.display = "block";
        profileButton.style.backgroundColor = "#fff";
        profileButton.style.color = "#000";

    } else {
        profileBox.style.display = "none";
        profileButton.style.backgroundColor = "#000";
        profileButton.style.color = "#fff";
        ticketBox.style.display = "block";
        ticketButton.style.backgroundColor = "#fff";
        ticketButton.style.color = "#000";
    }

}

const setUserDetails = (data) => {
    document.getElementById("first-name").innerHTML = data.name;
    document.getElementById("last-name").innerHTML = data.surname.toString();
    document.getElementById("user-email").innerHTML = data.email.toString();
}
const setTicketsDetails = (bookings) => {
    const ticketContainer = document.getElementById("ticket-container");
    bookings.forEach(ticket => {
        const ticketDiv = document.createElement("div");
        ticketDiv.setAttribute("class", "ticket");

        const ticketInfo = document.createElement("p");
        ticketInfo.setAttribute("class", "ticket-info");

        const ticketFilmName = document.createElement("span");
        ticketFilmName.setAttribute("class", "ticket-film-name");
        ticketFilmName.classList.add("ticket-field");
        // Film name
        ticketFilmName.innerHTML = "Люксембург, Люксембург";
        ticketInfo.appendChild(ticketFilmName);

        const ticketFilmDate = document.createElement("span");
        ticketFilmDate.setAttribute("class", "ticket-film-date");
        ticketFilmDate.classList.add("ticket-field");
        // Film date(with time)
        ticketFilmDate.innerHTML = "21 травня 2023 11:00";
        ticketInfo.appendChild(ticketFilmDate);

        const ticketRow = document.createElement("span");
        ticketRow.setAttribute("class", "ticket-row");
        ticketRow.classList.add("ticket-field");
        // Booking(row)
        ticketRow.innerHTML = "3";
        ticketInfo.appendChild(ticketRow);

        const ticketSeat = document.createElement("span");
        ticketSeat.setAttribute("class", "ticket-seat");
        ticketSeat.classList.add("ticket-field");
        // Booking(seat)
        ticketSeat.innerHTML = "9";
        ticketInfo.appendChild(ticketSeat);

        const ticketPrice = document.createElement("span");
        ticketPrice.setAttribute("class", "ticket-price");
        ticketPrice.classList.add("ticket-field");
        // Booking(price)
        ticketPrice.innerHTML = "140 грн";
        ticketInfo.appendChild(ticketPrice);

        ticketDiv.appendChild(ticketInfo);

        ticketContainer.appendChild(ticketDiv);

    });
    console.log(bookings);
}

