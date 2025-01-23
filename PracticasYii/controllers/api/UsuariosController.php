<?php

namespace app\controllers\api;

use Yii;
use yii\rest\ActiveController;
use app\models\Usuarios;
use yii\web\Response;

class UsuariosController extends ActiveController
{
    public $modelClass = 'app\models\Usuarios';
    public $enableCsrfValidation = false; // Deshabilitar CSRF para la API

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['contentNegotiator'] = [
            'class' => \yii\filters\ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ],
        ];
        
        return $behaviors;
    }
    public function actionCreate()
    {
        $model = new Usuarios();
        $data = Yii::$app->request->getBodyParams();
    
        // Asignar manualmente los valores al modelo
        $model->nombre = $data['nombre'] ?? null;
        $model->email = $data['email'] ?? null;
        $model->password = $data['password'] ?? null;
        $model->rol = $data['rol'] ?? null;
        $model->id_rol = $data['id_rol'] ?? null; 
    
        if ($model->save()) {
            Yii::$app->response->format = Response::FORMAT_JSON;
            return ['status' => 'success', 'data' => $model];
        } else {
            Yii::$app->response->statusCode = 422;
            Yii::$app->response->format = Response::FORMAT_JSON;
            return ['status' => 'error', 'errors' => $model->errors];
        }
    }
}