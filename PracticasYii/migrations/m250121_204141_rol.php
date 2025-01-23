<?php

use yii\db\Migration;

/**
 * Class m250121_204141_rol
 */
class m250121_204141_rol extends Migration
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

        // Modificar la tabla 'usuarios' para agregar la relación con 'rol'
        $this->addColumn('usuarios', 'id_rol', $this->integer()->notNull());

        // Agregar clave foránea entre 'usuarios' y 'rol'
        $this->addForeignKey(
            'fk-usuarios-id_rol', // Nombre de la clave foránea
            'usuarios',           // Tabla que contiene la clave foránea
            'id_rol',             // Columna en 'usuarios'
            'rol',                // Tabla referenciada
            'id',                 // Columna referenciada en 'rol'
            'CASCADE',            // Al eliminar un rol, eliminar usuarios relacionados
            'CASCADE'             // Al actualizar un rol, actualizar usuarios relacionados
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // Eliminar la clave foránea
        $this->dropForeignKey('fk-usuarios-id_rol', 'usuarios');

        // Eliminar la columna 'id_rol' de la tabla 'usuarios'
        $this->dropColumn('usuarios', 'id_rol');

        // Eliminar la tabla 'rol'
        $this->dropTable('rol');
    }
}
