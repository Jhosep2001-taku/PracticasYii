import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from '@mui/material';

const UsuarioForm = ({ usuario: initialUsuario, roles, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    id_rol: roles.length > 0 ? roles[0].id : 1,
  });

  useEffect(() => {
    if (isEditing && initialUsuario) {
      setFormData({
        nombre: initialUsuario.nombre || '',
        email: initialUsuario.email || '',
        password: '',
        id_rol: initialUsuario.id_rol || (roles.length > 0 ? roles[0].id : 1),
      });
    } else {
      setFormData({
        nombre: '',
        email: '',
        password: '',
        id_rol: roles.length > 0 ? roles[0].id : 1,
      });
    }
  }, [initialUsuario, isEditing, roles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = isEditing
      ? { ...formData, password: formData.password || undefined } 
      : formData;
    onSubmit(dataToSubmit);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto', backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
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
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              type="email"
              variant="outlined"
              sx={{ 
                borderRadius: 2, 
                marginBottom: 2, 
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
                },
                backgroundColor: 'background.paper'
              }}
              autoComplete="off"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required={!isEditing}
              type="password"
              variant="outlined"
              sx={{ 
                borderRadius: 2, 
                marginBottom: 2, 
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
                },
                backgroundColor: 'background.paper'
              }}
              autoComplete="new-password" 
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Rol</InputLabel>
              <Select
                name="id_rol"
                value={formData.id_rol}
                onChange={handleChange}
                label="Rol"
                sx={{ borderRadius: 2 }}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, borderRadius: 2 }}
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UsuarioForm;
