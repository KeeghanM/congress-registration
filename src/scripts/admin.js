import { collection, query, where, getDocs } from 'firebase/firestore'
import { firestore } from './firebase'
import { calculateAge, handleError, switchPanels } from './utils'

document.querySelector('#admin-btn').addEventListener('click', () => {
  document.querySelector('#admin-list').innerHTML = ''
  getDocs(
    query(
      collection(firestore, 'participants'),
      where('congress', '==', 'HRYCbLcqxOzIk4dXBZ0I')
    )
  )
    .then((snapshot) => {
      // Build the list of Participants
      let count = 0
      snapshot.forEach((doc) => {
        let data = doc.data()
        let div = document.createElement('div')
        let age = calculateAge(data.dob)
        let ratingLink = data.ratingcode
          ? `<a href="https://www.ecfrating.org.uk/v2/new/player.php?ECF_code=${data.ratingcode}" target="_blank">${data.ratingcode}</a>`
          : ''
        div.innerHTML = `
        <p>
            <strong>${data.firstname} ${data.lastname}</strong><br/>
            Age: ${age}<br/>
            ECF Code: ${ratingLink}<br/>
            ECF Member Number: ${data.ecfnumber}<br/>
            Rating: ${data.rating}<br/>
        </p>
      `
        document.querySelector('#admin-list').appendChild(div)
        count++
      })
      document.querySelector(
        '#admin-title'
      ).innerHTML = `Current Participants: ${count}`
    })
    .catch((error) => handleError(error.message))
  switchPanels(
    document.querySelector('#participant-list-container'),
    document.querySelector('#admin-list-container')
  )
})

document.querySelector('#admin-exit-btn').addEventListener('click', () => {
  switchPanels(
    document.querySelector('#admin-list-container'),
    document.querySelector('#participant-list-container')
  )
})
