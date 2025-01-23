import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import UsuariosPage from './Pages/UsuariosPage';
import RolesPage from './Pages/RolesPage';

const App = () => {
    return (
        <Router>
            {/* Aplicar un reset de estilos para mayor consistencia */}
            <CssBaseline />

            {/* Barra de navegación superior */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Mi Aplicación
                    </Typography>
                    {/* Botones de navegación */}
                    <Button color="inherit" component={Link} to="/usuarios">
                        Usuarios
                    </Button>
                    <Button color="inherit" component={Link} to="/roles">
                        Roles
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Contenedor principal para el contenido */}
            <Container sx={{ marginTop: '20px' }}>
                <Routes>
                    <Route path="/usuarios/*" element={<UsuariosPage />} />
                    <Route path="/roles/*" element={<RolesPage />} />
                    {/* Ruta por defecto (redirige a /usuarios) */}
                    <Route path="*" element={<UsuariosPage />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;