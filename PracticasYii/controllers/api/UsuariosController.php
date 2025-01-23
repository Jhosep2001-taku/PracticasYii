<?php

namespace app\controllers\api;

use Yii;
use yii\rest\ActiveController;
use app\models\Usuarios;

class UsuariosController extends ActiveController
{
    public $modelClass = 'app\models\Usuarios'; // Especificamos el modelo asociado

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Configuración del Content Negotiator para respuestas JSON
        $behaviors['contentNegotiator'] = [
            'class' => \yii\filters\ContentNegotiator::class,
            'formats' => [
                'application/json' => \yii\web\Response::FORMAT_JSON,
            ],
        ];

        // Habilitar CORS
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:3000'], // Permitir solicitudes desde este origen
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Expose-Headers' => ['Authorization'],
            ],
        ];

        return $behaviors;
    }

    
}
