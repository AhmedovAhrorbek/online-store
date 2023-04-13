const elLoginForm = document.querySelector(".js-login-form");
const elLoginInput = document.querySelector(".js-login-input");
const elPasswordInput = document.querySelector(".js-password-input");

const API_PATH = "http://localhost:5000/user/login";

async function loginUser(){
    try {
        const res = await fetch(API_PATH, {
            method: "POST",
            body: new FormData(elLoginForm),
        });
        const data = await res.json();
        if(data.token){
            window.localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        }
        console.log(data);
       
    } catch (error) {
        console.log(error.message);
    }
}


elLoginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const login = elLoginInput.value;
    const password = elPasswordInput.value;
    const loginData = new FormData();
    loginData.append("email", login);
    loginData.append("password", password);
    
    loginUser();
});

export { API_PATH };