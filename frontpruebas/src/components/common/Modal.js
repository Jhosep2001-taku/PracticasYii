import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const Modal = ({ open, onClose, title, children, onConfirm, confirmText }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;