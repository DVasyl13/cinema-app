const loginBtn = document.getElementById("main-login-button");
const regBtn = document.getElementById("registration-popup-button");

const closeLoginFormBtn = document.getElementById("close-login-button");
const closeRegistrationFormBtn = document.getElementById("close-registration-button");

const loginFormPopUpButton = document.getElementById("login-form-button");

const cinemaSelect = document.getElementById("cinemas");

cinemaSelect.addEventListener("change", function() {
    sessionStorage.setItem('cinema-id', cinemaSelect.value);
    sessionStorage.setItem('cinema-address', cinemaSelect.options[cinemaSelect.selectedIndex].text);
});

const shadowBG = document.getElementById("background-popup");
const controlDisapearingBG = (flag) => {
    (flag)
        ? shadowBG.style.visibility = "visible"
        : shadowBG.style.visibility = "hidden";
}


loginBtn.addEventListener('click', () => {
    document.querySelector(".login-popup").classList.add("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(1);
});

regBtn.addEventListener('click', () => {
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.add("active");
});
closeLoginFormBtn.addEventListener('click', () => {
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0);
});
closeRegistrationFormBtn.addEventListener('click', () => {
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0);
});
shadowBG.addEventListener('click', () => {
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0);
})

loginFormPopUpButton.addEventListener('click', () => {
    document.querySelector(".login-popup").classList.add("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(1);
});

const resisterNewUser = () => {
    const label = document.getElementById('registration-label');

    const name = document.getElementById('registration-name').value;
    const surname = document.getElementById('registration-surname').value;
    const email = document.getElementById('registration-email').value;
    const password = document.getElementById('registration-password').value;
    const dubpassword = document.getElementById('repeat-password').value;
    if (name === '' || surname === '' || email === '' || password === '' || dubpassword === '') {
        label.innerHTML = '*Заповніть всі поля!';
        return;
    }
    else {
        label.innerHTML = '';
    }
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mailFormat.test(email)) {
        label.innerHTML = '';
    }
    else {
        label.innerHTML = '*Цей формат емейлу не відповідає нормам!';
        return;
    }

    if (password !== dubpassword) {
        label.innerHTML = '*Введені паролі не збігаються!';
        return;
    } else {
        label.innerHTML = '';
    }

    const data = {
        name: name,
        surname: surname,
        email: email,
        password: password
    }
    createNewUser(data);
}

const createNewUser = (data) => {

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
            setUserData(data);
            removePopUps();
        })
        .catch(error => {
            document.getElementById('registration-label').innerHTML='*Цей email вже зайнято!';
            console.error('Error:', error);
        });
}

const loginUser = () => {
    const label = document.getElementById('login-label');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        label.innerHTML = '*Заповніть всі поля!';
        return ;
    }
    else {
        label.innerHTML = '';
    }
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(mailFormat.test(email)) {
        label.innerHTML = '';
    }
    else {
        label.innerHTML = '*Цей формат емейлу не відповідає нормам!';
        return false;
    }
    const data = {
        email: email,
        password: password
    }
    verifyUser(data);
}

const verifyUser = (data) => {
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
            document.getElementById('login-label').innerHTML='';
            setUserData(data);
            removePopUps();
        })
        .catch(error => {
            document.getElementById('login-label').innerHTML='*Перевірте введені вами поля!';
            console.error('Error:', error);
        });

}

const setUserData = (response) => {
    sessionStorage.setItem('id', response.data.id);
    sessionStorage.setItem('name', response.data.name);
    location.reload();
}

const removePopUps = () => {
    document.querySelector(".login-popup").classList.remove("active");
    document.querySelector(".registration-popup").classList.remove("active");
    controlDisapearingBG(0);
}