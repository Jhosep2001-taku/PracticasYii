import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
} from '@mui/material';

const RolForm = ({ rol: initialRol, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {
    if (isEditing && initialRol) {
      setFormData({
        nombre: initialRol.nombre || '',
        descripcion: initialRol.descripcion || ''
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: ''
      });
    }
  }, [initialRol, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto', backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        {isEditing ? 'Editar Rol' : 'Crear Rol'}
      </Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.dark',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.light',
                  },
                }
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, borderRadius: 2 }}
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Rol'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RolForm;