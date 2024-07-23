//frontend\src\components\ClinicaInfo.js

import React from 'react';
import { TextField, Grid, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ClinicaInfo = ({
  formData,
  handleChange,
  handleCheckboxChange,
  handleMedicamentoDialogOpen,
  handleMedicamentoDialogClose,
  handleAddMedicamento,
  medicamentoDialogOpen,
  nuevoMedicamento,
  setNuevoMedicamento,
  handleMedicamentoCheckChange
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleMedicamentoDialogOpen}
        >
          Agregar Medicamento
        </Button>
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
        <Box sx={{ mt: 2 }}>
          {formData.medicamentos.map((med, index) => (
            <Box key={index} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={med.checked}
                    onChange={(e) => handleMedicamentoCheckChange(index, e.target.checked)}
                    name="medicamentoCheck"
                  />
                }
                label={med.name}
              />
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="alimentacion"
          label="Alimentación"
          value={formData.alimentacion}
          onChange={handleChange}
          helperText="Ej: Huevos, leche, proteínas"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="restricciones"
          label="Restricciones"
          value={formData.restricciones}
          onChange={handleChange}
          helperText="Ej: Agitarse, esfuerzo físico, agacharse"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="diagnostico"
          label="Diagnóstico"
          value={formData.diagnostico}
          onChange={handleChange}
          helperText="Ej: Esclerosis lateral múltiple"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="epsSisen"
          label="EPS"
          value={formData.epsSisen}
          onChange={handleChange}
          helperText="Ej: SURA"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.servicioEmi === 'Sí'}
              onChange={handleCheckboxChange}
              name="servicioEmi"
            />
          }
          label="Servicio Emi"
        />
        {formData.servicioEmi === 'Sí' && (
          <TextField
            fullWidth
            name="telefonoEmi"
            label="Teléfono Emi"
            value={formData.telefonoEmi}
            onChange={handleChange}
          />
        )}
      </Grid>
      {/* Nuevos campos */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="motivoConsulta"
          label="Motivo de Consulta"
          value={formData.motivoConsulta}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="antecedentesAtencionIntegral"
          label="Antecedentes de Atención Integral"
          value={formData.antecedentesAtencionIntegral}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="antecedentesMedicos"
          label="Antecedentes Médicos Relevantes"
          value={formData.antecedentesMedicos}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="diagnosticoMedicoPsicologico"
          label="Diagnóstico Médico y/o Psicológico"
          value={formData.diagnosticoMedicoPsicologico}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="antecedentesFamiliares"
          label="Antecedentes Familiares Significativos"
          value={formData.antecedentesFamiliares}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="antecedentesTratamiento"
          label="Antecedentes de Tratamiento o Psicológica"
          value={formData.antecedentesTratamiento}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="areaComportamiento"
          label="Área de Comportamiento"
          value={formData.areaComportamiento}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default ClinicaInfo;
