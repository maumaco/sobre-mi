// CONFIGURACIÓN


function setAppInitialConfiguration() {

  setControlDisabled(EL_ROUNDS_INPUT, true);
  setControlDisabled(EL_PLAY_BUTTON, true);
  setControlDisabled(EL_RESET_BUTTON, true);
  setControlSize(EL_ROUNDS_INPUT, CONF_DEFAULT_ROUNDS_INPUT_SIZE);
  setControlValue(EL_ROUNDS_INPUT, CONF_DEFAULT_ROUNDS);
  showMessage(MSG_CONFIGURE_NAME_AND_ROUNDS);
  EL_NAME_INPUT.focus();
}




// EVENTOS


function sanitizeControlValue(ev) {

  let value = ev.target.value.trim();
  value = value.replace(/\t+/g, ' ');
  value = value.replace(/ +/g, ' ');

  setControlValue(ev.target, value);
}


function validateRounds(ev) {

  let error = searchRoundsError(ev.target.value);

  if (error) {
    setControlDisabled(EL_NAME_INPUT, true);
    setControlDisabled(EL_PLAY_BUTTON, true);
    showMessage(error);
  }
  else {
    setControlDisabled(EL_NAME_INPUT, false);
    setControlDisabled(EL_PLAY_BUTTON, false);
    deleteMessage();
    EL_PLAY_BUTTON.focus();
  }
}


function validateUserName(ev) {

  let error = searchUserNameError(ev.target.value);

  if (error) {
    setControlDisabled(EL_ROUNDS_INPUT, true);
    setControlDisabled(EL_PLAY_BUTTON, true);
    showMessage(error);
  }
  else {
    setControlDisabled(EL_ROUNDS_INPUT, false);
    setControlDisabled(EL_PLAY_BUTTON, false);
    deleteMessage();
    setTextContent(EL_USER_NAME, EL_NAME_INPUT.value);
    EL_PLAY_BUTTON.focus();
  }
}




// CONTROLES


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




// ERRORES


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




// MENSAJES


function deleteMessage() {

  setTextContent(EL_MESSAGE_TEXT, '');
}


function setTextContent(node, text) {

  if (node.textContent !== text) {
    node.textContent = text;
  }
}


function showMessage(message) {

  setTextContent(EL_MESSAGE_TEXT, message);
}



















function playGame() {

  setGameConfiguration();

  playRound();
}


function setGameConfiguration() {
  setControlDisabled(EL_NAME_INPUT, true);
  setControlDisabled(EL_ROUNDS_INPUT, true);
  setControlDisabled(EL_PLAY_BUTTON, true);
  setControlDisabled(EL_RESET_BUTTON, false);

  userName = EL_NAME_INPUT.value;
  rounds = Number(EL_ROUNDS_INPUT.value);
  pointsToWin = (rounds + 1) / 2;
  userScore = 0;
  computerScore = 0;
}


function playRound(ev) {
  if (!ev) {
    addUserPlaysEventListeners();
    showMessage(MSG_DO_CLICK);
    showPlays(ARR_EL_USER_PLAYS);
    showPlays(ARR_EL_COMPUTER_PLAYS);
  }
  else {
    removeUserPlaysEventListeners();

    setUserPlay(ev.target.id);
  
    setComputerPlayTimeout = window.setTimeout(setComputerPlay, CONF_COMPUTER_PLAY_TIMEOUT_MS);
  
    setRoundResultTimeout = window.setTimeout(setRoundResult, CONF_ROUND_RESULT_TIMEOUT_MS);
  }
}


function addUserPlaysEventListeners() {
  for (let i = 0; i < ARR_EL_USER_PLAYS.length; i++) {
    ARR_EL_USER_PLAYS[i].addEventListener('click', playRound);
  }
}


function removeUserPlaysEventListeners() {
  for (let i = 0; i < ARR_EL_USER_PLAYS.length; i++) {
    ARR_EL_USER_PLAYS[i].removeEventListener('click', playRound);
  }
}


function hidePlays(els, play) {
  for (let i = 0; i < els.length; i++) {
    els[i].classList.remove(CLASS_FADE_IN);

    if (!els[i].id.includes(play)) {
      els[i].style.visibility = 'hidden';
      els[i].classList.add(CLASS_FADE_OUT);
    }
  }
}


function showPlays(els) {
  for (let i = 0; i < els.length; i++) {
    els[i].classList.remove(CLASS_FADE_OUT);
    els[i].style.visibility = 'visible';
    els[i].classList.add(CLASS_FADE_IN);
  }
}


function setUserPlay(id) {
  userPlay = getUserPlay(id);

  hidePlays(ARR_EL_USER_PLAYS, userPlay);
}


function getUserPlay(id) {
  for (let i = 0; i < ARR_PLAYS.length; i++) {

    if (id.includes(ARR_PLAYS[i])) {
      return ARR_PLAYS[i];
    }
  }
}


function setComputerPlay() {
  computerPlay = getComputerPlay();

  hidePlays(ARR_EL_COMPUTER_PLAYS, computerPlay);
}


function getComputerPlay() {
  return ARR_PLAYS[Math.floor(Math.random() * 3)];
}


function setRoundResult() {
  let roundWinner = setRoundWinner();

  if (!roundWinner) {
    showMessage(MSG_TIE_NO_POINTS);
    playRoundTimeout = window.setTimeout(playRound, CONF_PLAY_ROUND_TIMEOUT_MS);
  }
  else {
    switch (roundWinner) {
      case WIN_USER:
        setTextContent(EL_USER_SCORE, ++userScore);
        if (userScore === pointsToWin) {
          showMessage(MSG_USER_WINS);
          setAppLastConfiguration();
        }
        else {
          showMessage(MSG_USER_POINT);
          playRoundTimeout = window.setTimeout(playRound, CONF_PLAY_ROUND_TIMEOUT_MS);
        }
        break;
      case WIN_COMPUTER:
        setTextContent(EL_COMPUTER_SCORE, ++computerScore);
        if (computerScore === pointsToWin) {
          showMessage(MSG_COMPUTER_WINS);
          setAppLastConfiguration();
        }
        else {
          showMessage(MSG_COMPUTER_POINT);
          playRoundTimeout = window.setTimeout(playRound, CONF_PLAY_ROUND_TIMEOUT_MS);
        }
    }
  }
}


function setRoundWinner() {
  if (userPlay !== computerPlay) {
    if (userPlay === PLAY_ROCK && computerPlay === PLAY_SCISSORS ||
        userPlay === PLAY_PAPER && computerPlay === PLAY_ROCK ||
        userPlay === PLAY_SCISSORS && computerPlay === PLAY_PAPER) {
      return WIN_USER;
    }
    else {
      return WIN_COMPUTER;
    }
  }
}


function setAppLastConfiguration() {
  setControlDisabled(EL_NAME_INPUT, false);
  setControlDisabled(EL_ROUNDS_INPUT, false);
  setControlDisabled(EL_PLAY_BUTTON, false);
  setControlDisabled(EL_RESET_BUTTON, true);
  EL_PLAY_BUTTON.focus();
}


function resetAppConfiguration() {
  clearTimeout(setComputerPlayTimeout);
  clearTimeout(setRoundResultTimeout);
  clearTimeout(playRoundTimeout);
  removeUserPlaysEventListeners();
  deleteMessage();
  setTextContent(EL_USER_SCORE, 0);
  setTextContent(EL_COMPUTER_SCORE, 0);
  showPlays(ARR_EL_USER_PLAYS);
  showPlays(ARR_EL_COMPUTER_PLAYS);
  setAppLastConfiguration();
}