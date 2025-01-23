import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../../api/usuarios';
import { getRoles } from '../../api/roles';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Box,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await getUsuarios();
        setUsuarios(usuariosData);

        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error al obtener los usuarios o roles:', error);
        setError('No se pudieron cargar los usuarios o roles. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchData();
  }, []);

  const getRoleName = (id_rol) => {
    const rol = roles.find((role) => role.id === id_rol);
    return rol ? rol.nombre : 'Sin rol asignado';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Container>
      {/* Título y botón para crear un nuevo usuario */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Typography variant="h4" gutterBottom>
          Lista de Usuarios
        </Typography>

      </Box>

      {/* Lista de usuarios */}
      {usuarios.length === 0 ? (
        <Typography variant="body1">No hay usuarios disponibles.</Typography>
      ) : (
        <Grid container spacing={3}>
          {usuarios.map((usuario) => (
            <Grid item key={usuario.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {usuario.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Email:</strong> {usuario.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Rol:</strong> {getRoleName(usuario.id_rol)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Fecha de Creación:</strong> {usuario.fecha_creacion}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    component={Link}
                    to={`/usuarios/editar/${usuario.id}`}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/usuarios/eliminar/${usuario.id}`}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UsuarioList;