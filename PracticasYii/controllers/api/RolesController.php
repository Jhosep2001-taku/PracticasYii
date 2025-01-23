<?php

namespace app\controllers\api;

use Yii;
use yii\rest\ActiveController;
use app\models\Roles;
use yii\web\Response;

class RolesController extends ActiveController
{
    public $modelClass = 'app\models\Roles'; 
    public $enableCsrfValidation = false; 

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Configurar el formato de respuesta a JSON
        $behaviors['contentNegotiator'] = [
            'class' => \yii\filters\ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ],
        ];


        return $behaviors;
    }
}