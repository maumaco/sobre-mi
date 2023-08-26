function setDefaultConfiguration() {
  setControlDisabled(document.getElementById(ID_PLAY_BUTTON), true);
  setControlDisabled(document.getElementById(ID_RESET_BUTTON), true);
  setControlValue(document.getElementById(ID_ROUNDS_INPUT), DEFAULT_ROUNDS);
}

function setControlDisabled(control, disabled) {
  control.disabled = disabled;
}

function setControlValue(control, value) {
  control.value = value;
}



function play() {
}