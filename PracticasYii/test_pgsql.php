<?php
try {
    $dsn = 'pgsql:host=127.0.0.1;port=5432;dbname=postgres';
    $username = 'postgres';
    $password = 'admin';

    $db = new PDO($dsn, $username, $password);
    echo "¡Conexión exitosa a PostgreSQL!";
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
