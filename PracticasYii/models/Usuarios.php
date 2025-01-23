<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Usuarios extends ActiveRecord
{
    // Indica el nombre de la tabla en la base de datos
    public static function tableName()
    {
        return 'usuarios';
    }

    // Define las reglas de validación
    public function rules()
    {
        return [
            [['nombre', 'email', 'password', 'id_rol'], 'required'], // Campos obligatorios
            [['email'], 'email'], // Validar formato de email
            [['email'], 'unique'], // Email único
            [['nombre'], 'string', 'max' => 100], // Longitud máxima del nombre
            [['password'], 'string', 'max' => 255], // Longitud máxima de la contraseña
            [['id_rol'], 'integer'], // Validar que id_rol sea un número entero
            [['fecha_creacion'], 'safe'], // El campo 'fecha_creacion' es seguro para asignación masiva
        ];
    }

    // Define las etiquetas para los campos
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nombre' => 'Nombre',
            'email' => 'Email',
            'password' => 'Contraseña',
            'id_rol' => 'Rol', 
            'fecha_creacion' => 'Fecha de Creación',
        ];
    }

    // Define los campos que se incluirán en la respuesta JSON
    public function fields()
    {
        return [
            'id',
            'nombre',
            'email',
            'id_rol',
            'fecha_creacion',
        ];
    }

    // Encripta la contraseña antes de guardarla
    public function beforeSave($insert)
    {
        if ($this->isNewRecord && !empty($this->password)) {
            $this->password = Yii::$app->getSecurity()->generatePasswordHash($this->password);
        }
        return parent::beforeSave($insert);
    }

    // Relación con el modelo 'Roles' (ahora usando 'id_rol')
    public function getRol()
    {
        return $this->hasOne(Roles::class, ['id' => 'id_rol']);
    }
}
