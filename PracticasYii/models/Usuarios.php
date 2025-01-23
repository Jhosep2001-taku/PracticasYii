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
            [['nombre', 'email', 'password'], 'required'], // Campos obligatorios
            [['email'], 'email'], // Validar formato de email
            [['email'], 'unique'], // Email único
            [['nombre'], 'string', 'max' => 100], // Longitud máxima del nombre
            [['password'], 'string', 'max' => 255], // Longitud máxima de la contraseña
            [['rol'], 'string', 'max' => 50], // Longitud máxima del rol
            [['id_rol'], 'integer'], // Validar que id_rol sea un número entero
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
            'rol' => 'Rol',
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
            'rol',
            'fecha_creacion',
        ];
    }

    // Si necesitas contraseñas encriptadas, puedes hacerlo aquí
    public function beforeSave($insert)
    {
        if ($this->isNewRecord) {
            $this->password = Yii::$app->getSecurity()->generatePasswordHash($this->password);
        }
        return parent::beforeSave($insert);
    }
}