//// CONFIGURACIÓN DE LA APLICACIÓN Y LA PARTIDA ////


// Se ejecuta una sola vez al cargar la aplicación

function setAppInitialConfiguration() {

  setControlDisabled(EL_ROUNDS_INPUT, true);
  setControlDisabled(EL_PLAY_BUTTON, true);
  setControlDisabled(EL_RESET_BUTTON, true);
  setInputSize(EL_ROUNDS_INPUT, CONF_ROUNDS_INPUT_SIZE);
  setInputValue(EL_ROUNDS_INPUT, CONF_ROUNDS);

  showMessage(MSG_CONFIGURE_NAME_AND_ROUNDS);

  EL_NAME_INPUT.focus();
}


// Se ejecuta al finalizar o reiniciar una partida

function setAppLastConfiguration() {

  setControlDisabled(EL_RESET_BUTTON, true);
  setControlDisabled(EL_NAME_INPUT, false);
  setControlDisabled(EL_ROUNDS_INPUT, false);
  setControlDisabled(EL_PLAY_BUTTON, false);

  EL_PLAY_BUTTON.focus();
}


// Detiene los temporizadores y remueve los controladores de eventos
// Se ejecuta al hacer clic en el botón "Reiniciar"

function resetAppConfiguration() {

  clearTimeout(setComputerPlayTimeout);
  clearTimeout(setRoundResultTimeout);
  clearTimeout(playRoundTimeout);

  removeUserPlaysEventListeners();

  deleteMessage();

  setTextContent(EL_USER_SCORE, 0);
  setTextContent(EL_COMPUTER_SCORE, 0);

  showPlayImages(ARR_USER_PLAY_IMAGES);
  showPlayImages(ARR_COMPUTER_PLAY_IMAGES);

  setAppLastConfiguration();
}


// Se ejecuta al iniciar cada partida

function setGameConfiguration() {

  setControlDisabled(EL_NAME_INPUT, true);
  setControlDisabled(EL_ROUNDS_INPUT, true);
  setControlDisabled(EL_PLAY_BUTTON, true);
  setControlDisabled(EL_RESET_BUTTON, false);

  rounds = Number(EL_ROUNDS_INPUT.value);
  pointsToWin = (rounds + 1) / 2;
  userScore = 0;
  computerScore = 0;
}



//// SANEAMIENTO, BÚSQUDA DE ERRORES y VALIDACIÓN ////


// Elimina los espacios iniciales y finales, las tabulaciones y reemplaza los espacios múltiples
// Se ejecuta al cambiar el valor de las entradas de texto "Nombre" y "Rondas"

function sanitizeInputValue(ev) {

  let value = ev.target.value.trim();
  value = value.replace(/\t+/g, ' ');
  value = value.replace(/ +/g, ' ');

  setInputValue(ev.target, value);
}


// Evalúa si el valor de "Nombre" está vacío o es muy largo

function searchUserNameError(userName) {

  if (userName.length === 0) {
    return ERR_VOID_NAME;
  }
  else if (userName.length > CONF_NAME_MAX_LENGTH) {
    return ERR_LONG_NAME;
  }
}


// Evalúa si el valor de "Rondas" está vacío, no es un número, está fuera de rango o es par

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


// Se ejecuta al cambiar el valor de la entrada de texto "Nombre"

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


// Se ejecuta al cambiar el valor de la entrada de texto "Rondas"

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



//// MANEJO DE CONTROLES (BOTONES Y ENTRADAS DE TEXTO) ////


// El estado de los controles se modifica solo si el nuevo estado es diferente del actual

function setControlDisabled(control, disabled) {

  if (control.disabled !== disabled) {
    control.disabled = disabled;
  }
}


function setInputSize(input, size) {

  if (input.size !== size) {
    input.size = size;
  }
}


function setInputValue(input, value) {

  if (input.value !== value) {
    input.value = value;
  }
}



//// MANEJO DE MENSAJES ////


// El texto del elemento se modifica solo si el nuevo texto es diferente del actual

function setTextContent(node, text) {

  if (node.textContent !== text) {
    node.textContent = text;
  }
}


function showMessage(message) {

  setTextContent(EL_MESSAGE_TEXT, message);
}


function deleteMessage() {

  setTextContent(EL_MESSAGE_TEXT, '');
}



