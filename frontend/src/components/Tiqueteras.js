//frontend\src\components\Tiqueteras.js

import React, { useEffect, useMemo } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const Tiqueteras = ({ formData, setFormData, handleChange, handleFechaIngresoChange }) => {
  // Definir los valores predeterminados de las tiqueteras usando useMemo
  const tiqueteraValores = useMemo(() => ({
    T1: 360000,
    T2: 720000,
    T3: 1080000,
    T4: 1440000,
    T5: 1700000,
  }), []);

  useEffect(() => {
    // Establecer el valor predeterminado de "Valor Pagado" basado en la tiquetera seleccionada
    const valorPagado = tiqueteraValores[formData.tiquetera] || 0;
    const valorConvenio = parseFloat(formData.valorConvenio) || 0;
    const totalPagado = valorPagado - valorConvenio;

    setFormData(prevFormData => ({
      ...prevFormData,
      valorPagado: valorPagado,
      totalPagado: totalPagado,
    }));
  }, [formData.tiquetera, formData.valorConvenio, setFormData, tiqueteraValores]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Tiquetera</InputLabel>
          <Select
            name="tiquetera"
            value={formData.tiquetera || ''}
            onChange={handleChange}
          >
            <MenuItem value="T1">Tiquetera 1</MenuItem>
            <MenuItem value="T2">Tiquetera 2</MenuItem>
            <MenuItem value="T3">Tiquetera 3</MenuItem>
            <MenuItem value="T4">Tiquetera 4</MenuItem>
            <MenuItem value="T5">Tiquetera 5</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Estado de Tiquetera</InputLabel>
          <Select
            name="estadoTiquetera"
            value={formData.estadoTiquetera || ''}
            onChange={handleChange}
          >
            <MenuItem value="Activa">Activa</MenuItem>
            <MenuItem value="Inactiva">Inactiva</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Fecha de Ingreso"
          name="fechaIngreso"
          type="date"
          value={formData.fechaIngreso || ''}
          onChange={handleFechaIngresoChange}
          InputLabelProps={{ shrink: true }}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Fecha de Vencimiento"
          name="fechaVencimiento"
          type="date"
          value={formData.fechaVencimiento || ''}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Valor Pagado"
          name="valorPagado"
          value={formData.valorPagado || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Total Pagado"
          name="totalPagado"
          value={formData.totalPagado || ''}
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Valor Convenio"
          name="valorConvenio"
          value={formData.valorConvenio || ''}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default Tiqueteras;
