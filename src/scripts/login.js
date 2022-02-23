import { auth, firestore } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { handleError, switchPanels } from "./utils";
import { getParticipants } from "./participants.js";

// Check if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    signIn(user);
  }
});

// Handle signout button
document.querySelector("#signout-btn").addEventListener("click", (e) => {
  signOut(auth).then(() => {
    document.querySelector("#signout-btn").hidden = true;
    switchPanels(
      document.querySelector("#participant-list-container"),
      document.querySelector("#login-form-container")
    );
  });
});

// Login form submission
document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  const email = formData["login-email"];
  const password = formData["login-password"];

  if (password.match("(?=.*[a-z])(?=.*[A-Z]).{8,}")) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        signIn(userCredential.user);
      })
      .catch((error) => {
        if (error.code == "auth/user-not-found") {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              let user = userCredential.user;
              setDoc(doc(firestore, "users", user.uid), {
                email: user.email,
              })
                .then(() => {
                  signIn(user);
                })
                .catch((error) => {
                  handleError(error.message);
                });
            })
            .catch((error) => {
              handleError(error.message);
            });
        } else {
          handleError(error.message);
        }
      });
  } else {
    document.getElementById("passwordMessage").style.display = "block";
    checkPassword();
  }
  return;
});

// Password Validation Display
let loginPasswordField = document.getElementById("login-password");
loginPasswordField.onkeyup = () => checkPassword();

function checkPassword() {
  let letter = document.getElementById("letter");
  let capital = document.getElementById("capital");
  let number = document.getElementById("number");
  let length = document.getElementById("length");
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  if (loginPasswordField.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  if (loginPasswordField.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  if (loginPasswordField.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  if (loginPasswordField.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

export function signIn() {
  switchPanels(
    document.querySelector("#login-form-container"),
    document.querySelector("#participant-list-container")
  );
  document.querySelector("#signout-btn").hidden = false;
  getParticipants();
}
