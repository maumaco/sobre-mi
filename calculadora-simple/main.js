/*
ÍNDICE

1. CONSTANTES
1.1. Mensajes de error
1.2. Identificadores de los elementos
1.3. Límites mínimo y máximo del resultado
1.4. Operaciones seleccionables desde la interfaz

2. VARIABLES GLOBALES

3. FUNCIONES
3.1. Árbol de las funciones
3.2. Evento principal
3.3. Otros eventos
3.4. Búsqueda de errores
3.5. Ejecución de operaciones
3.6. Operaciones aritméticas básicas
3.7. Manipulación de textos en la interfaz
3.8. Restablecimiento de los campos
3.9. Foco de los elementos

4. EVENTOS
*/



/*
1. CONSTANTES
*/


/* 1.1. Mensajes de error */

const ERR_DIVISOR_CERO = 'No se puede calcular porque el divisor no puede ser cero';
const ERR_RESULTADO_DESBORDE_INF = 'El resultado debe ser mayor que -1e+21 (-10^21)';
const ERR_RESULTADO_DESBORDE_SUP = 'El resultado debe ser menor que 1e+21 (10^21)';
const ERR_RESULTADO_INVALIDO = 'No se puede continuar porque no existe un resultado válido';
const ERR_VALOR_NAN = 'El valor debe ser un número';
const ERR_VALOR_VACIO = 'El valor no puede estar vacío';
const ERR_VALORES_INVALIDOS = 'No se puede calcular porque algunos valores son inválidos';


/* 1.2. Identificadores de los elementos */

const ID_CALCULAR = 'calcular';
const ID_CONTINUAR = 'continuar';
const ID_ERROR_CONTINUAR = 'error-continuar';
const ID_ERROR_OPERANDO_1 = 'error-operando-1';
const ID_ERROR_OPERANDO_2 = 'error-operando-2';
const ID_ERROR_RESULTADO = 'error-resultado';
const ID_OPERACION = 'operacion';
const ID_OPERANDO_1 = 'operando-1';
const ID_OPERANDO_2 = 'operando-2';
const ID_REINICIAR = 'reiniciar';
const ID_RESULTADO = 'resultado';


/* 1.3. Límites mínimo y máximo del resultado */

// 1e+21 = 10^21 = 1000 trillones (21 ceros)
const NUM_DESBORDE_INFERIOR = -Math.pow(10, 21);
const NUM_DESBORDE_SUPERIOR = Math.pow(10, 21);


/* 1.4. Operaciones seleccionables desde la interfaz */

const OPERACION_DIVISION = 'division';
const OPERACION_MULTIPLICACION = 'multiplicacion';
const OPERACION_RESTA = 'resta';
const OPERACION_SUMA = 'suma';




/*
2. VARIABLES GLOBALES
*/


// Es inicializada por la función calcular()
// Es evaluada por la función continuar() para continuar el cálculo
// Tipo: boolean
let esResultadoValido;




/*
3. FUNCIONES
*/


/* 3.1. Árbol de las funciones */

/*
calcular()
  buscarErroresOperandos(operando1, operando2)
  buscarErroresOperacion(operacion, operando2)
  ejecutarOperacion(operacion, operando1, operando2)
    suma(operando1, operando2)
    resta(operando1, operando2)
    multiplicacion(operando1, operando2)
    division(operando1, operando2)
  buscarErroresResultado(resultado)
  ...
  borrarTexto(id)
  mostrarTexto(id, texto)

validarValor(id, valor)
  buscarErroresValor(valor)
  mostrarTexto(id, texto)
  borrarTexto(id)

reiniciar()
  borrarTexto(id)
  restablecerOperando(id, valor)
  darFoco(id)

continuar()
  borrarTexto(id)
  restablecerOperando(id, valor)
  darFoco(id)
  mostrarTexto(id, texto)
*/


/* 3.2. Evento principal */

// Obtiene los operandos y la operación seleccionada y calcula el resultado
// Busca errores en los operandos, la operación y el resultado a medida que va avanzando en su ejecución
// Si no hay errores, muestra el resultado en la interfaz
// Si no, muestra un mensaje de error
// Está asociada al evento "onclick" del botón "Calcular"
// Tipo de retorno: undefined

