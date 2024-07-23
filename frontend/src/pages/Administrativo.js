import React, { useState, useEffect } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Paper, Radio, RadioGroup, FormControlLabel, TextField, Button, Checkbox,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';
import styled from 'styled-components';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const FilterWrapper = styled(Paper)`
  margin: 1rem 0;
  padding: 1rem;
`;

const AttendanceWrapper = styled.div`
  margin-top: 1rem;
`;

const TableCellStyled = styled(TableCell)`
  padding: 8px;
  white-space: nowrap;
`;

const TableContainerStyled = styled(TableContainer)`
  width: auto;
  display: inline-block;
`;

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const Administrativo = () => {
  const [pacientes, setPacientes] = useState([]);
  const [filterDay, setFilterDay] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [attendance, setAttendance] = useState({});
  const [excuse, setExcuse] = useState('');
  const [reason, setReason] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmation, setConfirmation] = useState({});
  const [monthDates, setMonthDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/pacientes');
        console.log('Datos de pacientes:', res.data);  // Log de los datos de pacientes
        setPacientes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPacientes();
  }, []);

  useEffect(() => {
    const today = new Date();
    const daysInMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
    setMonthDates(daysInMonth);
  }, []);

  const handleAttendanceChange = (index, value) => {
    setAttendance({
      ...attendance,
      [index]: value,
    });
  };

  const handleExcuseChange = (e) => {
    setExcuse(e.target.value);
  };

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleConfirmationChange = (index, event) => {
    event.stopPropagation();
    setConfirmation({
      ...confirmation,
      [index]: !confirmation[index],
    });
  };

  const filteredData = pacientes.filter((item) => {
    const matchesDay = filterDay ? item.diaQueAsistira === filterDay : true;
    const matchesDate = filterDate
      ? item.diasSeleccionados.some((dia) => {
          try {
            const date = new Date(dia.start);
            return format(date, 'dd/MM/yyyy') === filterDate;
          } catch {
            return false;
          }
        })
      : true;
    return matchesDay && matchesDate;
  });

  const handleNavigateHistorico = () => {
    navigate('/historico');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Button variant="contained" startIcon={<HistoryIcon />} onClick={handleNavigateHistorico}>
          Histórico
        </Button>
      </div>
      <FilterWrapper>
        <FormControl fullWidth>
          <InputLabel>Filtrar por Día</InputLabel>
          <Select value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterWrapper>
      <FilterWrapper>
        <FormControl fullWidth>
          <InputLabel>Filtrar por Fecha</InputLabel>
          <Select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {monthDates.map((date, index) => (
              <MenuItem key={index} value={format(date, 'dd/MM/yyyy')}>
                {format(date, 'dd/MM/yyyy')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FilterWrapper>

      {filteredData.map((row, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {row.nombre} {row.apellidos}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">{row.documento}</Typography>
              </Grid>
              <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
                <FormControlLabel
                  control={<Checkbox checked={confirmation[index] || false} onClick={(event) => handleConfirmationChange(index, event)} />}
                  label="Asistió"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Edad:</strong> {row.edad}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Acudiente:</strong> {row.acudienteNombre}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Teléfono:</strong> {row.contacto}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Tipo de Tiquetera:</strong> {row.tiquetera}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Días por Tiquetera:</strong> {row.diasSeleccionados.length}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Día que Asistirá:</strong>
                </Typography>
                <TableContainerStyled component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCellStyled>Día</TableCellStyled>
                        <TableCellStyled>Fecha</TableCellStyled>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.diasSeleccionados.map((dia, diaIndex) => {
                        // Verificar que la fecha es válida
                        const date = new Date(dia.start);
                        const isValidDate = !isNaN(date.getTime());
                        console.log('Fecha original:', dia.start, 'Fecha convertida:', date, 'Es válida:', isValidDate);
                        const dayOfWeek = isValidDate ? date.toLocaleDateString('es-ES', { weekday: 'long' }) : 'Fecha no válida';
                        const formattedDate = isValidDate ? format(date, 'dd/MM/yyyy', { locale: es }) : 'Fecha no válida';
                        return (
                          <TableRow key={diaIndex}>
                            <TableCellStyled>{dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)}</TableCellStyled>
                            <TableCellStyled>{formattedDate}</TableCellStyled>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainerStyled>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Fecha de Ingreso:</strong> {format(new Date(row.fechaIngreso), 'dd/MM/yyyy')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Fecha de Terminación:</strong> {format(new Date(row.fechaTerminacion), 'dd/MM/yyyy')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Valor Pagado:</strong> {row.valorPagado}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Total Pagado:</strong> {row.totalPagado}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Total de Días Usados:</strong> {row.totalDiasUsados}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Vencimiento:</strong> {format(new Date(row.fechaVencimiento), 'dd/MM/yyyy')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  <strong>Días Restantes:</strong> {row.diasRestantes}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Observaciones:</strong> {row.observaciones}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <strong>Estado:</strong> {row.estado}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <AttendanceWrapper>
                  <FormControl component="fieldset">
                    <RadioGroup row value={attendance[index] || ''} onChange={(e) => handleAttendanceChange(index, e.target.value)}>
                      <FormControlLabel value="noAsistioSinExcusa" control={<Radio />} label="No asistió, sin excusa" />
                      <FormControlLabel value="noAsistioConExcusa" control={<Radio />} label="No asistió, con excusa" />
                    </RadioGroup>
                  </FormControl>
                  {attendance[index] === 'noAsistioSinExcusa' && (
                    <TextField label="Motivo" value={reason} onChange={(e) => setReason(e.target.value)} fullWidth margin="normal" />
                  )}
                  {attendance[index] === 'noAsistioConExcusa' && (
                    <>
                      <TextField label="Comentario de la Excusa" value={excuse} onChange={handleExcuseChange} fullWidth margin="normal" />
                      <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
                        Subir Archivo
                        <input type="file" hidden onChange={handleFileUpload} />
                      </Button>
                      {selectedFile && (
                        <Typography variant="body2" margin="normal">
                          Archivo: {selectedFile.name}
                        </Typography>
                      )}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Reprogramar Fecha"
                          inputFormat="MM/DD/YYYY"
                          value={rescheduleDate}
                          onChange={setRescheduleDate}
                          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                        />
                      </LocalizationProvider>
                      <Button variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
                        Reprogramar
                      </Button>
                    </>
                  )}
                </AttendanceWrapper>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Administrativo;
