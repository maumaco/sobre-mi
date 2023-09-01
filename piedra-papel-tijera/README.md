# ¡Piedra, papel, tijera!

_Aplicación para jugar al tradicional juego "¡Piedra, papel, tijera!" entre un usuario y la computadora._


## Tabla de contenidos

* [Requisitos](#requisitos)
* [Descarga e instalación](#descarga)
* [Instruciones de uso](#instrucciones)
* [Errores](#errores)
* [Casos de prueba](#casos)
* [Mejoras](#mejoras)
* [Créditos](#creditos)
* [Agradecimientos](#agradecimientos)


<a id="requisitos"></a>
## Requisitos

* Navegador web


<a id="descarga"></a>
## Descarga e instalación

* Descargá los archivos que componen la aplicación desde el directorio [piedra-papel-tijera](https://github.com/maumaco/sobre-mi/tree/main/piedra-papel-tijera)
* Creá un directorio en tu máquina y colocá los archivos dentro del mismo


<a id="instrucciones"></a>
## Instruciones de uso

* Abrí el archivo `index.html` con tu navegador
* Ingresá el nombre con el que querés jugar. Podés incluir caracteres no alfanuméricos
* Ingresá la cantidad de rondas de la partida. El número debe ser impar. Se juega "al mejor de", es decir, la partida finaliza cuando alguien gana más de la mitad de las rondas [(cantidad de rondas + 1) / 2]
* Hacé clic en el botón "¡Jugar!"
* Seleccioná tu jugada haciendo clic sobre la imagen correspondiente
* Esperá que la computadora haga su jugada y evalúe el resultado de la ronda. La piedra le gana a la tijera (la rompe), la tijera le gana al papel (lo corta) y el papel le gana a la piedra (la envuelve). Si alguien gana la ronda, suma 1 punto. En caso de empate no se suman puntos.
* Repetí la acción anterior hasta que alguien gane la partida
* Una vez finalizada la partida podés inciar una nueva haciendo clic en el botón "¡Jugar!". Si querés, previamente podés modificar tu nombre o la cantidad de partidas
* En cualquier momento de la partida podés abandonarla y prepararte para iniciar una nueva haciendo clic en el botón "Reiniciar"


<a id="errores"></a>
## Errores

Para evitar errores, evitá las siguientes situaciones:

* dejar sin valor una entrada de texto o ingresar únicamente espacios y/o tabulaciones en la misma
* ingresar un nombre que supere los 32 caracteres
* ingresar una cantidad de rondas no númerica, menor que 1, mayor que 99 o que sea par

En caso de que algún error ocurra, se mostrará un mensaje en la interfaz explicando su origen.


<a id="casos"></a>
## Casos de prueba


### Entrada de texto "Nombre"

Valor | Esperado | Obtenido
-|-|-
Matías Vacigalupo | Válido | Válido
Mati_123!! | Válido | Válido
|| Error | Error
Matías Andrés Vacigalupo Montesco | Error | Error


### Entrada de texto "Rondas"

Valor | Esperado | Obtenido
-|-|-
5 | Válido | Válido
13 | Válido | Válido
|| Error | Error
0.5 | Error | Error
3 rondas | Error | Error
0 | Error | Error
111 | Error | Error
6 | Error | Error


### Rondas

Usuario | Computadora | Esperado | Obtenido
-|-|-|-
piedra | tijera | Gana el usuario | Gana el usuario
papel | tijera | Gana la computadora | Gana la computadora
tijera | tijera | Empate | Empate

<a id="mejoras"></a>
## Mejoras

Estas son algunas de las mejoras a desarrollar próximamente:
* Mejorar el estilo de las entradas de texto y los botones
* Agregar animaciones para los mensajes (comentarios y errores)
* Agregar estilos para optimizar la visualización horizontal (`orientation: landscape`)
* Agregar funciones y modificar la interfaz para poder elegir jugar "todas las rondas" (se juegan todas las rondas y el resultado final puede ser empate) o "al mejor de" (se juegan solo las rondas necesarias hasta que alguien gane)


<a id="creditos"></a>
## Créditos

Las imágenes de las jugadas ([piedra](https://thenounproject.com/icon/fist-477918/), [papel](https://thenounproject.com/icon/hand-477922/), [tijera](https://thenounproject.com/icon/scissors-477919/)) se obtuvieron en [Noun Project](https://thenounproject.com/) del usuario [Cristiano Zoucas](https://thenounproject.com/cristiano.zoucas/) bajo licencia Creative Commons.


<a id="agradecimientos"></a>
## Agradecimientos

A todas las personas que hacen posible y desarrollan el curso "Programación web front-end", a la [FAMAF](https://www.famaf.unc.edu.ar/) y a [Argentina Programa](https://www.argentina.gob.ar/economia/conocimiento/argentina-programa).