import { auth } from "./firebase.js";
import User from "./user.js";
import { signOut } from "firebase/auth";

export function switchPanels(panelOut, panelIn) {
  panelOut.hidden = true;
  panelIn.hidden = false;
}

export function signIn(user) {
  User.userId = user.uid;
  switchPanels(
    document.querySelector("#login-form-container"),
    document.querySelector("#participant-form-container")
  );
  document.querySelector("#signout-btn").hidden = false;
}

export function signUserOut(user) {
  signOut(auth).then(() => {
    document.querySelector("#signout-btn").hidden = true;
    switchPanels(
      document.querySelector("#participant-form-container"),
      document.querySelector("#login-form-container")
    );
  });
}

export function handleError(msg) {
  alert(msg);
}
