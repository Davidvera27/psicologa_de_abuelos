import React, { useState, useEffect } from 'react';
import { Typography, TextField, List, ListItem, ListItemText, Divider, Paper, Box } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import styled from 'styled-components';

const FilterWrapper = styled(Paper)`
  margin: 1rem 0;
  padding: 1rem;
`;

const SelectedPacienteWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const AttendanceInfoWrapper = styled.div`
  margin-top: 1rem;
`;

const Historico = () => {
  const [search, setSearch] = useState('');
  const [pacientes] = useState([
    {
      nombre: 'Juan',
      apellidos: 'Pérez',
      documento: '12345678',
    },
    {
      nombre: 'Ana',
      apellidos: 'García',
      documento: '87654321',
    },
    {
      nombre: 'Carlos',
      apellidos: 'Lopez',
      documento: '11223344',
    },
  ]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceInfo, setAttendanceInfo] = useState(null);

  useEffect(() => {
    const results = pacientes.filter(paciente =>
      paciente.nombre.toLowerCase().includes(search.toLowerCase()) ||
      paciente.documento.includes(search)
    );
    setFilteredPacientes(results);
  }, [search, pacientes]);

  const handleSelectPaciente = (paciente) => {
    setSelectedPaciente(paciente);
    setAttendanceInfo(null);
    setSelectedDate(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Datos ficticios de asistencia
    const fakeAttendanceData = {
      '12345678': {
        '2023-07-10': { attended: true },
        '2023-07-11': { attended: false, reason: 'Enfermedad' },
      },
      '87654321': {
        '2023-07-10': { attended: false, reason: 'Vacaciones' },
        '2023-07-11': { attended: true },
      },
      '11223344': {
        '2023-07-10': { attended: true },
        '2023-07-11': { attended: false, reason: 'Compromiso personal' },
      },
    };

    const attendanceData = fakeAttendanceData[selectedPaciente.documento] || {};
    const attendanceInfo = attendanceData[date.format('YYYY-MM-DD')] || null;
    setAttendanceInfo(attendanceInfo);
  };

  return (
    <div>
      <Typography variant="h4">Histórico</Typography>
      <FilterWrapper>
        <TextField
          label="Buscar por nombre o documento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </FilterWrapper>
      <List>
        {filteredPacientes.map((paciente) => (
          <div key={paciente.documento}>
            <SelectedPacienteWrapper>
              <ListItem button onClick={() => handleSelectPaciente(paciente)}>
                <ListItemText primary={`${paciente.nombre} ${paciente.apellidos}`} secondary={paciente.documento} />
              </ListItem>
              {selectedPaciente && selectedPaciente.documento === paciente.documento && (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Seleccionar fecha"
                      inputFormat="MM/DD/YYYY"
                      value={selectedDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} margin="normal" />}
                    />
                  </LocalizationProvider>
                  {selectedDate && attendanceInfo && (
                    <AttendanceInfoWrapper>
                      <Typography variant="body1">
                        Información de Asistencia para {selectedPaciente.nombre} {selectedPaciente.apellidos} el {selectedDate.format('DD-MM-YYYY')}
                      </Typography>
                      <Typography variant="body1">
                        {attendanceInfo.attended ? 'Asistió' : 'No asistió'}
                      </Typography>
                      {!attendanceInfo.attended && (
                        <TextField
                          label="Motivo de no asistencia"
                          value={attendanceInfo.reason}
                          fullWidth
                          margin="normal"
                          disabled
                        />
                      )}
                    </AttendanceInfoWrapper>
                  )}
                </>
              )}
            </SelectedPacienteWrapper>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default Historico;
