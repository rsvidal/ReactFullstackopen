Curso REACT https://fullstackopen.com/es/

Nota: He añadido origin usando un token de GitHub y así poder subir el codigo a GitHub sin requerir autenticación en Github (usando usuario y password)
Nota: El token de Github se obtiene desde GitHub --> Perfil --> Settings --> Developer Settings --> Personal Access Token
git remote add origin https://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@github.com/rsvidal/ReactFullstackopen.git

----------
JavaScript
----------

Standard: En este curso usaremos JavaScript, cuyo nombre oficial es ECMAScript.
Compilación con Babel: La forma mas habitual de realizar la compilación es usando Babel. Las aplicaciones creadas con el comando "create-react-app" se compilan automaticamente usando Babel (esta incluido como modulo npm en el directorio node_modules)
let y var: ¡usar siempre let en lugar de var!
Array: push y concat, map
Función de fecha: Fue añadida con la vesión ES6 (antes era necesario usar la palabra clave function)
    Funciónes de fecha:
    const sum = (a, b) => { return a + b }
    const sum = (a, b) => a + b // Simplificada, porque al tener una unica sentencia no es necesario ni las llaves ni la palabra clave return
    const square = (n) => n * n 
    const square = n => n * n // Simplificada, porque al tener un solo argumento, no es necesario indicarlo entre parentesis

    a) Funciones usando la palabra clave function:
    function sum(a, b) { return a + b }
    const result = sum(1, 2)

    b) Funciones usando una expresión de functión
    const suma = function(a, b) { return a + b }
    const result = suma(a, b)

console.log('props value is', props) --> Si emplear  --> Retornará el contenido de props
console.log('props value is' + props) --> No emplear --> Retornará props value is [Object object]

-----
React
-----
State Hook: Hook A partir de React 16.8.0 se usa state hook. Antes del empleo de hooks, no había forma de agregar estado a los componentes funcionales. 
            Los componentes que requerían el estado tenían que definirse como "componentes de clase", utilizando la sintaxis de clase de JavaScript.

Depurar: 
* Añadir la palabra debugger en cualquier parte del código. La consola de Google Chrome se parará en esta sentencia (solo cuando esté activo devtools en Google Chrome)
  No hace falta añadir debugger en el código, ya que se puede parar el programa en cualquier sentencia desde la consola de Google Chrome)

* Es mejor emplear directamente la consola de Google Chrome y sus puntos de interrupción. Tambien se puede usar "Components React" dentro de la consola de Google Chrome
  (Pestaña components) https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi

---------------------
Javascript y procesos
---------------------

Actualmente, ¡¡¡ los motores de JavaScript son de un solo subproceso !!! 
Esto significa que no puede ejecutar código en paralelo. Como resultado, es un requisito utilizar un modelo sin bloqueo para ejecutar operaciones IO. 
De lo contrario, el navegador se "congelaría" durante, por ejemplo, la obtención de datos de un servidor.

En los navegadores actuales, es posible ejecutar código paralelo con la ayuda de los llamados web Workers. Sin embargo, el bucle de eventos de una ventana individual del navegador solo lo maneja un hilo único.

-----------
Json Server
-----------

Para el desarrollo se ha usado Json Server. Simula a un servidor que en lugar de apuntar a una base de datos de producción, apunta directamente a un fichero Json.

1) Arrancar directamente el servidor Json Server apuntando a un fichero json:

npx json-server --port 3002 --watch db.json 
donde db.json es un archivo que contiene un array de notas. Se puede acceder al servidor mediante http://localhost:3002/notes

2) Arrancar el servidor Json Server configurandolo en la propia aplicación:

* Nos situamos en el directorio raiz de la aplicación y ejecutamos la siguiente sentencia (para añadir la depedencia json-server a nuestro proyecto, y se añade automaticamente al fichero package.json):)
  npm install json-server --save-dev

* Crear un script llamado "server" en el fichero package.json:
  "scripts": { 
    ...
    "myJsonServer": "json-server -p3002 --watch db.json" <-- Linea añadida
  }

* Arrancar el json server usando la siguiente sentencia:
  npm run myJsonServer

-----
Axios
-----

Para la invocación desde el frontend (React) al Backend se usa Axios.
Axios realmente es una libreria que funcione como Fetch, pero mas agradable de usar.
Para ello, hemos instalado Axios (situandonos en el directorio raiz de la aplicación, añade el paquete Axios automaticamente al fichero package.json):

npm install axios

--------
Promises
--------
Una promesa es un objeto que representa la eventual finalización o falla de una operación asincrónica.
En otras palabras, una promesa es un objeto que representa una operación asincrónica. Una promesa puede tener tres estados distintos:
* La promesa está pendiente: significa que el valor final (uno de los dos siguientes) aún no está disponible.
* La promesa está cumplida: Significa que la operación se ha completado y el valor final está disponible, que generalmente es una operación exitosa. Este estado a veces también se denomina resuelto.
* La promesa es rechazada: Significa que un error impidió determinar el valor final, que generalmente representa una operación fallida.