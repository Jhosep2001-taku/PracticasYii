import React, { useState, useEffect } from 'react';
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
import Modal from '../common/Modal';
import UsuarioCrear from './UsuarioCrear';
import UsuarioEditar from './UsuarioEditar';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../../api/usuarios';
import { getRoles } from '../../api/roles';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await getUsuarios();
        const rolesData = await getRoles();
        setUsuarios(usuariosData);
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

  const handleDeleteConfirm = async () => {
    try {
      await deleteUsuario(selectedUsuarioId);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== selectedUsuarioId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setError('Hubo un problema al eliminar el usuario.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUsuarioId(null);
  };

  const handleCreateClick = () => {
    setModalType('create');
    setSelectedUsuario(null);
    setModalOpen(true);
  };

  const handleEditClick = (usuario) => {
    setModalType('edit');
    setSelectedUsuario(usuario);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUsuario(null);
  };

  const handleFormSubmit = async (usuarioData) => {
    try {
      if (modalType === 'create') {
        const nuevoUsuario = await createUsuario(usuarioData);
        setUsuarios([...usuarios, nuevoUsuario]); // Agregar el nuevo usuario al estado
      } else if (modalType === 'edit') {
        const usuarioActualizado = await updateUsuario(selectedUsuario.id, usuarioData);
        setUsuarios(
          usuarios.map((usuario) =>
            usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario
          )
        ); // Actualizar el usuario en el estado
      }
      setModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.details && Array.isArray(data.details)) {
          const errorMessages = data.details.map(
            (detail) => `${detail.field}: ${detail.message}`
          );
          setError(errorMessages.join(', '));
        } else if (data.message) {
          setError(data.message);
        } else {
          setError('Hubo un problema al guardar el usuario.');
        }
      } else {
        setError('Hubo un problema al guardar el usuario.');
      }
    }
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
          onClick={handleCreateClick}
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
                onEditClick={handleEditClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        title={modalType === 'create' ? 'Crear Usuario' : 'Editar Usuario'}
      >
        {modalType === 'create' ? (
          <UsuarioCrear roles={roles} onSubmit={handleFormSubmit} />
        ) : (
          <UsuarioEditar usuario={selectedUsuario} roles={roles} onSubmit={handleFormSubmit} />
        )}
      </Modal>

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