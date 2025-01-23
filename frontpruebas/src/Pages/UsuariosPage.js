import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import UsuarioList from '../components/usuarios/UsuarioList';
import UsuarioCrear from '../components/usuarios/UsuarioCrear';
import UsuarioEditar from '../components/usuarios/UsuarioEditar';
import UsuarioEliminar from '../components/usuarios/UsuarioEliminar';
import AddIcon from '@mui/icons-material/Add';

const UsuariosPage = () => {
    return (
        <Container>
            {/* Título de la página */}
            <Typography variant="h3" component="h1" gutterBottom>
                Gestión de Usuarios
            </Typography>

            {/* Botón para crear un nuevo usuario */}
            <Box sx={{ marginBottom: '20px' }}>
                <Button
                    component={Link}
                    to="/usuarios/crear"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                >
                    Crear Usuario
                </Button>
            </Box>
            {/* Rutas para la gestión de usuarios */}
            <Routes>
                {/* Ruta para mostrar la lista de usuarios */}
                <Route path="/" element={<UsuarioList />} />
                {/* Rutas para CRUD */}
                <Route path="/crear" element={<UsuarioCrear />} />
                <Route path="/editar/:id" element={<UsuarioEditar />} />
                <Route path="/eliminar/:id" element={<UsuarioEliminar />} />
            </Routes>
        </Container>
    );
};

export default UsuariosPage;