function calcular() {

  // Inicializamos la variable global que establece si existe un resultado válido
  // Tipo: boolean
  esResultadoValido = false;

  // Obtenemos los operandos
  // Tipo: string
  let operando1 = document.getElementById(ID_OPERANDO_1).value;
  let operando2 = document.getElementById(ID_OPERANDO_2).value;

  // Declaramos una variable para almacenar el resultado de las sucesivas búsquedas de errores
  // Tipo: string (hay algún error) | undefined (no hay errores)
  let error;

  // Evaluamos los operandos
  // Tipo: string (inválidos) | undefined (válidos)
  error = buscarErroresOperandos(operando1, operando2);

  // Si los operandos son inválidos, mostramos un mensaje de error y finalizamos la función
  if (error) {
    borrarTexto(ID_RESULTADO);
    mostrarTexto(ID_ERROR_RESULTADO, error);
    return;
  }

  // Convertimos los operandos de string a number
  // Tipo: number
  operando1 = Number(operando1);
  operando2 = Number(operando2);

  // Obtenemos la operación seleccionada
  // Tipo: string
  let operacion = document.getElementById(ID_OPERACION).value;

  // Evaluamos si es posible ejecutar la operación
  // Tipo: string (no es posible) | undefined (es posible)
  error = buscarErroresOperacion(operacion, operando2);

  // Si la operación no puede ejecutarse, mostramos un mensaje de error y finalizamos la función
  if (error) {
    borrarTexto(ID_RESULTADO);
    mostrarTexto(ID_ERROR_RESULTADO, error);
    return;
  }

  // Obtenemos el resultado de ejecutar la operación
  // Tipo: number
  let resultado = ejecutarOperacion(operacion, operando1, operando2);

  // Evaluamos si el resultado excede los límites mínimo y máximo establecidos
  // Tipo: string (excede) | undefined (no excede)
  error = buscarErroresResultado(resultado);

  // Si el resultado excede los límites, mostramos un mensaje de error y finalizamos la función
  if (error) {
    borrarTexto(ID_RESULTADO);
    mostrarTexto(ID_ERROR_RESULTADO, error);
    return;
  }

  // Si el programa llega a ese punto es porque:
  // * los operadores son válidos
  // * la operación es ejecutable
  // * el resultado no excede los límites

  // Borramos los mensajes de error que puedan haber quedado
  borrarTexto(ID_ERROR_RESULTADO);
  borrarTexto(ID_ERROR_CONTINUAR);

  // Mostramos el resultado
  mostrarTexto(ID_RESULTADO, resultado);

  // Establecemos que existe un resultado válido
  esResultadoValido = true;
}


/* 3.3. Otros eventos */

// Valida el valor ingresado en los campos de texto de los operandos
// Si el valor no es un operando válido, muestra un mensaje de error bajo el operando correspondiente
// Está asociada al evento "onblur" de los campos de texto "Operando 1" y "Operando 2"
// Tipo de retorno: undefined

function validarValor(id, valor) {
  let error = buscarErroresValor(valor);

  switch (id) {
    case ID_OPERANDO_1:
      id = ID_ERROR_OPERANDO_1;
      break;
    case ID_OPERANDO_2:
      id = ID_ERROR_OPERANDO_2;
  }

  if (error) {
    mostrarTexto(id, error);
  }
  else {
    borrarTexto(id);
  }
}

// Borra todos los mensajes de error
// Restablece el valor de los campos de texto de los operandos
// Da el foco al campo de texto "Operando 1"
// Está asociada al evento "onclick" del botón "Reiniciar"
// Tipo de retorno: undefined

function reiniciar() {
  borrarTexto(ID_ERROR_OPERANDO_1);
  borrarTexto(ID_ERROR_OPERANDO_2);
  borrarTexto(ID_RESULTADO);
  borrarTexto(ID_ERROR_RESULTADO);
  borrarTexto(ID_ERROR_CONTINUAR);
  restablecerOperando(ID_OPERANDO_1, '');
  restablecerOperando(ID_OPERANDO_2, '');
  darFoco(ID_OPERANDO_1);
}

