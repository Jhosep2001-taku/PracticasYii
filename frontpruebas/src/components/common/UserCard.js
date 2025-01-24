import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

const UserCard = ({ usuario, roles, onDeleteClick }) => {
  const getRoleName = (id_rol) => {
    const rol = roles.find((role) => role.id === id_rol);
    return rol ? rol.nombre : 'Sin rol asignado';
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(45deg, #f3f3f3 30%, #ffffff 90%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" marginBottom="10px">
          <Avatar
            sx={{
              width: 56,
              height: 56,
              marginRight: 2,
              background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
            }}
          >
            {usuario.nombre.charAt(0)}
          </Avatar>
          <Typography variant="h6" component="div">
            {usuario.nombre}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Email:</strong> {usuario.email}
        </Typography>

        <Box marginBottom="10px">
          <Chip
            label={getRoleName(usuario.id_rol)}
            color="primary"
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          <strong>Fecha de Creación:</strong>{' '}
          {format(new Date(usuario.fecha_creacion), 'dd/MM/yyyy HH:mm')}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton component={Link} to={`/usuarios/editar/${usuario.id}`} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => onDeleteClick(usuario.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UserCard;