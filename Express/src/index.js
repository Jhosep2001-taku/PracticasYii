const express = require('express');
const rolRoutes = require('./routes/rolRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// Usar las rutas
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});