// Permite continuar la operación ejecutada estableciendo su resultado como primer operando de una nueva operación
// Si existe un resultado válido:
// * obtiene el valor del resultado
// * borra el resultado de la interfaz
// * establece el valor del resultado como valor del campo de texto "Operando 1"
// * restablece el valor del campo de texto "Operando 2"
// * da el foco al campo de texto "Operando 1"
// Si no, muestra un mensaje de error en la interfaz
// Está asociada al evento "onclick" del botón "Continuar"
// Tipo de retorno: undefined

function continuar() {
  if (esResultadoValido) {
    let resultado = document.getElementById(ID_RESULTADO).innerText;
    borrarTexto(ID_RESULTADO);
    restablecerOperando(ID_OPERANDO_1, resultado);
    restablecerOperando(ID_OPERANDO_2, '');
    darFoco(ID_OPERACION);
  }
  else {
    mostrarTexto(ID_ERROR_CONTINUAR, ERR_RESULTADO_INVALIDO);
  }
}


/* 3.4. Búsqueda de errores */

function buscarErroresValor(valor) {
  if (valor.trim() === '') {
    return ERR_VALOR_VACIO;
  }
  else if (isNaN(Number(valor))) {
    return ERR_VALOR_NAN;
  }
}

function buscarErroresOperandos(operando1, operando2) {
  let error1 = buscarErroresValor(operando1);
  let error2 = buscarErroresValor(operando2);

  if (error1 || error2) {
    return ERR_VALORES_INVALIDOS;
  }
}

function buscarErroresOperacion(operacion, operando2) {
  if (operacion === OPERACION_DIVISION && operando2 === 0) {
    return ERR_DIVISOR_CERO;
  }
}

function buscarErroresResultado(resultado) {
  if (resultado >= NUM_DESBORDE_SUPERIOR) {
    return ERR_RESULTADO_DESBORDE_SUP;
  }
  else if (resultado <= NUM_DESBORDE_INFERIOR) {
    return ERR_RESULTADO_DESBORDE_INF;
  }
}


/* 3.5. Ejecución de operaciones */

function ejecutarOperacion(operacion, operando1, operando2) {
  switch (operacion) {
    case OPERACION_SUMA:
      return suma(operando1, operando2);

    case OPERACION_RESTA:
      return resta(operando1, operando2);

    case OPERACION_MULTIPLICACION:
      return multiplicacion(operando1, operando2);

    case OPERACION_DIVISION:
      return division(operando1, operando2);
  }
}


/* 3.6. Operaciones aritméticas básicas */

function suma(operando1, operando2) {
  return operando1 + operando2;
}

function resta(operando1, operando2) {
  return operando1 - operando2;
}

function multiplicacion(operando1, operando2) {
  return operando1 * operando2;
}

function division(operando1, operando2) {
  return operando1 / operando2;
}


/* 3.7. Manipulación de textos en la interfaz */

function mostrarTexto(id, texto) {
  if (document.getElementById(id).innerText !== texto) {
    document.getElementById(id).innerText = texto;
  }
}

function borrarTexto(id) {
  if (document.getElementById(id).innerText !== '') {
    document.getElementById(id).innerText = '';
  }
}


/* 3.8. Restablecimiento de los campos */

function restablecerOperando(id, valor) {
  document.getElementById(id).value = valor;
}


/* 3.9. Foco de los elementos */

function darFoco(id) {
  document.getElementById(id).focus();
}




/*
4. EVENTOS
*/


// Evento "onclick" del botón "Calcular"
document.getElementById(ID_CALCULAR).addEventListener('click', calcular);

// Evento "onblur" del campo de texto "Operando 1"
document.getElementById(ID_OPERANDO_1).setAttribute('onblur', 'validarValor(this.id, this.value);');

// Evento "onblur" del campo de texto "Operando 2"
document.getElementById(ID_OPERANDO_2).setAttribute('onblur', 'validarValor(this.id, this.value);');

// Evento "onclick" del botón "Reiniciar"
document.getElementById(ID_REINICIAR).addEventListener('click', reiniciar);

// Evento "onclick" del botón "Continuar"
document.getElementById(ID_CONTINUAR).addEventListener('click', continuar);