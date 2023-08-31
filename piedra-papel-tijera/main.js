// Declaramos las variables globales

let computerPlay;
let computerScore;
let pointsToWin;
let rounds;
let userPlay;
let userScore;

let playRoundTimeout;
let setComputerPlayTimeout;
let setRoundResultTimeout;


// Establecemos la configuración inicial de la aplicación

setAppInitialConfiguration();


// Adjuntamos los controladores de eventos de la entrada de texto "Nombre"

EL_NAME_INPUT.addEventListener('change', sanitizeInputValue);

EL_NAME_INPUT.addEventListener('change', validateUserName);

EL_NAME_INPUT.addEventListener('click', function (ev) {
  ev.target.select();
});


// Adjuntamos los controladores de eventos de la entrada de texto "Rondas"

EL_ROUNDS_INPUT.addEventListener('change', sanitizeInputValue);

EL_ROUNDS_INPUT.addEventListener('change', validateRounds);

EL_ROUNDS_INPUT.addEventListener('click', function (ev) {
  ev.target.select();
});


// Adjuntamos los controladores de eventos del botón "¡Jugar!"

EL_PLAY_BUTTON.addEventListener('click', playGame);


// Adjuntamos los controladores de eventos del botón "Reiniciar"

EL_RESET_BUTTON.addEventListener('click', resetAppConfiguration);