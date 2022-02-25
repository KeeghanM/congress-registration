export function switchPanels(panelOut, panelIn) {
  panelOut.hidden = true
  panelIn.hidden = false
}

export function handleError(msg) {
  document.querySelector('#main').hidden = true
  document.querySelector('#error').hidden = false
  console.log(msg)
}

export function calculateAge(birthDate) {
  birthDate = new Date(birthDate)
  let otherDate = new Date()

  var years = otherDate.getFullYear() - birthDate.getFullYear()

  if (
    otherDate.getMonth() < birthDate.getMonth() ||
    (otherDate.getMonth() == birthDate.getMonth() &&
      otherDate.getDate() < birthDate.getDate())
  ) {
    years--
  }

  return years
}
