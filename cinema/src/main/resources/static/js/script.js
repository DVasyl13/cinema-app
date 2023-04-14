var loginBtn = document.getElementById("loginBtn");
var shadowBG = document.getElementById("backgroundPopup");
var regBtn = document.getElementById("regPopupBtn");

loginBtn.addEventListener('click', ()=>{
    document.querySelector(".loginPopup").style.display = "block";
    controlDisapearingBG(1);
})

regBtn.addEventListener('click', ()=>{
    document.querySelector(".loginPopup").style.display = "none";
    document.querySelector(".regPopup").style.display = "block";
})

shadowBG.addEventListener('click', ()=>{
    document.querySelector(".loginPopup").style.display = "none";
    document.querySelector(".regPopup").style.display = "none";
    controlDisapearingBG(0);
})

const controlDisapearingBG = (flag) =>{
    (flag)
    ? shadowBG.style.display = "block"
    : shadowBG.style.display = "none";
}

const resisterNewUser = (event) => {

    let feadbackForm = event.target;

    let feadBack = Object.fromEntries(new FormData(feadbackForm));

    createNewUser(feadBack);
}

const createNewUser = (data) => {    

    console.log(data);

    if (data["Password"] != data["DupPassword"]) {
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
    console.log(data);

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