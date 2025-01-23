import React, { useEffect, useState } from 'react';
import { getRoles } from '../../api/roles'; // Asegúrate de ajustar la ruta al archivo donde se encuentran tus funciones
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  IconButton, // Importar IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 

const RolList = () => {
  
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    getRoles()
      .then((data) => {
        setRoles(data); 
        setLoading(false); 
      })
      .catch((error) => {
        setError('Error al obtener los roles');
        setLoading(false); 
      });
  }, []); 

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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Acciones</TableCell> {/* Columna para acciones */}
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.id}</TableCell>
              <TableCell>{role.nombre}</TableCell>
              <TableCell>{role.descripcion}</TableCell>
              <TableCell>{role.fecha_creacion}</TableCell>
              <TableCell>
                {/* Botones de acciones con iconos */}
                <IconButton
                  component={Link}
                  to={`/roles/editar/${role.id}`}
                  color="primary"
                  aria-label="Editar"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  component={Link}
                  to={`/roles/eliminar/${role.id}`}
                  color="secondary"
                  aria-label="Eliminar"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RolList;