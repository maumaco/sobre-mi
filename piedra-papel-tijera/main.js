setDefaultConfiguration();



document.getElementById(ID_NAME_INPUT).addEventListener('change', function (e) {
  sanitizeControlValue(e.target);
});

document.getElementById(ID_NAME_INPUT).addEventListener('change', function (e) {
  validateUserName(e.target.value);
});

document.getElementById(ID_NAME_INPUT).addEventListener('click', function (e) {
  e.target.select();
});

document.getElementById(ID_ROUNDS_INPUT).addEventListener('change', function (e) {
  sanitizeControlValue(e.target);
});

document.getElementById(ID_ROUNDS_INPUT).addEventListener('change', function (e) {
  validateRounds(e.target.value);
});

document.getElementById(ID_ROUNDS_INPUT).addEventListener('click', function (e) {
  e.target.select();
});

document.getElementById(ID_PLAY_BUTTON).addEventListener('click', play);