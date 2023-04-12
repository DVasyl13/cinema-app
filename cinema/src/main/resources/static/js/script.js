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

const submitContact = (event) => {

    let feadbackForm = event.target;

    let feadBack = Object.fromEntries(new FormData(feadbackForm));

    console.log(feadBack);
}

const controlDisapearingBG = (flag) =>{
    (flag) 
    ? shadowBG.style.display = "block" 
    : shadowBG.style.display = "none";
}