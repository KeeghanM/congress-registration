import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "./firebase";

export function getParticipants() {
  getDocs(
    query(
      collection(firestore, "participants"),
      where("user", "==", auth.currentUser.uid)
    )
  ).then((snapshot) => {
    // Build the list of Participants
    snapshot.forEach((doc) => {
      let data = doc.data();
      let div = document.createElement("div");
      let paidStatus = data.paid ? "Paid" : "Unpaid";
      div.innerHTML = `
      <p><strong>${data.firstname} ${data.lastname}</strong> - ${data.ecfnumber} - ${paidStatus} <button id="${doc.id}" class="participant-edit">Edit</button></p>
      `;
      document.querySelector("#participant-list").appendChild(div);
    });

    // Once built, attach click events
    Array.from(document.getElementsByClassName("participant-edit")).forEach(
      (btn) => {
        btn.addEventListener("click", () => {
          editParticipant(btn.id);
        });
      }
    );
  });
}

function editParticipant(id) {
  alert(id);
}
