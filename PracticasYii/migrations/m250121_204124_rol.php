<?php

use yii\db\Migration;

/**
 * Class m250121_204124_rol
 */
class m250121_204124_rol extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        // Crear la tabla 'rol'
        $this->createTable('rol', [
            'id' => $this->primaryKey(), // ID autoincremental
            'nombre' => $this->string(100)->notNull()->unique(), // Nombre del rol, único
            'descripcion' => $this->text(), // Descripción opcional del rol
            'fecha_creacion' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'), // Fecha de creación
        ]);

        // Insertar roles por defecto
        $this->batchInsert('rol', ['nombre', 'descripcion'], [
            ['Administrador', 'Usuario con acceso completo al sistema'],
            ['Usuario', 'Usuario con acceso limitado'],
            ['Invitado', 'Usuario con acceso de solo lectura'],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // Eliminar la tabla 'rol'
        $this->dropTable('rol');
    }
}