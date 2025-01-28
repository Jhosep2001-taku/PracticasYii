import React, { useEffect, useState } from 'react';
import { getRoles, createRol, updateRol, deleteRol } from '../../api/roles';
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
import ErrorPopup from '../common/ErrorPopup'; // Importa el componente ErrorPopup

const RolList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); 
  const [modalType, setModalType] = useState(null); 

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
  const handleEditClick = (role) => {
    setSelectedRole(role);
    setModalType('edit');
    setModalOpen(true);
  };

  // Manejar la creación de un rol
  const handleCreateClick = () => {
    setSelectedRole(null);
    setModalType('create');
    setModalOpen(true);
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

  // Cerrar el modal
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRole(null);
  };

  // Manejar el envío del formulario (crear o editar)
  const handleFormSubmit = async (rolData) => {
    try {
      if (modalType === 'create') {
        const nuevoRol = await createRol(rolData); 
        const rolesData = await getRoles();
        setRoles(rolesData);
      } else if (modalType === 'edit') {
        await updateRol(selectedRole.id, rolData); 
        const rolesData = await getRoles();
        setRoles(rolesData);
      }
      setModalOpen(false); 
    } catch (error) {
      console.error('Error al guardar el rol:', error);
      setError('Hubo un problema al guardar el rol.');
    }
  };

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
        open={modalOpen}
        onClose={handleModalClose}
        title={modalType === 'create' ? 'Crear Rol' : 'Editar Rol'}
        onConfirm={handleFormSubmit}
        confirmText={modalType === 'create' ? 'Crear' : 'Guardar'}
      >
        {modalType === 'create' ? (
          <RolCrear onSubmit={handleFormSubmit} />
        ) : (
          <RolEditar rol={selectedRole} onSubmit={handleFormSubmit} />
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