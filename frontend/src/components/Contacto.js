//frontend\src\components\Contacto.js

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel } from '@mui/material';

const Contacto = ({ formData, handleChange, handleCheckboxChange }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="contacto"
        name="contacto"
        label="Teléfono"
        fullWidth
        autoComplete="tel"
        variant="standard"
        value={formData.contacto}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        id="telefono2"
        name="telefono2"
        label="Teléfono 2"
        fullWidth
        autoComplete="tel"
        variant="standard"
        value={formData.telefono2}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="direccion"
        name="direccion"
        label="Dirección"
        fullWidth
        autoComplete="address-line1"
        variant="standard"
        value={formData.direccion}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        id="barrio"
        name="barrio"
        label="Barrio"
        fullWidth
        variant="standard"
        value={formData.barrio}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        id="apartamentoInterior"
        name="apartamentoInterior"
        label="Apartamento / Interior"
        fullWidth
        autoComplete="address-line2"
        variant="standard"
        value={formData.apartamentoInterior}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12}>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.servicioTransporte === 'Sí'}
            onChange={handleCheckboxChange}
            name="servicioTransporte"
            color="primary"
          />
        }
        label="Requiere Servicio de Transporte"
      />
    </Grid>
  </Grid>
);

export default Contacto;
