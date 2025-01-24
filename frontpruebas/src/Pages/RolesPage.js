import React from 'react';
import { Routes, Route,  } from 'react-router-dom';
import { Container} from '@mui/material';
import RolList from '../components/roles/RolList';
import RolCrear from '../components/roles/RolCrear';
import RolEditar from '../components/roles/RolEditar';
import RolEliminar from '../components/roles/RolEliminar';

const RolesPage = () => {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<RolList />} />
                <Route path="/crear" element={<RolCrear />} />
                <Route path="/editar/:id" element={<RolEditar />} />
                <Route path="/eliminar/:id" element={<RolEliminar />} />
            </Routes>
        </Container>
    );
};

export default RolesPage;