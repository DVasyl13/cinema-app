var loginBtn = document.getElementById("loginBtn");
var shadowBG = document.getElementById("backgroundPopup");

loginBtn.addEventListener('click', ()=>{
    document.querySelector(".loginPopup").style.display = "block";
    shadowBG.style.display = "block";
})


shadowBG.addEventListener('click', ()=>{
    document.querySelector(".loginPopup").style.display = "none";
    shadowBG.style.display = "none";
})

const submitContact = (event) => {

    let feadbackForm = event.target;

    let feadBack = Object.fromEntries(new FormData(feadbackForm));

    console.log(feadBack);
}