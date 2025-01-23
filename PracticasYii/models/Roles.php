<?php

namespace app\models;

use yii\db\ActiveRecord;

/**
 * Modelo para la tabla 'rol'.
 *
 * @property int $id
 * @property string $nombre
 * @property string|null $descripcion
 * @property string $fecha_creacion
 */
class Roles extends ActiveRecord
{
    /**
     * Nombre de la tabla asociada al modelo.
     *
     * @return string
     */
    public static function tableName()
    {
        return 'rol'; // Nombre de la tabla en la base de datos
    }

    /**
     * Reglas de validación para los atributos del modelo.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // Reglas de validación
            [['nombre'], 'required'], // El campo 'nombre' es obligatorio
            [['nombre'], 'string', 'max' => 100], // Longitud máxima de 100 caracteres
            [['nombre'], 'unique'], // El campo 'nombre' debe ser único
            [['descripcion'], 'string'], // El campo 'descripcion' es opcional y de tipo texto
            [['fecha_creacion'], 'safe'], // El campo 'fecha_creacion' es seguro para asignación masiva
        ];
    }

    /**
     * Etiquetas para los atributos del modelo.
     *
     * @return array
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nombre' => 'Nombre del Rol',
            'descripcion' => 'Descripción',
            'fecha_creacion' => 'Fecha de Creación',
        ];
    }

    /**
     * Relación con la tabla 'usuarios'.
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUsuarios()
    {
        return $this->hasMany(Usuarios::class, ['id_rol' => 'id']);
    }
}