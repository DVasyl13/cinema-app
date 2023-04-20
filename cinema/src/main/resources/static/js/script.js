const loginFormPopUpButton = document.getElementById("login-form-button");

const loginBtn = document.getElementById("main-login-button");
const regBtn = document.getElementById("registration-popup-button");

const shadowBG = document.getElementById("background-popup");

const closeLoginFormBtn  = document.getElementById("close-login-button");
const closeRegistrationFormBtn  = document.getElementById("close-registration-button");
loginBtn.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.add("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(1);
})

regBtn.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.add("active");
})
closeLoginFormBtn.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0)
})
closeRegistrationFormBtn.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0)
})
shadowBG.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0)
})
loginFormPopUpButton.addEventListener('click', ()=>{
    document.querySelector(".login-popup").classList.add("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(1);
})
const controlDisapearingBG = (flag) =>{
    (flag)
        ? shadowBG.style.visibility = "visible"
        : shadowBG.style.visibility = "hidden";
}

const resisterNewUser = (event) => {

    let feadbackForm = event.target;

    let feadBack = Object.fromEntries(new FormData(feadbackForm));

    createNewUser(feadBack);
}

const createNewUser = (data) => {

    console.log(data);

    if (data["password"] !== data["repeat-password"]) {
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