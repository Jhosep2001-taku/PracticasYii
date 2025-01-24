import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Box,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const RoleCard = ({ role, onEditClick, onDeleteClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Animación al hacer hover
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: '15px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Box
          sx={{
            padding: '20px',
            background: 'linear-gradient(145deg, #3f51b5, #2196f3)',
            color: 'white',
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              marginBottom: '10px',
              background: 'linear-gradient(145deg, #ffffff, #e0e0e0)',
              color: '#3f51b5',
              fontSize: '24px',
            }}
          >
            {role.nombre.charAt(0)}
          </Avatar>
          <Typography variant="h6" component="div">
            {role.nombre}
          </Typography>
          <Typography variant="body2">{role.descripcion}</Typography>
        </Box>
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Fecha de Creación:</strong>{' '}
            {new Date(role.fecha_creacion).toLocaleDateString()}
          </Typography>
          <Box>
            <IconButton
              color="primary"
              onClick={() => onEditClick(role.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => onDeleteClick(role)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default RoleCard;