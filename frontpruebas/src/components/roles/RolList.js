import React, { useState, useEffect, useCallback } from 'react';
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
import Modal from '../common/Modal';
import RolCrear from './RolCrear';
import RolEditar from './RolEditar';
import ErrorPopup from '../common/ErrorPopup';
import { getRoles, createRol, updateRol, deleteRol } from '../../api/roles';

const RolList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modal, setModal] = useState({ open: false, type: null, role: null });

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

  // Manejar la creación de un rol
  const handleCreateClick = () => {
    setModal({ open: true, type: 'create', role: null });
  };

  // Manejar la edición de un rol
  const handleEditClick = (role) => {
    setModal({ open: true, type: 'edit', role });
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
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== selectedRole.id));
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

  // Cerrar el modal
  const handleModalClose = () => {
    setModal({ open: false, type: null, role: null });
  };

  // Manejar el envío del formulario (crear o editar)
  const handleFormSubmit = useCallback(async (rolData) => {
    try {
      if (modal.type === 'create') {
        const nuevoRol = await createRol(rolData);
        setRoles((prevRoles) => [...prevRoles, nuevoRol]);
      } else if (modal.type === 'edit') {
        const rolActualizado = await updateRol(modal.role.id, rolData);
        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.id === rolActualizado.id ? rolActualizado : role
          )
        );
      }
      setModal({ open: false, type: null, role: null });
    } catch (error) {
      console.error('Error al guardar el rol:', error);
      setError('Hubo un problema al guardar el rol.');
    }
  }, [modal.type, modal.role]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Typography variant="h4" gutterBottom>
          Lista de Roles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
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

      {/* Modal para crear/editar roles */}
      <Modal
        key={modal.type === 'create' ? 'create' : 'edit'}
        open={modal.open}
        onClose={handleModalClose}
        title={modal.type === 'create' ? 'Crear Rol' : 'Editar Rol'}
      >
        {modal.type === 'create' ? (
          <RolCrear onSubmit={handleFormSubmit} />
        ) : (
          <RolEditar rol={modal.role} onSubmit={handleFormSubmit} />
        )}
      </Modal>

      {/* Diálogo de confirmación para eliminar un rol */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Rol"
        description={`¿Estás seguro de que deseas eliminar el rol "${selectedRole?.nombre}"? Esta acción no se puede deshacer.`}
      />

      {/* Integración del ErrorPopup */}
      <ErrorPopup message={error} onClose={() => setError(null)} />
    </Container>
  );
};

export default RolList;