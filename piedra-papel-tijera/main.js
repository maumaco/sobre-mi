// Establecemos la configuración inicial de la aplicación

setDefaultConfiguration();


// Adjuntamos los controladores de eventos de la entrada de texto "Nombre"

EL_NAME_INPUT.addEventListener('change', function (e) {
  sanitizeControlValue(e.target);
});

EL_NAME_INPUT.addEventListener('change', function (e) {
  validateUserName(e.target.value);
});

EL_NAME_INPUT.addEventListener('click', function (e) {
  e.target.select();
});


// Adjuntamos los controladores de eventos de la entrada de texto "Rondas"

EL_ROUNDS_INPUT.addEventListener('change', function (e) {
  sanitizeControlValue(e.target);
});

EL_ROUNDS_INPUT.addEventListener('change', function (e) {
  validateRounds(e.target.value);
});

EL_ROUNDS_INPUT.addEventListener('click', function (e) {
  e.target.select();
});


// Adjuntamos los controladores de eventos del botón "¡Jugar!"

EL_PLAY_BUTTON.addEventListener('click', play);