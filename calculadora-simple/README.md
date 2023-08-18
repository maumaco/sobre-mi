# Calculadora simple

_Aplicación que permite realizar las cuatro operaciones aritméticas básicas (suma, resta, multiplicación y división) entre dos operandos._


## Requisitos

* Navegador web


## Descarga e instalación

* Descargá los archivos que componen la aplicación desde el directorio [calculadora-simple](https://github.com/maumaco/sobre-mi/tree/main/calculadora-simple)
* Creá un directorio en tu máquina y colocá los archivos dentro del mismo


## Instruciones de uso

* Abrí el archivo `index.html` con tu navegador
* Ingresá un valor numérico en los campos de texto "Operando 1" y "Operando 2"
* Seleccioná la operación que querés realizar
* Hacé clic en el botón "Calcular"
* Si querés realizar un nuevo cálculo, hacé clic en el botón "Reiniciar"
* Si querés continuar el cálculo a partir del último resultado obtenido, hacé clic en el botón "Continuar"


## Errores

Para evitar errores, evitá las siguientes situaciones:

* dejar vacío un campo de texto de los operandos o ingresar únicamente espacios y/o tabulaciones
* ingresar un valor no numérico
* intentar dividir por cero
* obtener un resultado mayor a 1e+21 (10^21) o menor a -1e+21 (-10^21)
* intentar continuar el cálculo sin haber obtenido un resultado válido previamente

En caso de que algún error ocurra, se mostrará un mensaje en la interfaz explicando su origen.


## Casos de prueba

Operando 1 | Operación | Operando 2 | Esperado | Obtenido
-----------|-----------|------------|----------|---------
107 | + | 438 | 545 | 545
9713 | - | 128 | 9585 | 9585
980.123 | * | -1000 | -980123 | -980123
456 | / | 3648 | 0.125 | 0.125
312 | + | 129m | Error | Error
89 | / | 0 | Error | Error
1000000000000 | * | 1000000000 | Error | Error


## Recursos

* [HTML Element Reference](https://www.w3schools.com/tags/default.asp). Lista de etiquetas HTML
* [HTML Attribute Reference](https://www.w3schools.com/tags/ref_attributes.asp). Lista de atributos HTML
* [CSS Reference](https://www.w3schools.com/cssref/index.php). Lista de propiedades CSS
* [JavaScript Reference](https://www.w3schools.com/jsref/jsref_reference.asp). Lista de propiedades y métodos JavaScript
* [Nu Html Checker](https://validator.w3.org/nu/). Verificador en línea para comprobar el marcado de un documento HTML.
* [Editor Markdown](https://editormarkdown.com/). Editor en línea basado en Dillinger que usa la sintaxis Markdown