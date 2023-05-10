import initializeHeader from "../common/header-initializer.js";

const tabBtn = document.querySelectorAll(".tab");
const tab = document.querySelectorAll(".tabShow");

window.onload = function () {
    initializeHeader();
    initializePage();
    getProfileDetails();
}

function initializePage () {
    const activeSection = window.location.href;
    const section = activeSection
        .substring(activeSection.lastIndexOf('/'))
        .replace(/[^\d.]/g, '');
    section === 'account' ? tabs(0): tabs(1);
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
        console.log(responseBody);
        setUserDetails(responseBody);

    } catch (e) {
        console.error("Error: " + e);
    }
}

function setUserDetails(data) {

}

function tabs(index){
    tab.forEach((node) => {
        node.style.display = "none";
    })
    tab[index].style.display = "block";
}