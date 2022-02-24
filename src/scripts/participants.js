import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, firestore } from "./firebase";
import { handleError, switchPanels } from "./utils";

// Build the participant list
export function getParticipants() {
  document.querySelector("#participant-list").innerHTML = "";
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
      <p><strong>${data.firstname} ${data.lastname}</strong> - ${data.ecfnumber} - ${paidStatus} <button pid="${doc.id}" class="participant-edit">Edit</button><button pid="${doc.id}" class="participant-del" pName="${data.firstname}-${data.lastname}">Delete</button></p>
      `;
      document.querySelector("#participant-list").appendChild(div);
    });

    // Once built, attach click events
    Array.from(document.getElementsByClassName("participant-edit")).forEach(
      (btn) => {
        btn.addEventListener("click", () => {
          editParticipant(btn.getAttribute("pid"));
        });
      }
    );
    Array.from(document.getElementsByClassName("participant-del")).forEach(
      (btn) => {
        btn.addEventListener("click", () => {
          delParticipant(btn.getAttribute("pid"), btn.getAttribute("pName"));
        });
      }
    );
  });
}

// Add participant button loads a blank edit form
document
  .querySelector("#add-participant")
  .addEventListener("click", () => editParticipant());

// Cancel edit and return to list
document.querySelector("#cancel-edit").addEventListener("click", () => {
  document.querySelector("#participant-form").reset();
  switchPanels(
    document.querySelector("#participant-form-container"),
    document.querySelector("#participant-list-container")
  );
});

// Load the Participant Form
// If an id is passed in, load those details
// if no ID, load a blank form
function editParticipant(id) {
  if (id) {
    getDoc(doc(firestore, "participants", id))
      .then((doc) => {
        let data = doc.data();
        document.querySelector("#participant-id").value = id;
        document.querySelector("#participant-firstname").value = data.firstname;
        document.querySelector("#participant-lastname").value = data.lastname;
        document.querySelector("#participant-dob").value = data.dob;
        document.querySelector("#participant-ecf").value = data.ecfnumber;
        document.querySelector("#participant-rating").value = data.rating;
        document.querySelector("#participant-ratingcode").value =
          data.ratingcode;
        document.querySelector("#participant-address").value = data.address;

        switchPanels(
          document.querySelector("#participant-list-container"),
          document.querySelector("#participant-form-container")
        );
      })
      .catch((error) => handleError(error.message));
  } else {
    document.querySelector("#participant-form").reset();
    document.querySelector("#participant-id").value = "";
    switchPanels(
      document.querySelector("#participant-list-container"),
      document.querySelector("#participant-form-container")
    );
  }
}

// Confirm deletion of participant
function delParticipant(id, name) {
  let checkName = name.replace("-", " ");
  let result = prompt(
    "To confirm deletion, please type participant name: " + checkName
  );

  if (result?.toLowerCase() == checkName.toLowerCase()) {
    deleteDoc(doc(firestore, "participants", id))
      .then(() => {
        getParticipants();
      })
      .catch((error) => handleError(error.message));
  } else {
    if (result) alert("incorrect name");
  }
}

// Handle saving of participant form
document.querySelector("#participant-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector("#participant-form").hidden = true;
  document.querySelector("#saving-text").hidden = false;

  const formData = Object.fromEntries(new FormData(e.target));
  let id = formData["participant-id"];
  let congressId = "HRYCbLcqxOzIk4dXBZ0I";
  let userId = auth.currentUser.uid;
  let participant = {
    address: formData["participant-address"],
    congress: congressId,
    dob: formData["participant-dob"],
    ecfnumber: formData["participant-ecf"],
    firstname: formData["participant-firstname"],
    lastname: formData["participant-lastname"],
    rating: formData["participant-rating"],
    ratingcode: formData["participant-ratingcode"],
    user: userId,
  };

  if (id) {
    setDoc(doc(firestore, "participants", id), participant, {
      merge: true,
    })
      .then(formSaved)
      .catch((error) => handleError(error.message));
  } else {
    addDoc(collection(firestore, "participants"), participant)
      .then(formSaved)
      .catch((error) => handleError(error.message));
  }
});

function formSaved() {
  getParticipants();
  document.querySelector("#participant-form").hidden = false;
  document.querySelector("#saving-text").hidden = true;
  switchPanels(
    document.querySelector("#participant-form-container"),
    document.querySelector("#participant-list-container")
  );
}
