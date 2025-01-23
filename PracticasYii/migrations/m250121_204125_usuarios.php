<?php

use yii\db\Migration;

/**
 * Class m250121_204123_usuarios
 */
class m250121_204125_usuarios extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        // Crear la tabla 'usuarios'
        $this->createTable('usuarios', [
            'id' => $this->primaryKey(),
            'nombre' => $this->string(100)->notNull(),
            'email' => $this->string(150)->notNull()->unique(),
            'password' => $this->string()->notNull(),
            'id_rol' => $this->integer()->notNull(),
            'fecha_creacion' => $this->timestamp()->defaultExpression('NOW()'), // Fecha automática
        ]);

        // Agregar una clave foránea en 'id_rol' que hace referencia a la tabla 'roles'
        $this->addForeignKey(
            'fk_usuarios_rol', // Nombre de la clave foránea
            'usuarios', // Tabla de origen
            'id_rol', // Columna de la tabla de origen
            'rol', // Tabla de destino (asegúrate de que la tabla 'roles' exista)
            'id', // Columna de la tabla destino
            'CASCADE' // Si se elimina un rol, eliminar todos los usuarios asociados
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // Eliminar la clave foránea
        $this->dropForeignKey('fk_usuarios_rol', 'usuarios');

        // Eliminar la tabla 'usuarios' al revertir la migración
        $this->dropTable('usuarios');
    }
}