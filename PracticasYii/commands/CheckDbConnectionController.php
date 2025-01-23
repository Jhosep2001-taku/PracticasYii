<?php

namespace app\commands;

use yii\console\Controller;
use yii\db\Connection;
use yii\base\Exception;

class CheckDbConnectionController extends Controller
{
    public function actionIndex()
    {
        try {
            // Obtén la conexión a la base de datos
            $db = \Yii::$app->db;
            // Intenta ejecutar una consulta simple
            $db->createCommand("SELECT 1")->execute();
            echo "Conexión a la base de datos exitosa.\n";
        } catch (Exception $e) {
            echo "Error al conectar a la base de datos: " . $e->getMessage() . "\n";
        }
    }
}