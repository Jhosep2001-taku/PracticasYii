import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import RolList from '../components/roles/RolList';
import RolCrear from '../components/roles/RolCrear';
import RolEditar from '../components/roles/RolEditar';
import RolEliminar from '../components/roles/RolEliminar';
import AddIcon from '@mui/icons-material/Add';

const RolesPage = () => {
    return (
        <Container>
            {/* Título de la página */}
            <Typography variant="h3" component="h1" gutterBottom>
                Gestión de Roles
            </Typography>

            {/* Botón para crear un nuevo rol */}
            <Box sx={{ marginBottom: '20px' }}>
                <Button
                    component={Link}
                    to="/roles/crear"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                >
                    Crear Rol
                </Button>
            </Box>

            {/* Rutas para la gestión de roles */}
            <Routes>
                {/* Ruta para mostrar la lista de roles */}
                <Route path="/" element={<RolList />} />
                {/* Rutas para CRUD */}
                <Route path="/crear" element={<RolCrear />} />
                <Route path="/editar/:id" element={<RolEditar />} />
                <Route path="/eliminar/:id" element={<RolEliminar />} />
            </Routes>
        </Container>
    );
};

export default RolesPage;