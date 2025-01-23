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
import EditIcon from '@mui/icons-material/Edit'; // Icono de editar
import DeleteIcon from '@mui/icons-material/Delete'; // Icono de eliminar

const RolList = () => {
  // Estado para almacenar los roles
  const [roles, setRoles] = useState([]);
  // Estado para manejar los errores
  const [error, setError] = useState(null);
  // Estado para manejar la carga
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamar a la función que obtiene los roles
    getRoles()
      .then((data) => {
        setRoles(data); // Guardar los roles en el estado
        setLoading(false); // Finalizar la carga
      })
      .catch((error) => {
        setError('Error al obtener los roles');
        setLoading(false); // Finalizar la carga incluso si hay un error
      });
  }, []); // El array vacío [] asegura que se ejecute solo una vez al cargar el componente

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