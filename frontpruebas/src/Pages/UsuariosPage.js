import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import UsuarioList from '../components/usuarios/UsuarioList';
import UsuarioCrear from '../components/usuarios/UsuarioCrear';
import UsuarioEditar from '../components/usuarios/UsuarioEditar';
import UsuarioEliminar from '../components/usuarios/UsuarioEliminar';

const UsuariosPage = () => {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<UsuarioList />} />
                <Route path="/crear" element={<UsuarioCrear />} />
                <Route path="/editar/:id" element={<UsuarioEditar />} />
                <Route path="/eliminar/:id" element={<UsuarioEliminar />} />
            </Routes>
        </Container>
    );
};

export default UsuariosPage;