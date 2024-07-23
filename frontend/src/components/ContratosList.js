import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

const ContratosList = ({ paciente }) => {
  const handleDownload = async (tipoDeContrato) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/pacientes/${paciente._id}/contrato`, {
        params: { tipoDeContrato },
        responseType: 'blob',
      });

      const contrato = await res.data;
      const url = window.URL.createObjectURL(new Blob([contrato]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${tipoDeContrato}_contrato_${paciente.nombre}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error al descargar el contrato:', err);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Contratos</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDownload('centro_dia')}
        sx={{ mr: 2 }}
      >
        Descargar Contrato Centro de Día
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleDownload('transporte')}>
        Descargar Contrato de Transporte
      </Button>
    </Box>
  );
};

export default ContratosList;
