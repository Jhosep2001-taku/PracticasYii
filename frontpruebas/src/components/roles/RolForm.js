import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const RolForm = ({ rol: initialRol, onSubmit, buttonText }) => {
    const [nombre, setNombre] = useState(initialRol?.nombre || '');
    const [descripcion, setDescripcion] = useState(initialRol?.descripcion || '');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialRol) {
            setNombre(initialRol.nombre);
            setDescripcion(initialRol.descripcion);
        }
    }, [initialRol]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !descripcion) {
            setError('Todos los campos son requeridos');
            return;
        }
        setError(null);
        onSubmit({ nombre, descripcion });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Paper
                elevation={6}
                sx={{
                    borderRadius: '15px',
                    padding: '20px',
                    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        padding: 2,
                        width: '100%',
                        maxWidth: 500,
                        margin: 'auto',
                    }}
                >

                    {error && (
                        <Typography variant="body2" color="error" align="center">
                            {error}
                        </Typography>
                    )}

                    <TextField
                        label="Nombre"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        fullWidth
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#dcdcdc',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#2196f3',
                                },
                            },
                        }}
                    />

                    <TextField
                        label="Descripción"
                        variant="outlined"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        multiline
                        rows={4}
                        fullWidth
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#dcdcdc',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#2196f3',
                                },
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: '#3f51b5',
                            '&:hover': {
                                backgroundColor: '#303f9f',
                            },
                            padding: '10px 20px',
                            borderRadius: '8px',
                        }}
                    >
                        {buttonText}
                    </Button>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default RolForm;
