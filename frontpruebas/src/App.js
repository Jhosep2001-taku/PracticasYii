import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, CssBaseline, Box } from '@mui/material';
import UsuariosPage from './Pages/UsuariosPage';
import RolesPage from './Pages/RolesPage';
import logo from './assets/logo.png';

const App = () => {
    return (
        <Router>
            <CssBaseline />
            {/* AppBar sin Container para que ocupe todo el ancho */}
            <AppBar
                position="static"
                sx={{
                    background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                }}
            >
                <Toolbar sx={{ paddingLeft: '5%', paddingRight: '5%' }}> {/* Usamos porcentajes para el padding */}
                    {/* Logo */}
                    <Box
                        component="img"
                        src={logo}
                        alt="Logo"
                        sx={{
                            height: 40,
                            marginRight: 2,
                        }}
                    />

                    {/* Título */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                        }}
                    >
                        Sistema de Usuarios
                    </Typography>

                    {/* Botones de navegación */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/usuarios"
                            sx={{
                                margin: '0 10px',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Usuarios
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/roles"
                            sx={{
                                margin: '0 10px',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Roles
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Contenido principal con padding relativo */}
            <Box sx={{ marginTop: '20px', paddingLeft: '5%', paddingRight: '5%' }}>
                <Routes>
                    <Route path="/usuarios/*" element={<UsuariosPage />} />
                    <Route path="/roles/*" element={<RolesPage />} />
                    <Route path="*" element={<UsuariosPage />} />
                </Routes>
            </Box>
        </Router>
    );
};

export default App;