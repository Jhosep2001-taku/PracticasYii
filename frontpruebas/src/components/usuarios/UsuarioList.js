import React, { useState, useEffect, useCallback } from 'react';
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
import ErrorPopup from '../common/ErrorPopup';  

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
  const [modal, setModal] = useState({ open: false, type: null, usuario: null });

  // Función para cargar los datos iniciales
  const fetchData = useCallback(async () => {
    try {
      const [usuariosData, rolesData] = await Promise.all([getUsuarios(), getRoles()]);
      setUsuarios(usuariosData);
      setRoles(rolesData);
    } catch (error) {
      console.error('Error al obtener los usuarios o roles:', error);
      setError('No se pudieron cargar los usuarios o roles. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Manejo de la eliminación de usuarios
  const handleDeleteClick = (id) => {
    setSelectedUsuarioId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteUsuario(selectedUsuarioId);
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== selectedUsuarioId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setError('Hubo un problema al eliminar el usuario.');
    }
  }, [selectedUsuarioId]);

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUsuarioId(null);
  };

  // Manejo del modal para crear/editar usuarios
  const handleCreateClick = () => {
    setModal({ open: true, type: 'create', usuario: null }); 
  };  

  const handleEditClick = (usuario) => {
    setModal({ open: true, type: 'edit', usuario });
  };

  const handleModalClose = () => {
    setModal({ open: false, type: null, usuario: null }); 
  };

  // Manejo del envío del formulario
  const handleFormSubmit = useCallback(async (usuarioData) => {
    try {
      if (modal.type === 'create') {
        const nuevoUsuario = await createUsuario(usuarioData);
        setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
      } else if (modal.type === 'edit') {
        const usuarioActualizado = await updateUsuario(modal.usuario.id, usuarioData);
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario
          )
        );
      }
      setModal({ open: false, type: null, usuario: null });
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      setError('Hubo un problema al guardar el usuario.');
    }
  }, [modal.type, modal.usuario]);

  // Renderizado condicional
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
        key={modal.type === 'create' ? 'create' : 'edit'} 
        open={modal.open}
        onClose={handleModalClose}
        title={modal.type === 'create' ? 'Crear Usuario' : 'Editar Usuario'}
      >
        {modal.type === 'create' ? (
          <UsuarioCrear roles={roles} onSubmit={handleFormSubmit} />
        ) : (
          <UsuarioEditar usuario={modal.usuario} roles={roles} onSubmit={handleFormSubmit} />
        )}
      </Modal>

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Usuario"
        description="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
      />

      {/* Integración del ErrorPopup */}
      <ErrorPopup message={error} onClose={() => setError(null)} />
    </Container>
  );
};

export default React.memo(UsuarioList);