// src/components/MedicamentoDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const MedicamentoDialog = ({
  medicamentoDialogOpen,
  handleMedicamentoDialogClose,
  nuevoMedicamento,
  setNuevoMedicamento,
  handleAddMedicamento
}) => {
  return (
    <Dialog open={medicamentoDialogOpen} onClose={handleMedicamentoDialogClose}>
      <DialogTitle>Agregar Medicamento</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="nuevoMedicamento"
          label="Medicamento"
          fullWidth
          value={nuevoMedicamento}
          onChange={(e) => setNuevoMedicamento(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleMedicamentoDialogClose}>Cancelar</Button>
        <Button onClick={handleAddMedicamento}>Agregar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MedicamentoDialog;
