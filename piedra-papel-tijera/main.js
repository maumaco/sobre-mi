setDefaultConfiguration();


EL_NAME_INPUT.addEventListener('change', function (e) {
  sanitizeControlValue(e.target);
});

EL_NAME_INPUT.addEventListener('change', function (e) {
  validateUserName(e.target.value);
});

EL_NAME_INPUT.addEventListener('click', function (e) {
  e.target.select();
});


EL_ROUNDS_INPUT.addEventListener('change', function (e) {
  sanitizeControlValue(e.target);
});

EL_ROUNDS_INPUT.addEventListener('change', function (e) {
  validateRounds(e.target.value);
});

EL_ROUNDS_INPUT.addEventListener('click', function (e) {
  e.target.select();
});


EL_PLAY_BUTTON.addEventListener('click', play);