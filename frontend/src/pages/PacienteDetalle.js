import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Grid, Paper, Typography, Button, IconButton, Modal, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import { FaEye, FaFilePdf } from 'react-icons/fa';
import theme from '../theme';
import Contrato1 from '../components/Contrato1';
import Contrato2 from '../components/Contrato2';

const PacienteDetalle = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagenPerfil, setImagenPerfil] = useState(null); // Para manejar la imagen del perfil
  const [showContrato1, setShowContrato1] = useState(false);
  const [showContrato2, setShowContrato2] = useState(false);
  const contratoRef = useRef();
  const contratoTransporteRef = useRef();

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pacientes/${id}`);
        setPaciente(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImagenPerfil(e.target.files[0]);
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'diasSeleccionados' || key === 'medicamentos') {
        formDataToSend.append(key, JSON.stringify(formData[key])); // Serializar los arrays
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    if (imagenPerfil) {
      formDataToSend.append('imagenPerfil', imagenPerfil);
    }

    try {
      await axios.put(`http://localhost:5000/api/pacientes/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Paciente actualizado con éxito');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar el paciente');
    }
  };

  const handleClose = () => {
    setShowContrato1(false);
    setShowContrato2(false);
  };

  if (!paciente) return <Typography>Cargando...</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Detalles del Paciente
          </Typography>
          {paciente.imagenPerfil && (
            <Avatar
              alt={paciente.nombre}
              src={`http://localhost:5000/uploads/${paciente.imagenPerfil}`}
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
          )}
          <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
          {isEditing && (
            <Button variant="contained" color="secondary" onClick={handleSave}>
              Guardar
            </Button>
          )}
          <IconButton color="primary" onClick={() => setShowContrato1(true)}>
            VER CONTRATO CENTRO DE DÍA <FaEye />
          </IconButton>
          <IconButton color="primary" onClick={() => setShowContrato2(true)}>
            VER CONTRATO DE TRANSPORTE <FaEye />
          </IconButton>

          {isEditing && (
            <input type="file" accept="image/*" onChange={handleFileChange} />
          )}

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Información Personal</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Apellidos"
                    name="apellidos"
                    value={formData.apellidos || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Nacimiento"
                    name="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento ? formData.fechaNacimiento.substring(0, 10) : ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Lugar de Nacimiento"
                    name="lugarNacimiento"
                    value={formData.lugarNacimiento || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Documento (ID)"
                    name="documento"
                    value={formData.documento || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="RH"
                    name="rh"
                    value={formData.rh || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nivel Educativo"
                    name="nivelEducativo"
                    value={formData.nivelEducativo || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Información de la Tiquetera</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Tiquetera"
                    name="tiquetera"
                    value={formData.tiquetera || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Estado de Tiquetera"
                    name="estadoTiquetera"
                    value={formData.estadoTiquetera || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Ingreso"
                    name="fechaIngreso"
                    type="date"
                    value={formData.fechaIngreso ? formData.fechaIngreso.substring(0, 10) : ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Vencimiento"
                    name="fechaVencimiento"
                    type="date"
                    value={formData.fechaVencimiento ? formData.fechaVencimiento.substring(0, 10) : ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Contacto</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Contacto"
                    name="contacto"
                    value={formData.contacto || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Teléfono 2"
                    name="telefono2"
                    value={formData.telefono2 || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="direccion"
                    value={formData.direccion || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Barrio"
                    name="barrio"
                    value={formData.barrio || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Apartamento / Interior"
                    name="apartamentoInterior"
                    value={formData.apartamentoInterior || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Información Clínica</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Diagnóstico"
                    name="diagnostico"
                    value={formData.diagnostico || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Estado Civil"
                    name="estadoCivil"
                    value={formData.estadoCivil || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="EPS o Sisbén"
                    name="epsSisen"
                    value={formData.epsSisen || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Servicio Emi"
                    name="servicioEmi"
                    value={formData.servicioEmi ? 'Sí' : 'No'}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  {formData.servicioEmi && (
                    <TextField
                      fullWidth
                      name="telefonoEmi"
                      label="Teléfono Emi"
                      value={formData.telefonoEmi || ''}
                      onChange={handleInputChange}
                      InputProps={{ readOnly: !isEditing }}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Atención Domiciliaria"
                    name="atencionDomiciliaria"
                    value={formData.atencionDomiciliaria ? 'Sí' : 'No'}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                {/* Nueva Información Clínica */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Motivo de Consulta"
                    name="motivoConsulta"
                    value={formData.motivoConsulta || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Antecedentes de Atención Integral"
                    name="antecedentesAtencionIntegral"
                    value={formData.antecedentesAtencionIntegral || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Antecedentes Médicos Relevantes"
                    name="antecedentesMedicos"
                    value={formData.antecedentesMedicos || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Diagnóstico Médico y/o Psicológico"
                    name="diagnosticoMedicoPsicologico"
                    value={formData.diagnosticoMedicoPsicologico || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Antecedentes Familiares Significativos"
                    name="antecedentesFamiliares"
                    value={formData.antecedentesFamiliares || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Antecedentes de Tratamiento o Psicológica"
                    name="antecedentesTratamiento"
                    value={formData.antecedentesTratamiento || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Área de Comportamiento"
                    name="areaComportamiento"
                    value={formData.areaComportamiento || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Acudiente</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Acudiente"
                    name="acudienteNombre"
                    value={formData.acudienteNombre || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Apellidos del Acudiente"
                    name="acudienteApellidos"
                    value={formData.acudienteApellidos || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Documento del Acudiente"
                    name="acudienteDocumento"
                    value={formData.acudienteDocumento || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Teléfono del Acudiente"
                    name="acudienteTelefono"
                    value={formData.acudienteTelefono || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Correo electrónico"
                    name="acudienteEmail"
                    value={formData.acudienteEmail || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Parentesco"
                    name="acudienteParentesco"
                    value={formData.acudienteParentesco || ''}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Paper>

        <Modal open={showContrato1} onClose={handleClose}>
          <Box sx={{ ...modalStyle }}>
            <Contrato1 ref={contratoRef} paciente={paciente} />
            <IconButton color="primary" onClick={() => contratoRef.current.generatePDF()}>
              <FaFilePdf />
            </IconButton>
          </Box>
        </Modal>

        <Modal open={showContrato2} onClose={handleClose}>
          <Box sx={{ ...modalStyle }}>
            <Contrato2 ref={contratoTransporteRef} paciente={paciente} />
            <IconButton color="primary" onClick={() => contratoTransporteRef.current.generatePDF()}>
              <FaFilePdf />
            </IconButton>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  maxHeight: '90%',
};

export default PacienteDetalle;
