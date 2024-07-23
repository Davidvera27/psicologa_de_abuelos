import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Tooltip
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#E0F7FA',
    },
  },
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(224, 247, 250, 0.9)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(224, 247, 250, 0.3)',
      transform: 'scale(1.02)',
    },
  },
}));

const formatDate = (dateString) => {
  return format(new Date(dateString), 'yyyy/MM/dd', { locale: es });
};

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

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Valor fijo para el número de elementos por página

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/pacientes');
        const pacientesWithAge = res.data.map(paciente => ({
          ...paciente,
          edad: calculateAge(paciente.fechaNacimiento)
        }));
        setPacientes(pacientesWithAge);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPacientes();
  }, []);

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const pacientesFiltrados = pacientes.filter(paciente =>
    paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.documento.includes(searchTerm)
  ).filter(paciente => filtro ? paciente.estadoTiquetera === filtro : true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pacientesFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setSelectedPaciente(null);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pacientes/${id}`);
      setPacientes(pacientes.filter((paciente) => paciente._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const updatedPaciente = await axios.put(`http://localhost:5000/api/pacientes/${selectedPaciente._id}`, values);
      setPacientes(pacientes.map((paciente) => (paciente._id === selectedPaciente._id ? updatedPaciente.data : paciente)));
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      nombre: selectedPaciente ? selectedPaciente.nombre : '',
      apellidos: selectedPaciente ? selectedPaciente.apellidos : '',
      fechaNacimiento: selectedPaciente ? formatDate(selectedPaciente.fechaNacimiento, 'yyyy-MM-dd') : '',
      lugarNacimiento: selectedPaciente ? selectedPaciente.lugarNacimiento : '',
      documento: selectedPaciente ? selectedPaciente.documento : '',
      rh: selectedPaciente ? selectedPaciente.rh : '',
      genero: selectedPaciente ? selectedPaciente.genero : '',
      nivelEducativo: selectedPaciente ? selectedPaciente.nivelEducativo : '',
      tiquetera: selectedPaciente ? selectedPaciente.tiquetera : '',
      estadoTiquetera: selectedPaciente ? selectedPaciente.estadoTiquetera : '',
      fechaIngreso: selectedPaciente ? formatDate(selectedPaciente.fechaIngreso, 'yyyy-MM-dd') : '',
      fechaVencimiento: selectedPaciente ? formatDate(selectedPaciente.fechaVencimiento, 'yyyy-MM-dd') : '',
      contacto: selectedPaciente ? selectedPaciente.contacto : '',
      telefono2: selectedPaciente ? selectedPaciente.telefono2 : '',
      direccion: selectedPaciente ? selectedPaciente.direccion : '',
      barrio: selectedPaciente ? selectedPaciente.barrio : '',
      apartamentoInterior: selectedPaciente ? selectedPaciente.apartamentoInterior : '',
      diagnostico: selectedPaciente ? selectedPaciente.diagnostico : '',
      estadoCivil: selectedPaciente ? selectedPaciente.estadoCivil : '',
      epsSisen: selectedPaciente ? selectedPaciente.epsSisen : '',
      acudienteNombre: selectedPaciente ? selectedPaciente.acudienteNombre : '',
      acudienteApellidos: selectedPaciente ? selectedPaciente.acudienteApellidos : '',
      acudienteDocumento: selectedPaciente ? selectedPaciente.acudienteDocumento : '',
      acudienteTelefono: selectedPaciente ? selectedPaciente.acudienteTelefono : '',
      acudienteEmail: selectedPaciente ? selectedPaciente.acudienteEmail : '',
      acudienteApartamentoInterior: selectedPaciente ? selectedPaciente.acudienteApartamentoInterior : '',
      acudienteTrabajoDireccion: selectedPaciente ? selectedPaciente.acudienteTrabajoDireccion : '',
      acudienteOficina: selectedPaciente ? selectedPaciente.acudienteOficina : '',
      acudienteParentesco: selectedPaciente ? selectedPaciente.acudienteParentesco : '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required('Requerido'),
      apellidos: Yup.string().required('Requerido'),
      fechaNacimiento: Yup.date().required('Requerido'),
      lugarNacimiento: Yup.string().required('Requerido'),
      documento: Yup.string().required('Requerido'),
      rh: Yup.string().required('Requerido'),
      genero: Yup.string().required('Requerido'),
      nivelEducativo: Yup.string().required('Requerido'),
      tiquetera: Yup.string().required('Requerido'),
      estadoTiquetera: Yup.string().required('Requerido'),
      fechaIngreso: Yup.date().required('Requerido'),
      fechaVencimiento: Yup.date().required('Requerido'),
      contacto: Yup.string().required('Requerido'),
      telefono2: Yup.string(),
      direccion: Yup.string().required('Requerido'),
      barrio: Yup.string(),
      apartamentoInterior: Yup.string(),
      diagnostico: Yup.string().required('Requerido'),
      estadoCivil: Yup.string().required('Requerido'),
      epsSisen: Yup.string().required('Requerido'),
      acudienteNombre: Yup.string(),
      acudienteApellidos: Yup.string(),
      acudienteDocumento: Yup.string(),
      acudienteTelefono: Yup.string(),
      acudienteEmail: Yup.string(),
      acudienteApartamentoInterior: Yup.string(),
      acudienteTrabajoDireccion: Yup.string(),
      acudienteOficina: Yup.string(),
      acudienteParentesco: Yup.string(),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <h1>Lista de Pacientes</h1>
        <TextField
          label="Buscar"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControl fullWidth>
          <InputLabel id="filtro-label">Estado de Tiquetera</InputLabel>
          <Select
            labelId="filtro-label"
            value={filtro}
            onChange={handleFiltroChange}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Activo">Activo</MenuItem>
            <MenuItem value="Inactivo">Inactivo</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Documento (ID)</TableCell>
                <TableCell>RH</TableCell>
                <TableCell>Genero</TableCell>
                <TableCell>Tiquetera</TableCell>
                <TableCell>Estado de Tiquetera</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((paciente, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TableCell>
                    <Avatar src={paciente.imagenUrl} alt={paciente.nombre} />
                  </TableCell>
                  <TableCell>{paciente.nombre}</TableCell>
                  <TableCell>{paciente.apellidos}</TableCell>
                  <TableCell>{paciente.edad}</TableCell>
                  <TableCell>{paciente.documento}</TableCell>
                  <TableCell>{paciente.rh}</TableCell>
                  <TableCell>{paciente.genero}</TableCell>
                  <TableCell>{paciente.tiquetera}</TableCell>
                  <TableCell>{paciente.estadoTiquetera}</TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/paciente/${paciente._id}`} onClick={() => setSelectedPaciente(paciente)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(paciente._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={pacientesFiltrados.length}
          paginate={paginate}
        />
        {selectedPaciente && (
          <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
              Detalles del Paciente
              <IconButton onClick={handleEditToggle} color="primary">
                <EditIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box component="form" sx={{ flexGrow: 1 }} onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <h2>Información Personal</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Nombre del paciente">
                      <StyledTextField
                        fullWidth
                        label="Nombre"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                        helperText={formik.touched.nombre && formik.errors.nombre}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Apellidos del paciente">
                      <StyledTextField
                        fullWidth
                        label="Apellidos"
                        name="apellidos"
                        value={formik.values.apellidos}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                        helperText={formik.touched.apellidos && formik.errors.apellidos}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Fecha de nacimiento del paciente">
                      <StyledTextField
                        fullWidth
                        label="Fecha de Nacimiento"
                        name="fechaNacimiento"
                        type="date"
                        value={formik.values.fechaNacimiento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                        helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
                        InputProps={{ readOnly: !isEditing }}
                        InputLabelProps={{ shrink: true }} // Asegúrate de que la etiqueta no se superponga al valor del input
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Lugar de nacimiento del paciente">
                      <StyledTextField
                        fullWidth
                        label="Lugar de Nacimiento"
                        name="lugarNacimiento"
                        value={formik.values.lugarNacimiento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lugarNacimiento && Boolean(formik.errors.lugarNacimiento)}
                        helperText={formik.touched.lugarNacimiento && formik.errors.lugarNacimiento}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Documento de identificación del paciente">
                      <StyledTextField
                        fullWidth
                        label="Documento (ID)"
                        name="documento"
                        value={formik.values.documento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.documento && Boolean(formik.errors.documento)}
                        helperText={formik.touched.documento && formik.errors.documento}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Tipo de sangre del paciente">
                      <StyledTextField
                        fullWidth
                        label="RH"
                        name="rh"
                        value={formik.values.rh}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.rh && Boolean(formik.errors.rh)}
                        helperText={formik.touched.rh && formik.errors.rh}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Genero">
                      <StyledTextField
                        fullWidth
                        label="Genero"
                        name="genero"
                        value={formik.values.genero}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.genero && Boolean(formik.errors.genero)}
                        helperText={formik.touched.genero && formik.errors.genero}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Nivel educativo del paciente">
                      <StyledTextField
                        fullWidth
                        label="Nivel Educativo"
                        name="nivelEducativo"
                        value={formik.values.nivelEducativo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.nivelEducativo && Boolean(formik.errors.nivelEducativo)}
                        helperText={formik.touched.nivelEducativo && formik.errors.nivelEducativo}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <h2>Información de la Tiquetera</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Tipo de tiquetera del paciente">
                      <StyledTextField
                        fullWidth
                        label="Tiquetera"
                        name="tiquetera"
                        value={formik.values.tiquetera}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.tiquetera && Boolean(formik.errors.tiquetera)}
                        helperText={formik.touched.tiquetera && formik.errors.tiquetera}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Estado de la tiquetera del paciente">
                      <StyledTextField
                        fullWidth
                        label="Estado de Tiquetera"
                        name="estadoTiquetera"
                        value={formik.values.estadoTiquetera}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.estadoTiquetera && Boolean(formik.errors.estadoTiquetera)}
                        helperText={formik.touched.estadoTiquetera && formik.errors.estadoTiquetera}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Fecha de ingreso del paciente">
                      <StyledTextField
                        fullWidth
                        label="Fecha de Ingreso"
                        name="fechaIngreso"
                        type="date"
                        value={formik.values.fechaIngreso}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fechaIngreso && Boolean(formik.errors.fechaIngreso)}
                        helperText={formik.touched.fechaIngreso && formik.errors.fechaIngreso}
                        InputProps={{ readOnly: !isEditing }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Fecha de vencimiento de la tiquetera">
                      <StyledTextField
                        fullWidth
                        label="Fecha de Vencimiento"
                        name="fechaVencimiento"
                        type="date"
                        value={formik.values.fechaVencimiento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fechaVencimiento && Boolean(formik.errors.fechaVencimiento)}
                        helperText={formik.touched.fechaVencimiento && formik.errors.fechaVencimiento}
                        InputProps={{ readOnly: !isEditing }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <h2>Contacto</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Teléfono de contacto del paciente">
                      <StyledTextField
                        fullWidth
                        label="Contacto"
                        name="contacto"
                        value={formik.values.contacto}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contacto && Boolean(formik.errors.contacto)}
                        helperText={formik.touched.contacto && formik.errors.contacto}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Segundo teléfono de contacto del paciente">
                      <StyledTextField
                        fullWidth
                        label="Teléfono 2"
                        name="telefono2"
                        value={formik.values.telefono2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.telefono2 && Boolean(formik.errors.telefono2)}
                        helperText={formik.touched.telefono2 && formik.errors.telefono2}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Dirección del paciente">
                      <StyledTextField
                        fullWidth
                        label="Dirección"
                        name="direccion"
                        value={formik.values.direccion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                        helperText={formik.touched.direccion && formik.errors.direccion}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Barrio del paciente">
                      <StyledTextField
                        fullWidth
                        label="Barrio"
                        name="barrio"
                        value={formik.values.barrio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.barrio && Boolean(formik.errors.barrio)}
                        helperText={formik.touched.barrio && formik.errors.barrio}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Apartamento o interior del paciente">
                      <StyledTextField
                        fullWidth
                        label="Apartamento / Interior"
                        name="apartamentoInterior"
                        value={formik.values.apartamentoInterior}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.apartamentoInterior && Boolean(formik.errors.apartamentoInterior)}
                        helperText={formik.touched.apartamentoInterior && formik.errors.apartamentoInterior}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <h2>Información Clínica</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Diagnóstico del paciente">
                      <StyledTextField
                        fullWidth
                        label="Diagnóstico"
                        name="diagnostico"
                        value={formik.values.diagnostico}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.diagnostico && Boolean(formik.errors.diagnostico)}
                        helperText={formik.touched.diagnostico && formik.errors.diagnostico}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Estado civil del paciente">
                      <StyledTextField
                        fullWidth
                        label="Estado Civil"
                        name="estadoCivil"
                        value={formik.values.estadoCivil}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.estadoCivil && Boolean(formik.errors.estadoCivil)}
                        helperText={formik.touched.estadoCivil && formik.errors.estadoCivil}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="EPS o Sisbén del paciente">
                      <StyledTextField
                        fullWidth
                        label="EPS o Sisbén"
                        name="epsSisen"
                        value={formik.values.epsSisen}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.epsSisen && Boolean(formik.errors.epsSisen)}
                        helperText={formik.touched.epsSisen && formik.errors.epsSisen}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <h2>Acudiente</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Nombre del acudiente">
                      <StyledTextField
                        fullWidth
                        label="Nombre del Acudiente"
                        name="acudienteNombre"
                        value={formik.values.acudienteNombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteNombre && Boolean(formik.errors.acudienteNombre)}
                        helperText={formik.touched.acudienteNombre && formik.errors.acudienteNombre}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Apellidos del acudiente">
                      <StyledTextField
                        fullWidth
                        label="Apellidos del Acudiente"
                        name="acudienteApellidos"
                        value={formik.values.acudienteApellidos}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteApellidos && Boolean(formik.errors.acudienteApellidos)}
                        helperText={formik.touched.acudienteApellidos && formik.errors.acudienteApellidos}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Documento de identificación del acudiente">
                      <StyledTextField
                        fullWidth
                        label="Documento del Acudiente"
                        name="acudienteDocumento"
                        value={formik.values.acudienteDocumento}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteDocumento && Boolean(formik.errors.acudienteDocumento)}
                        helperText={formik.touched.acudienteDocumento && formik.errors.acudienteDocumento}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Teléfono de contacto del acudiente">
                      <StyledTextField
                        fullWidth
                        label="Teléfono del Acudiente"
                        name="acudienteTelefono"
                        value={formik.values.acudienteTelefono}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteTelefono && Boolean(formik.errors.acudienteTelefono)}
                        helperText={formik.touched.acudienteTelefono && formik.errors.acudienteTelefono}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Segundo teléfono de contacto del acudiente">
                      <StyledTextField
                        fullWidth
                        label="Teléfono 2 del Acudiente"
                        name="acudienteEmail"
                        value={formik.values.acudienteEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteEmail && Boolean(formik.errors.acudienteEmail)}
                        helperText={formik.touched.acudienteEmail && formik.errors.acudienteEmail}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Apartamento o interior del acudiente">
                      <StyledTextField
                        fullWidth
                        label="Apartamento / Interior"
                        name="acudienteApartamentoInterior"
                        value={formik.values.acudienteApartamentoInterior}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteApartamentoInterior && Boolean(formik.errors.acudienteApartamentoInterior)}
                        helperText={formik.touched.acudienteApartamentoInterior && formik.errors.acudienteApartamentoInterior}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Dirección del sitio de trabajo del acudiente">
                      <StyledTextField
                        fullWidth
                        label="Dirección del Sitio de Trabajo"
                        name="acudienteTrabajoDireccion"
                        value={formik.values.acudienteTrabajoDireccion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteTrabajoDireccion && Boolean(formik.errors.acudienteTrabajoDireccion)}
                        helperText={formik.touched.acudienteTrabajoDireccion && formik.errors.acudienteTrabajoDireccion}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Oficina o local de trabajo del acudiente">
                      <StyledTextField
                        fullWidth
                        label="Oficina / Local"
                        name="acudienteOficina"
                        value={formik.values.acudienteOficina}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteOficina && Boolean(formik.errors.acudienteOficina)}
                        helperText={formik.touched.acudienteOficina && formik.errors.acudienteOficina}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Parentesco con el paciente">
                      <StyledTextField
                        fullWidth
                        label="Parentesco"
                        name="acudienteParentesco"
                        value={formik.values.acudienteParentesco}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.acudienteParentesco && Boolean(formik.errors.acudienteParentesco)}
                        helperText={formik.touched.acudienteParentesco && formik.errors.acudienteParentesco}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              {isEditing ? (
                <>
                  <Button onClick={handleClose} color="primary">
                    Cancelar
                  </Button>
                  <Button type="submit" color="primary" variant="contained" onClick={formik.handleSubmit}>
                    Guardar
                  </Button>
                </>
              ) : (
                <Button onClick={handleClose} color="primary">
                  Cerrar
                </Button>
              )}
            </DialogActions>
          </StyledDialog>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Pacientes;
