import "animate.css";
import "./scripts/login";

import { auth } from "./scripts/firebase";
import { signIn, signUserOut } from "./scripts/utils";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    signIn(user);
  }
});

document.querySelector("#signout-btn").addEventListener("click", (e) => {
  signUserOut();
});
