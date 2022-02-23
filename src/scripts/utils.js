export function switchPanels(panelOut, panelIn) {
  panelOut.hidden = true;
  panelIn.hidden = false;
}

export function handleError(msg) {
  alert(msg);
}