//// MANEJO DE LAS IMÁGENES DE LAS JUGADAS (PAPER, ROCK Y SCISSORS) ////


// Visibiliza las imágenes de las tres jugadas posibles

function showPlayImages(playImages) {

  for (let i = 0; i < playImages.length; i++) {
    playImages[i].classList.remove(CLASS_IMAGE_FADE_OUT);
    playImages[i].style.visibility = 'visible';
    playImages[i].classList.add(CLASS_IMAGE_FADE_IN);
  }
}


// Mantiene visible la imagen de la jugada seleccionada y oculta las otras dos

function hidePlayImages(playImages, play) {

  for (let i = 0; i < playImages.length; i++) {
    playImages[i].classList.remove(CLASS_IMAGE_FADE_IN);

    if (!playImages[i].id.includes(play)) {
      playImages[i].style.visibility = 'hidden';
      playImages[i].classList.add(CLASS_IMAGE_FADE_OUT);
    }
  }
}



//// ADJUNCIÓN Y REMOCIÓN DE CONTROLADORES DE EVENTOS ////


// Se ejecuta al iniciar cada ronda, antes de que el usuario seleccione su jugada

function addUserPlaysEventListeners() {

  for (let i = 0; i < ARR_USER_PLAY_IMAGES.length; i++) {
    ARR_USER_PLAY_IMAGES[i].addEventListener('click', playRound);
  }
}


// Se ejecuta cuando el usuario selecciona su jugada o hace clic en el botón "Reiniciar"

function removeUserPlaysEventListeners() {

  for (let i = 0; i < ARR_USER_PLAY_IMAGES.length; i++) {
    ARR_USER_PLAY_IMAGES[i].removeEventListener('click', playRound);
  }
}



//// EJECUCIÓN DEL LA PARTIDA Y LAS RONDAS ////


// Inicia la partida
// Se ejecuta al hacer clic en el botón "¡Jugar!"

function playGame() {

  setGameConfiguration();

  playRound();
}


// Ejecuta cada ronda
// Puede recibir como argumento el evento "onclick" de las imágenes de las jugadas del usuario
// Si es llamada por playGame() o setRoundResult(), no recibe argumento y solo inicia la ronda
// Si es llamada por la selección del usuario, recibe el evento y continúa la ronda hasta finalizarla

function playRound(ev) {

  if (!ev) {
    showPlayImages(ARR_USER_PLAY_IMAGES);
    showPlayImages(ARR_COMPUTER_PLAY_IMAGES);

    addUserPlaysEventListeners();

    showMessage(MSG_DO_CLICK);
  }
  else {
    removeUserPlaysEventListeners();

    setUserPlay(ev.target.id);
    setComputerPlayTimeout = window.setTimeout(setComputerPlay, CONF_COMPUTER_PLAY_TIMEOUT_MS);
    setRoundResultTimeout = window.setTimeout(setRoundResult, CONF_ROUND_RESULT_TIMEOUT_MS);
  }
}


// Obtiene la jugada del usuario a partir del id de la imagen de la jugada seleccionada

function getUserPlay(id) {

  for (let i = 0; i < ARR_PLAYS.length; i++) {

    if (id.includes(ARR_PLAYS[i])) {
      return ARR_PLAYS[i];
    }
  }
}


// Establece la jugada seleccionada por el usuario y oculta las imágenes de las otras dos

function setUserPlay(id) {

  userPlay = getUserPlay(id);

  hidePlayImages(ARR_USER_PLAY_IMAGES, userPlay);
}


// Obtiene la jugada de la computadora en función de un número entero generado aleatoriamente

function getComputerPlay() {

  return ARR_PLAYS[Math.floor(Math.random() * 3)];
}


// Establece la jugada seleccionada por la computadora y oculta las imágenes de las otras dos

function setComputerPlay() {

  computerPlay = getComputerPlay();

  hidePlayImages(ARR_COMPUTER_PLAY_IMAGES, computerPlay);
}


// Obtiene el ganador de la ronda (si lo hay)

function getRoundWinner() {

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


// Establece el resultado de cada ronda, incrementa los marcadores y ejecuta la siguiente ronda
// Si el usuario o la computadora alcanzan los puntos para ganar, finaliza la partida

function setRoundResult() {

  let roundWinner = getRoundWinner();

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