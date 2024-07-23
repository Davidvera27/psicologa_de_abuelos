//frontend\src\pages\conductor.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid } from '@mui/material';

const Conductor = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pacientes');
        const pacientesConTransporte = response.data.filter(paciente => paciente.servicioTransporte === 'Sí');
        setPacientes(pacientesConTransporte);
      } catch (err) {
        console.error('Error al obtener los pacientes:', err);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <Container>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>Recogidas</Typography>
        <Grid container spacing={3}>
          {pacientes.map((paciente, index) => (
            <Grid item xs={12} key={paciente._id}>
              <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: '16px' }}>
                <Typography variant="body1"><strong>Nombre:</strong> {paciente.nombre} {paciente.apellidos}</Typography>
                <Typography variant="body1"><strong>Acudiente:</strong> {paciente.acudienteNombre} {paciente.acudienteApellidos}</Typography>
                <Typography variant="body1"><strong>Teléfono Acudiente:</strong> {paciente.acudienteTelefono}</Typography>
                <Typography variant="body1"><strong>Teléfono del Paciente:</strong> {paciente.contacto}</Typography>
                <Typography variant="body1"><strong>Barrio:</strong> {paciente.barrio}</Typography>
                <Typography variant="body1"><strong>Dirección:</strong> {paciente.direccion}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Conductor;
