import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../../api/usuarios';
import { getRoles } from '../../api/roles';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserCard from '../common/UserCard'; 
import ConfirmDialog from '../common/ConfirmDialog'; 

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);

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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedUsuarioId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Aquí iría la lógica para eliminar el usuario
    console.log('Eliminar usuario con ID:', selectedUsuarioId);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUsuarioId(null);
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
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Typography variant="h4" gutterBottom>
          Lista de Usuarios
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/usuarios/crear"
        >
          Nuevo Usuario
        </Button>
      </Box>

      {usuarios.length === 0 ? (
        <Typography variant="body1">No hay usuarios disponibles.</Typography>
      ) : (
        <Grid container spacing={3}>
          {usuarios.map((usuario) => (
            <Grid item key={usuario.id} xs={12} sm={6} md={4}>
              <UserCard
                usuario={usuario}
                roles={roles}
                onDeleteClick={handleDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Usuario"
        description="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
      />
    </Container>
  );
};

export default UsuarioList;