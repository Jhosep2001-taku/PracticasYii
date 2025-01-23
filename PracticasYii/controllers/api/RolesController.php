<?php

namespace app\controllers\api;

use Yii;
use yii\rest\ActiveController;
use yii\web\Response;
use app\models\Roles;

class RolesController extends ActiveController
{
    public $modelClass = 'app\models\Roles'; // Modelo asociado

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Configurar el formato de respuesta a JSON
        $behaviors['contentNegotiator'] = [
            'class' => \yii\filters\ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON, // Respuesta JSON
            ],
        ];

        // Habilitar CORS
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:3000'], // Permitir solicitudes desde este origen
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => true, // Permitir envío de cookies
                'Access-Control-Max-Age' => 86400, // Cache preflight requests por 1 día
                'Access-Control-Expose-Headers' => ['Authorization'], // Exponer encabezados personalizados
            ],
        ];

        return $behaviors;
    }

    // Action para obtener todos los roles
    public function actionIndex()
    {
        $roles = Roles::find()->all(); // Obtener todos los roles desde la base de datos

        return $roles; // Yii2 convierte automáticamente el array de objetos a JSON
    }

    // Si necesitas personalizar la respuesta
    public function actionView($id)
    {
        $role = Roles::findOne($id);
        if ($role) {
            return $role;
        } else {
            Yii::$app->response->statusCode = 404;
            return ['message' => 'Rol no encontrado'];
        }
    }
}
