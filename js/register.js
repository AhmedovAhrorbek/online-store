// this is elon musk api nasa
const API_PATH = "http://localhost:5000/";

// get the form element
const elRegisterForm = document.querySelector(".js-register-form");
const elRegisterUsername = elRegisterForm.querySelector(".js-username");
const elRegisterPhone = elRegisterForm.querySelector(".js-phone");
const elRegisterEmail = elRegisterForm.querySelector(".js-email");
const elRegisterPassword = elRegisterForm.querySelector(".js-password");

// register a new user with the API
async function registerUser() {
    try {
        const res = await fetch(`${API_PATH}user/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: elRegisterUsername.value,
                phone: elRegisterPhone.value,
                email: elRegisterEmail.value,
                password: elRegisterPassword.value,
            }),
        });
        const data = await res.json();
        if (data) {
            window.localStorage.setItem("token", data.token);
            window.location.href = "login.html";
        }
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}

elRegisterForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    registerUser();
});
