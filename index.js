const express = require('express');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//para que se puedan recibir json en as respuestas del http
app.use(express.json());

// posible solución para posible problema de CORS
const whitelist = ['http://localhost:8080', 'https://myapp.co']; //lista de dominios permitidos EJEMPLOS
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));
// app.use(cors());

// de esta forma hago funcionar el router
routerApi(app);

// los middlewares siempre se implementan despues de definir el routing en el index.js
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//rutas de test para verificar que funciona el servidor
app.get('/', (req, res) => res.send('My first server!'));
app.get('/new-route', (req, res) => res.send('I am a new route!'));

app.listen(port, () => console.log(`My app listening on port ${port}!`));
