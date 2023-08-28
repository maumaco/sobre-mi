function setDefaultConfiguration() {
  setControlDisabled(document.getElementById(ID_ROUNDS_INPUT), true);
  setControlDisabled(document.getElementById(ID_PLAY_BUTTON), true);
  setControlDisabled(document.getElementById(ID_RESET_BUTTON), true);
  setControlSize(document.getElementById(ID_ROUNDS_INPUT), CONF_DEFAULT_ROUNDS_INPUT_SIZE);
  setControlValue(document.getElementById(ID_ROUNDS_INPUT), CONF_DEFAULT_ROUNDS);
}



function setControlDisabled(control, disabled) {
  if (control.disabled !== disabled) {
    control.disabled = disabled;
  }
}

function setControlSize(control, size) {
  if (control.size !== size) {
    control.size = size;
  }
}

function setControlValue(control, value) {
  if (control.value !== value) {
    control.value = value;
  }
}

function setTextContent(node, text) {
  if (node.textContent !== text) {
    node.textContent = text;
  }
}



function validateRounds(rounds) {
  let error = searchRoundsError(rounds);

  if (error) {
    setControlDisabled(document.getElementById(ID_NAME_INPUT), true);
    setControlDisabled(document.getElementById(ID_PLAY_BUTTON), true);
    setMessage(error);
  }
  else {
    setControlDisabled(document.getElementById(ID_NAME_INPUT), false);
    setControlDisabled(document.getElementById(ID_PLAY_BUTTON), false);
    setMessage('');
    document.getElementById(ID_PLAY_BUTTON).focus();
  }
}

function validateUserName(userName) {
  let error = searchUserNameError(userName);

  if (error) {
    setControlDisabled(document.getElementById(ID_ROUNDS_INPUT), true);
    setControlDisabled(document.getElementById(ID_PLAY_BUTTON), true);
    setMessage(error);
  }
  else {
    setControlDisabled(document.getElementById(ID_ROUNDS_INPUT), false);
    setControlDisabled(document.getElementById(ID_PLAY_BUTTON), false);
    setMessage('');
    setTextContent(document.getElementById(ID_USER_NAME), userName);
    document.getElementById(ID_PLAY_BUTTON).focus();
  }
}



function searchRoundsError(rounds) {
  if (rounds.length === 0) {
    return ERR_VOID_ROUNDS;
  }
  else if (rounds.search(/[^0-9]/) > -1) {
    return ERR_NOT_DIGIT;
  }

  rounds = Number(rounds);

  if (rounds < CONF_MIN_ROUNDS) {
    return ERR_MIN_ROUNDS;
  }
  else if (rounds > CONF_MAX_ROUNDS) {
    return ERR_MAX_ROUNDS;
  }
  else if (rounds % 2 === 0) {
    return ERR_EVEN_ROUNDS;
  }
}

function searchUserNameError(userName) {
  if (userName.length === 0) {
    return ERR_VOID_NAME;
  }
  else if (userName.length > CONF_NAME_MAX_LENGTH) {
    return ERR_LONG_NAME;
  }
}



function sanitizeControlValue(control) {
  let value = control.value.trim();
  value = value.replace(/\t+/g, ' ');
  value = value.replace(/ +/g, ' ');

  setControlValue(control, value);
}



function setMessage(message) {
  if (message) {
    showMessage(message);
  }
  else {
    deleteMessage();
  }
}

function showMessage(message) {
  setTextContent(document.getElementById(ID_MESSAGE_TEXT), message);
}

function deleteMessage() {
  setTextContent(document.getElementById(ID_MESSAGE_TEXT), '');
}



function play() {
}