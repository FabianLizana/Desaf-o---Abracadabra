import express from 'express'
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

  /* 1. Crear un servidor con Express en el puerto 3000.*/
//const puerto = 3000; // El puerto donde correrá el servidor// investigando solo es necesario poner un app.listen(3000, () => al final despues de definiciones de rutas y middlewares y funcionara
const app = express();
console.clear();

/* 2. Definir la carpeta “assets” como carpeta pública del servidor.*/
app.use(express.static('assets'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/* 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de
la ruta /abracadabra/usuarios.  */
const usuarios = ['Pata', 'Peta', 'Pita', 'Pota', 'MariaClara', 'Lucho', 'Mario', 'Hugo', 'Ryu', 'Ken'];

app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios)
})

/* 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en
el servidor. En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario
devolver la imagen “who.jpeg”.*/



// se modifica el middleware para redirigir explícitamente a la ruta del juego (/juego) usando la función res.redirect() si se encuentra que el usuario existe.
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const { usuario } = req.params;

  if (usuarios.map(u => u.trim().toLowerCase()).includes(usuario.trim().toLowerCase())) {
    // Si el usuario existe en el arreglo.
    res.redirect('/game'); // Redirigir a la ruta del juego
  } else {
    //Si el usuario no existe, saldra imagen who.
    res.sendFile(__dirname + '/assets/who.jpeg');
  }
});


// Ruta GET 
app.get('/abracadabra/juego/:usuario', (req, res) => {
    const { usuario } = req.params;
    // Usuario encontrado
    res.send(`El usuario "${usuario}" existe`); 
});

/*forma 2 respuesta 4:
// Middleware para validar si un usuario existe o no  y mostrar la imagen "who" sino existe
app.use('/abracadabra/usuarios/:users', (req, res, next) => {
    const usuario = req.params.users;
    users.includes(usuario) ? next() : res.sendFile(path.join(__dirname, '/public/assets/who.jpeg')); // Si el usuario existe, con next avanzamos a la siguiente función
});

// Se crea la ruta para mostrar que el usuario existe
app.get('/abracadabra/usuarios/:users', (req, res) => {
    const usuario = req.params.users;
    res.send(`El usuario "${usuario}" existe`); 
}) 
*/

/* 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
número generado de forma aleatoria.
En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
imagen de Voldemort.*/

app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = parseInt(req.params.n);
    const randomNumber = Math.floor(Math.random() * 4) + 1;
  
    if (n === randomNumber) {
      // Agrega la imagen de conejo
      res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
      // Agrega la imagen de voldemort
      res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
  })

/*forma 2 respuesta 5: 
// Ruta para mostrar si hay match con el numero ingresado y el random
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1; // Numeró aleatorio entre 1 y 4
    const numeroRuta = parseInt(req.params.n);  // Se saca el número del usuario
    // Se usa un ternario para evaluar si el numero es igual o no
    numeroAleatorio == numeroRuta ? res.sendFile(path.join(__dirname, '/public/assets/conejito.jpg')) : res.sendFile(path.join(__dirname, '/public/assets/voldemort.jpg'))
}); 
*/

  /* 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al
consultar una ruta que no esté definida en el servidor.*/

/*Ruta generica para cuando la ruta no existe*/
app.get('*', (req, res) => {
    res.send('Esta página no existe')
  })

  /* 1. Crear un servidor con Express en el puerto 3000.*/
  app.listen(3000, () => console.log('Server arriba en puerto 3000'))