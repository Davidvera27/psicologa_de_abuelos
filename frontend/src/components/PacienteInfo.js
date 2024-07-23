//frontend\src\components\PacienteInfo.js

import React from 'react';
import { TextField, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const PacienteInfo = ({ formData, handleChange, calculateAge }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          helperText="Ej: David"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="apellidos"
          label="Apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          helperText="Ej: Restrepo Vera"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          type="date"
          name="fechaNacimiento"
          label="Fecha de Nacimiento"
          value={formData.fechaNacimiento}
          onChange={(e) => {
            handleChange(e);
            calculateAge(e.target.value);
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="edad"
          label="Edad"
          value={formData.edad}
          InputProps={{ readOnly: true }}
          helperText="Edad calculada automáticamente"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="lugarNacimiento"
          label="Lugar de Nacimiento"
          value={formData.lugarNacimiento}
          onChange={handleChange}
          helperText="Ej: Medellín"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          required
          name="documento"
          label="Documento (ID)"
          value={formData.documento}
          onChange={handleChange}
          helperText="Ej: 1036668393"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>RH</InputLabel>
          <Select
            name="rh"
            value={formData.rh}
            onChange={handleChange}
          >
            {['A+', 'B+', 'O+', 'A-', 'B-', 'O-', 'AB+', 'AB-'].map((rh) => (
              <MenuItem key={rh} value={rh}>
                {rh}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Género</InputLabel>
          <Select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
          >
            {['Masculino', 'Femenino'].map((genero) => (
              <MenuItem key={genero} value={genero}>
                {genero}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Nivel Educativo</InputLabel>
          <Select
            name="nivelEducativo"
            value={formData.nivelEducativo}
            onChange={handleChange}
          >
            {['Sin Escolaridad', 'Primaria', 'Bachiller', 'Pregrado'].map((nivel) => (
              <MenuItem key={nivel} value={nivel}>
                {nivel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Estado Civil</InputLabel>
          <Select
            name="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleChange}
          >
            {['Soltero', 'Casado', 'Viudo', 'Unión Libre'].map((estado) => (
              <MenuItem key={estado} value={estado}>
                {estado}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PacienteInfo;
