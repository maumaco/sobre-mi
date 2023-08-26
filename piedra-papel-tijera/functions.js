function setDefaultConfiguration() {
  setControlDisabled(document.getElementById(ID_ROUNDS_INPUT), true);
  setControlDisabled(document.getElementById(ID_PLAY_BUTTON), true);
  setControlDisabled(document.getElementById(ID_RESET_BUTTON), true);
  setControlValue(document.getElementById(ID_ROUNDS_INPUT), CONF_DEFAULT_ROUNDS);
}



function setControlDisabled(control, disabled) {
  if (control.disabled !== disabled) {
    control.disabled = disabled;
  }
}

function setControlValue(control, value) {
  if (control.value !== value) {
    control.value = value;
  }
}



function validateRounds(rounds) {
  let error = searchRoundsError(rounds);

  if (error) {
    setMessage(error);
    setControlDisabled(document.getElementById(ID_PLAY_BUTTON), true);
    validRounds = false;
  }
  else {
    setMessage('');
    if (validUserName) {
      setControlDisabled(document.getElementById(ID_PLAY_BUTTON), false);
    }
    validRounds = true;
  }
}
  
function validateUserName(userName) {
  let error = searchUserNameError(userName);

  if (error) {
    setMessage(error);
    setControlDisabled(document.getElementById(ID_ROUNDS_INPUT), true);
    setControlDisabled(document.getElementById(ID_PLAY_BUTTON), true);
    validUserName = false;
  }
  else {
    setMessage('');
    setControlDisabled(document.getElementById(ID_ROUNDS_INPUT), false);
    if (validRounds) {
      setControlDisabled(document.getElementById(ID_PLAY_BUTTON), false);
    }
    validUserName = true;
  }
}



function searchRoundsError(rounds) {
  rounds = rounds.trim();

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
  userName = userName.trim();

  if (userName.length === 0) {
    return ERR_VOID_NAME;
  }
  else if (userName.length > CONF_NAME_MAX_LENGTH) {
    return ERR_LONG_NAME;
  }
}



function setMessage(message) {
  if (message) {
    showMessage(message);
  }
  else {
    deleteMessage();
  }
}
    
function deleteMessage() {
  if (document.getElementById(ID_MESSAGE_TEXT).innerText !== '') {
    document.getElementById(ID_MESSAGE_TEXT).innerText = '';
  }
}

function showMessage(message) {
  if (document.getElementById(ID_MESSAGE_TEXT).innerText !== message) {
    document.getElementById(ID_MESSAGE_TEXT).innerText = message;
  }
}



function play() {
}