import React, { useEffect, useState } from 'react';
import { getRoles, deleteRol } from '../../api/roles';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfirmDialog from '../common/ConfirmDialog';
import RoleCard from '../common/RoleCard'; 

const RolList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  // Obtener la lista de roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Error al obtener los roles:', error);
        setError('No se pudieron cargar los roles. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Manejar la edición de un rol
  const handleEditClick = (id) => {
    navigate(`/roles/editar/${id}`);
  };

  // Manejar la eliminación de un rol
  const handleDeleteClick = (role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  // Confirmar la eliminación de un rol
  const handleDeleteConfirm = async () => {
    try {
      await deleteRol(selectedRole.id);
      setRoles(roles.filter((role) => role.id !== selectedRole.id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
      setError('Hubo un problema al eliminar el rol.');
    }
  };

  // Cancelar la eliminación de un rol
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedRole(null);
  };

  // Mostrar un spinner mientras se cargan los datos
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  // Mostrar un mensaje de error si ocurre un problema
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
          Lista de Roles
        </Typography>
        <Button
          component={Link}
          to="/roles/crear"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: '20px' }}
        >
          Crear Rol
        </Button>
      </Box>

      {/* Lista de roles */}
      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item key={role.id} xs={12} sm={6} md={4}>
            <RoleCard
              role={role}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de confirmación para eliminar un rol */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Rol"
        description={`¿Estás seguro de que deseas eliminar el rol "${selectedRole?.nombre}"? Esta acción no se puede deshacer.`}
      />
    </Container>
  );
};

export default RolList;