// Configuración

const CONF_COMPUTER_PLAY_TIMEOUT_MS = 1000;
const CONF_MAX_ROUNDS = 99;
const CONF_MIN_ROUNDS = 1;
const CONF_NAME_MAX_LENGTH = 32;
const CONF_PLAY_ROUND_TIMEOUT_MS = 1500;
const CONF_ROUND_RESULT_TIMEOUT_MS = 2000;
const CONF_ROUNDS = 5;
const CONF_ROUNDS_INPUT_SIZE = 3;


// Errores

const ERR_EVEN_ROUNDS = 'El número de rondas debe ser impar';
const ERR_LONG_NAME = `Tu nombre no puede superar los ${CONF_NAME_MAX_LENGTH} caracteres`;
const ERR_MAX_ROUNDS = `El número máximo de rondas es ${CONF_MAX_ROUNDS}`;
const ERR_MIN_ROUNDS = `El número mínimo de rondas es ${CONF_MIN_ROUNDS}`;
const ERR_NOT_DIGIT = 'Solo podés ingresar dígitos';
const ERR_VOID_NAME = 'Es necesario que ingreses un nombre';
const ERR_VOID_ROUNDS = 'Es necesario que ingreses un número';


// Mensajes

const MSG_COMPUTER_POINT = '¡Punto para la computadora!';
const MSG_COMPUTER_WINS = '¡Ganó la computadora!';
const MSG_CONFIGURE_NAME_AND_ROUNDS = '¡Configurá tu nombre, las rondas y a jugar!';
const MSG_DO_CLICK = 'Hacé clic en tu jugada';
const MSG_TIE_NO_POINTS = 'Empate. No se suman puntos';
const MSG_USER_POINT = '¡Punto para vos!';
const MSG_USER_WINS = '¡Ganaste!';


// Jugadas

const PLAY_PAPER = 'paper';
const PLAY_ROCK = 'rock';
const PLAY_SCISSORS = 'scissors';


// Ganadores

const WIN_COMPUTER = 'computer';
const WIN_USER = 'user';


// Clases (atributo class)

const CLASS_IMAGE_FADE_IN = 'image-fade-in';
const CLASS_IMAGE_FADE_OUT = 'image-fade-out';


// Identificadores (atributo id)

const ID_COMPUTER_PLAY_PAPER = 'computer-play-paper';
const ID_COMPUTER_PLAY_ROCK = 'computer-play-rock';
const ID_COMPUTER_PLAY_SCISSORS = 'computer-play-scissors';
const ID_COMPUTER_SCORE_NUMBER = 'computer-score-number';
const ID_MESSAGE_TEXT = 'message-text';
const ID_NAME_INPUT = 'name-input';
const ID_PLAY_BUTTON = 'play-button';
const ID_RESET_BUTTON = 'reset-button';
const ID_ROUNDS_INPUT = 'rounds-input';
const ID_USER_NAME = 'user-name';
const ID_USER_PLAY_PAPER = 'user-play-paper';
const ID_USER_PLAY_ROCK = 'user-play-rock';
const ID_USER_PLAY_SCISSORS = 'user-play-scissors';
const ID_USER_SCORE_NUMBER = 'user-score-number';


// Elementos HTML

const EL_COMPUTER_PLAY_PAPER = document.getElementById(ID_COMPUTER_PLAY_PAPER);
const EL_COMPUTER_PLAY_ROCK = document.getElementById(ID_COMPUTER_PLAY_ROCK);
const EL_COMPUTER_PLAY_SCISSORS = document.getElementById(ID_COMPUTER_PLAY_SCISSORS);
const EL_COMPUTER_SCORE_NUMBER = document.getElementById(ID_COMPUTER_SCORE_NUMBER);
const EL_MESSAGE_TEXT = document.getElementById(ID_MESSAGE_TEXT);
const EL_NAME_INPUT = document.getElementById(ID_NAME_INPUT);
const EL_PLAY_BUTTON = document.getElementById(ID_PLAY_BUTTON);
const EL_RESET_BUTTON = document.getElementById(ID_RESET_BUTTON);
const EL_ROUNDS_INPUT = document.getElementById(ID_ROUNDS_INPUT);
const EL_USER_NAME = document.getElementById(ID_USER_NAME);
const EL_USER_PLAY_PAPER = document.getElementById(ID_USER_PLAY_PAPER);
const EL_USER_PLAY_ROCK = document.getElementById(ID_USER_PLAY_ROCK);
const EL_USER_PLAY_SCISSORS = document.getElementById(ID_USER_PLAY_SCISSORS);
const EL_USER_SCORE_NUMBER = document.getElementById(ID_USER_SCORE_NUMBER);


// Arreglos

const ARR_COMPUTER_PLAY_IMAGES = [EL_COMPUTER_PLAY_PAPER, EL_COMPUTER_PLAY_ROCK, EL_COMPUTER_PLAY_SCISSORS];
const ARR_PLAYS = [PLAY_PAPER, PLAY_ROCK, PLAY_SCISSORS];
const ARR_USER_PLAY_IMAGES = [EL_USER_PLAY_PAPER, EL_USER_PLAY_ROCK, EL_USER_PLAY_SCISSORS];