import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Container, Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Button, TextField, Radio, RadioGroup, FormControlLabel, Checkbox
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PacienteInfo from '../components/PacienteInfo';
import Tiqueteras from '../components/Tiqueteras';
import Contacto from '../components/Contacto';
import ClinicaInfo from '../components/ClinicaInfo';
import Acudiente from '../components/Acudiente';
import CalendarComponent from '../components/Calendar';
import MedicamentoDialog from '../components/MedicamentoDialog';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

const AddPaciente = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    edad: '',
    lugarNacimiento: '',
    documento: '',
    rh: '',
    genero: '',
    nivelEducativo: '',
    tiquetera: '',
    estadoTiquetera: '',
    fechaIngreso: '',
    fechaVencimiento: '',
    valorPagado: '',
    totalPagado: '',
    totalDiasUsados: 0,
    diasRestantes: 0,
    fechaTerminacion: '',
    contacto: '',
    telefono2: '',
    direccion: '',
    barrio: '',
    apartamentoInterior: '',
    diagnostico: '',
    estadoCivil: '',
    epsSisen: '',
    medicamentos: [],
    alimentacion: '',
    restricciones: '',
    acudienteNombre: '',
    acudienteApellidos: '',
    acudienteDocumento: '',
    acudienteTelefono: '',
    EmailAcudiente: '',
    acudienteParentesco: '',
    diasSeleccionados: [],
    servicioEmi: 'No',
    telefonoEmi: '',
    atencionDomiciliaria: 'No',
    servicioTransporte: 'No',
    observaciones: '',
    estado: 'Activo',
    motivoConsulta: '',
    antecedentesAtencionIntegral: '',
    antecedentesMedicos: '',
    diagnosticoMedicoPsicologico: '',
    antecedentesFamiliares: '',
    antecedentesTratamiento: '',
    areaComportamiento: ''
  });

  const [medicamentoDialogOpen, setMedicamentoDialogOpen] = useState(false);
  const [nuevoMedicamento, setNuevoMedicamento] = useState('');
  const [maxDias, setMaxDias] = useState(0);
  const [showVisitasDomiciliarias, setShowVisitasDomiciliarias] = useState(false);
  const [showTiqueteraIndividual, setShowTiqueteraIndividual] = useState(false);

  const handleMedicamentoDialogOpen = () => {
    setMedicamentoDialogOpen(true);
  };

  const handleMedicamentoDialogClose = () => {
    setMedicamentoDialogOpen(false);
  };

  const handleAddMedicamento = () => {
    setFormData({
      ...formData,
      medicamentos: [...formData.medicamentos, { name: nuevoMedicamento, checked: false }],
    });
    setNuevoMedicamento('');
    handleMedicamentoDialogClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'fechaNacimiento') {
      updatedFormData.edad = calculateAge(value);
    }

    if (name === 'fechaIngreso') {
      const fechaIngreso = new Date(value);
      const fechaVencimiento = new Date(fechaIngreso);
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);
      updatedFormData.fechaVencimiento = fechaVencimiento.toISOString().substring(0, 10);
      updatedFormData.fechaTerminacion = fechaVencimiento.toISOString().substring(0, 10);
    }

    if (name === 'tiquetera') {
      switch (value) {
        case 'T1':
          setMaxDias(4);
          break;
        case 'T2':
          setMaxDias(8);
          break;
        case 'T3':
          setMaxDias(12);
          break;
        case 'T4':
          setMaxDias(16);
          break;
        case 'T5':
          setMaxDias(20);
          break;
        default:
          setMaxDias(0);
          break;
      }
      updatedFormData.diasRestantes = maxDias;
    }

    setFormData(updatedFormData);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked ? 'Sí' : 'No',
    });
  };

  const handleVisitasDomiciliariasChange = (e) => {
    const { checked } = e.target;
    setShowVisitasDomiciliarias(checked);
    setShowTiqueteraIndividual(false);
  };

  const handleTiqueteraIndividualChange = (e) => {
    const { checked } = e.target;
    setShowTiqueteraIndividual(checked);
    setShowVisitasDomiciliarias(false);
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectSlot = ({ start, end }) => {
    if (!start || !end || isNaN(new Date(start)) || isNaN(new Date(end))) {
      console.error('Fechas no válidas:', { start, end });
      return;
    }

    if (formData.diasSeleccionados.length < maxDias) {
      setFormData({
        ...formData,
        diasSeleccionados: [...formData.diasSeleccionados, { start, end }]
      });
    } else {
      alert(`Solo puedes seleccionar un máximo de ${maxDias} días.`);
    }
  };

  const handleMedicamentoCheckChange = (index, checked) => {
    const updatedMedicamentos = [...formData.medicamentos];
    updatedMedicamentos[index].checked = checked;
    setFormData({
      ...formData,
      medicamentos: updatedMedicamentos,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ajustar la información del formulario
    let adjustedFormData = {
      ...formData,
      servicioEmi: formData.servicioEmi === 'Sí' ? 'Sí' : 'No',
      atencionDomiciliaria: formData.atencionDomiciliaria === 'Sí' ? 'Sí' : 'No',
      servicioTransporte: formData.servicioTransporte === 'Sí' ? 'Sí' : 'No',
      telefonoEmi: formData.servicioEmi === 'Sí' ? formData.telefonoEmi : 'N/A'
    };
  
    // Convertir las fechas al formato ISO
    if (adjustedFormData.fechaNacimiento) {
      adjustedFormData.fechaNacimiento = new Date(adjustedFormData.fechaNacimiento).toISOString();
    }
    if (adjustedFormData.fechaIngreso) {
      adjustedFormData.fechaIngreso = new Date(adjustedFormData.fechaIngreso).toISOString();
    }
    if (adjustedFormData.fechaVencimiento) {
      adjustedFormData.fechaVencimiento = new Date(adjustedFormData.fechaVencimiento).toISOString();
    }
    if (adjustedFormData.fechaTerminacion) {
      adjustedFormData.fechaTerminacion = new Date(adjustedFormData.fechaTerminacion).toISOString();
    }
  
    // Eliminar los campos vacíos o indefinidos
    Object.keys(adjustedFormData).forEach(key => {
      if (adjustedFormData[key] === '' || adjustedFormData[key] === undefined) {
        delete adjustedFormData[key];
      }
    });
  
    // Convertir `diasSeleccionados` a una cadena JSON
    adjustedFormData.diasSeleccionados = JSON.stringify(adjustedFormData.diasSeleccionados);
  
    console.log('Datos enviados:', adjustedFormData);
  
    try {
      const response = await axios.post('http://localhost:5000/api/pacientes', adjustedFormData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Respuesta del servidor:', response);
      alert('Paciente agregado exitosamente');
      setFormData({
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        edad: '',
        lugarNacimiento: '',
        documento: '',
        rh: '',
        genero: '',
        nivelEducativo: '',
        tiquetera: '',
        estadoTiquetera: '',
        fechaIngreso: '',
        fechaVencimiento: '',
        valorPagado: '',
        totalPagado: '',
        totalDiasUsados: 0,
        diasRestantes: 0,
        fechaTerminacion: '',
        contacto: '',
        telefono2: '',
        direccion: '',
        barrio: '',
        apartamentoInterior: '',
        diagnostico: '',
        estadoCivil: '',
        epsSisen: '',
        medicamentos: [],
        alimentacion: '',
        restricciones: '',
        acudienteNombre: '',
        acudienteApellidos: '',
        acudienteDocumento: '',
        acudienteTelefono: '',
        EmailAcudiente: '',
        acudienteParentesco: '',
        diasSeleccionados: [],
        servicioEmi: 'No',
        telefonoEmi: '',
        atencionDomiciliaria: 'No',
        servicioTransporte: 'No',
        observaciones: '',
        estado: 'Activo',
        motivoConsulta: '',
        antecedentesAtencionIntegral: '',
        antecedentesMedicos: '',
        diagnosticoMedicoPsicologico: '',
        antecedentesFamiliares: '',
        antecedentesTratamiento: '',
        areaComportamiento: ''
      });
    } catch (err) {
      console.error('Error al agregar paciente:', err);
      alert('Error al agregar paciente');
    }
  };
  

  const handleFechaIngresoChange = (e) => {
    const fechaIngreso = e.target.value;
    const fechaVencimiento = new Date(fechaIngreso);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + 1);

    setFormData({
      ...formData,
      fechaIngreso,
      fechaVencimiento: fechaVencimiento.toISOString().substring(0, 10),
      fechaTerminacion: fechaVencimiento.toISOString().substring(0, 10)
    });
  };

  const handleCentroDeDiaClick = () => {
    setShowVisitasDomiciliarias(false);
    setShowTiqueteraIndividual(false);
    setFormData({
      ...formData,
      visitasDomiciliarias: 'No',
      tiqueteraIndividual: 'No',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <h1>CREAR NUEVO PACIENTE</h1>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showVisitasDomiciliarias}
                      onChange={handleVisitasDomiciliariasChange}
                      name="visitasDomiciliarias"
                      color="primary"
                    />
                  }
                  label="Visitas Domiciliarias"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showTiqueteraIndividual}
                      onChange={handleTiqueteraIndividualChange}
                      name="tiqueteraIndividual"
                      color="primary"
                    />
                  }
                  label="Tiquetera Individual"
                />
              </Grid>
              <Grid item>
                <Button onClick={handleCentroDeDiaClick} variant="contained" color="secondary">
                  Centro de Día
                </Button>
              </Grid>
              {!showVisitasDomiciliarias && !showTiqueteraIndividual && (
                <>
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>INFORMACIÓN DEL PACIENTE</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <PacienteInfo formData={formData} handleChange={handleChange} calculateAge={calculateAge} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>TIQUETERAS</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Tiqueteras formData={formData} handleChange={handleChange} handleFechaIngresoChange={handleFechaIngresoChange} setFormData={setFormData} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  {formData.tiquetera && (
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>SELECCIONAR DÍAS</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <CalendarComponent formData={formData} handleSelectSlot={handleSelectSlot} maxDias={maxDias} />
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>CONTACTO</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Contacto formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>INFORMACIÓN CLÍNICA</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ClinicaInfo
                          formData={formData}
                          handleChange={handleChange}
                          handleCheckboxChange={handleCheckboxChange}
                          handleMedicamentoDialogOpen={handleMedicamentoDialogOpen}
                          handleMedicamentoDialogClose={handleMedicamentoDialogClose}
                          handleAddMedicamento={handleAddMedicamento}
                          medicamentoDialogOpen={medicamentoDialogOpen}
                          nuevoMedicamento={nuevoMedicamento}
                          setNuevoMedicamento={setNuevoMedicamento}
                          handleMedicamentoCheckChange={handleMedicamentoCheckChange}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>ACUDIENTE</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Acudiente formData={formData} handleChange={handleChange} />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </>
              )}
              {showVisitasDomiciliarias && (
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>VISITA DOMICILIARIA</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>Datos personales del paciente</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Nombre completo" name="nombre" value={formData.nombre} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Número de identificación" name="documento" value={formData.documento} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth type="date" label="Fecha de nacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Lugar de nacimiento" name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Edad" name="edad" value={formData.edad} onChange={handleChange} disabled />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>Datos personales de representante</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Nombre completo" name="acudienteNombre" value={formData.acudienteNombre} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Número de identificación" name="acudienteDocumento" value={formData.acudienteDocumento} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Parentesco" name="acudienteParentesco" value={formData.acudienteParentesco} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Contacto" name="acudienteTelefono" value={formData.acudienteTelefono} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Correo electrónico" name="EmailAcudiente" value={formData.EmailAcudiente} onChange={handleChange} />
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>Agendamiento visita domiciliaria</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Datos del representante" name="datosRepresentante" value={formData.datosRepresentante} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Datos del adulto mayor" name="datosAdultoMayor" value={formData.datosAdultoMayor} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth type="date" label="Fecha" name="fechaVisita" value={formData.fechaVisita} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth type="time" label="Hora" name="horaVisita" value={formData.horaVisita} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Dirección" name="direccionVisita" value={formData.direccionVisita} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Punto referencia" name="puntoReferencia" value={formData.puntoReferencia} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Teléfono de contacto" name="telefonoContactoVisita" value={formData.telefonoContactoVisita} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField fullWidth label="Profesional" name="profesionalVisita" value={formData.profesionalVisita} onChange={handleChange} />
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}
              {showTiqueteraIndividual && (
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>TIQUETERA INDIVIDUAL</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Nombre paciente" name="nombrePaciente" value={formData.nombrePaciente} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Cédula del usuario" name="cedulaUsuario" value={formData.cedulaUsuario} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Nombre acudiente" name="nombreAcudiente" value={formData.nombreAcudiente} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Cédula acudiente" name="cedulaAcudiente" value={formData.cedulaAcudiente} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label="Parentesco actual" name="parentescoActual" value={formData.parentescoActual} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>Pago día</Typography>
                          <RadioGroup
                            name="pagoDia"
                            value={formData.pagoDia}
                            onChange={handleRadioChange}
                          >
                            <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>Transporte</Typography>
                          <RadioGroup
                            name="transporte"
                            value={formData.transporte}
                            onChange={handleRadioChange}
                          >
                            <FormControlLabel value="Sí" control={<Radio />} label="Sí" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Crear Paciente
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <MedicamentoDialog
          medicamentoDialogOpen={medicamentoDialogOpen}
          handleMedicamentoDialogClose={handleMedicamentoDialogClose}
          nuevoMedicamento={nuevoMedicamento}
          setNuevoMedicamento={setNuevoMedicamento}
          handleAddMedicamento={handleAddMedicamento}
        />
      </Container>
    </ThemeProvider>
  );
};

export default AddPaciente;
