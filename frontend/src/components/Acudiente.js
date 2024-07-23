// frontend/src/components/Acudiente.js

import React from 'react';
import { TextField, Grid } from '@mui/material';

const Acudiente = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="acudienteNombre"
          label="Nombre del Acudiente"
          value={formData.acudienteNombre || ''}
          onChange={handleChange}
          helperText="Ej: David"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="acudienteApellidos"
          label="Apellidos del Acudiente"
          value={formData.acudienteApellidos || ''}
          onChange={handleChange}
          helperText="Ej: Restrepo Vera"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="acudienteDocumento"
          label="Documento del Acudiente"
          value={formData.acudienteDocumento || ''}
          onChange={handleChange}
          helperText="Ej: 1036668393"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="acudienteTelefono"
          label="Teléfono del Acudiente"
          value={formData.acudienteTelefono || ''}
          onChange={handleChange}
          helperText="Ej: 3016374859"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="EmailAcudiente"
          label="Correo electrónico"
          value={formData.EmailAcudiente || ''}
          onChange={handleChange}
          helperText="Ej: acudiente_paciente@correo.com"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="acudienteParentesco"
          label="Parentesco"
          value={formData.acudienteParentesco || ''}
          onChange={handleChange}
          helperText="Ej: Sobrino"
        />
      </Grid>
    </Grid>
  );
};

export default Acudiente;
