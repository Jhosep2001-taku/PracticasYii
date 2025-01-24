const { Pool } = require('pg');
const config = require('../config');

// Configuración de la conexión
const pool = new Pool(config);

// Exportamos el pool para usarlo en otros archivos
module.exports = pool;