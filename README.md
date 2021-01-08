# ProyectOne_Game
Primera iteración: MENÚ DEL JUEGO
Utilizando DOM planteamos el menú del juego que tendra dos jugadores posibles, las intrucciones y el botón de start, que dependiendo del jugador elegido cargará un canvas u otro.

![Menú de Inicio](https://raw.githubusercontent.com/AngelaHerrador/ProyectOne_Game/master/assets/img/README/Iteración1.png)

Segunda iteración: CREACIÓN DEL JUEGO
Dentro de cada canvas desarrollo los siguientes aspectos del juego:

A. Background: planteo un fondo en constante movimiento que obligue a avanzar al player, pero de cuyo movimiento solo dependan los obstaculos, que iran saliendo según avance el canvas.

B. Players: creo los sprites correspondientes a Jon Snow y Daenerys Targaryen, que pondrán avanzar, retroceder y saltar. Les añado funcionalidad dentro del canvas.

![Sprite JonNieve](https://raw.githubusercontent.com/AngelaHerrador/ProyectOne_Game/master/assets/img/PlayerG1(JonSnow).png)

![Sprite DaenerysTargaryen](https://raw.githubusercontent.com/AngelaHerrador/ProyectOne_Game/master/assets/img/PlayerG2(Khalesi).png)

C. Enemies: creo los sprites correspondientes a Khal Drogo y Whites Walkers, que únicamente aparecerán en pantalla, atravesandola de derecha a izquierda y lanzando sus armas contra el player principal.

![Sprite JonNieve](https://raw.githubusercontent.com/AngelaHerrador/ProyectOne_Game/master/assets/img/Enemie(KhalDrogo).png)

![Sprite DaenerysTargaryen](https://raw.githubusercontent.com/AngelaHerrador/ProyectOne_Game/master/assets/img/Enemie(WhiteWalker).png)

D. Obstacles: los obstaculos serán para el player1 bombas de fuego que tendrá que ir sorteando, saltandolas o pasando por debajo de ellas; y bloques de hielo para el player2 con la misma funcionalidad que el primer caso.

E. Weapons players: las armas del player1 seran espadas. Las armas del player2 serán bolas de fuego.

F. Weapons enemies: las armas de Khal Drogo seran bolas de fuego. Las armas de los caminantes blancos serán bolas de fuego congeladas.

G. Collisions: Cada vez que el player colisione con un obstaculo, enemigo o arma del enemigo, se restara 1 punto en la vida del player, pero no desaparecerán del juego. Si el arma del player colisiona con el enemigo, esta si desaparecera al colisionar.

H. Score: Por cada obstaculo o enemigo que aparezca en el canvas y que el player supere, sumará 1 punto. Por cada enemigo que mate sumará 5 puntos. 

I. Lives: si le toca un obstaculo, una bala o un enemigo perderá un punto de vida. Si toca un corazon sumará un punto de vida.

Tercera iteración: GAME OVER / YOU WIN!

Añado funcionalidad de ganar y perder, que dependerán de las lives y el score.

Cuarta iteración: BATALLA FINAL

Con ayuda de setTimeOut, pasamos a la batalla final una vez que alcancemos los 30 puntos de Score. En ella el background se mantiene estático y el player podrá moverse a su antojo por la pantalla. El enemigo sera Daenerys o Night King montado en un dragón, que le tirará bolas de fuego que deberá esquivar. 
Gana si consigue quitarle las 5 vidas al enemigo y mantener las suyas.
Pierde si el player agota sus vidas.

Quinta iteración: CUENTA ATRÁS

Añado información de interés para saber en que momento podemos pasar a la batalla final y genero una cuenta atrás que permita prepararse al jugador.






