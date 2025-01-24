const express = require('express');
const cors = require('cors');
const rolRoutes = require('./routes/rolRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const port = 4000;

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,POST,PUT,DELETE',  
  allowedHeaders: 'Content-Type,Authorization', 
}));

app.use(express.json());

// Usar las rutas
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});