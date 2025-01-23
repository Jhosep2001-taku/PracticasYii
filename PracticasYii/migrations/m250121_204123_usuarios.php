<?php

use yii\db\Migration;

/**
 * Class m250121_204123_usuarios
 */
class m250121_204123_usuarios extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        // Crear la tabla 'usuarios'
        $this->createTable('usuarios', [
            'id' => $this->primaryKey(), // ID autoincremental
            'nombre' => $this->string(100)->notNull(), // Nombre del usuario
            'email' => $this->string(150)->notNull()->unique(), // Email único
            'password' => $this->string()->notNull(), // Contraseña
            'rol' => $this->string(50), // Rol del usuario
            'fecha_creacion' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'), // Fecha de creación
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // Eliminar la tabla 'usuarios' al revertir la migración
        $this->dropTable('usuarios');
    }
}
