import "animate.css";
import { firestore, auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

let loginForm = document.querySelector("#login-form");
let loginFormContainer = document.querySelector("#login-form-container");
let participantForm = document.querySelector("#participant-form");
let participantFormContainer = document.querySelector(
  "#participant-form-container"
);

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  const email = formData["login-email"];
  const password = formData["login-password"];

  if (password.match("(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}")) {
    console.log(email);
  } else {
    console.log("Password invalid");
  }
  return;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      switchPanels(loginFormContainer, participantFormContainer);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
});

participantForm.addEventListener("submit", (e) => {
  e.preventDefault();
  switchPanels(participantFormContainer, loginFormContainer);
});

function switchPanels(panelOut, panelIn) {
  panelOut.hidden = true;
  panelIn.hidden = false;
}

var myInput = document.getElementById("login-password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

myInput.onfocus = function () {
  document.getElementById("passwordMessage").style.display = "block";
};

myInput.onblur = function () {
  document.getElementById("passwordMessage").style.display = "none";
};

myInput.onkeyup = function () {
  var lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  var upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};
