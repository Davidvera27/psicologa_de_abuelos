// src/components/PacienteForm.js
import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Button,
  Tooltip,
} from '@mui/material';
import { StyledDialog, StyledTextField } from '../theme/styledComponents';

const PacienteForm = ({
  formik,
  open,
  handleClose,
  isEditing,
  handleEditToggle,
}) => (
  <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
    <DialogTitle>
      Detalles del Paciente
      <Button onClick={handleEditToggle} color="primary">
        Editar
      </Button>
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
                InputLabelProps={{ shrink: true }}
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
                name="acudienteTelefono2"
                value={formik.values.acudienteTelefono2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.acudienteTelefono2 && Boolean(formik.errors.acudienteTelefono2)}
                helperText={formik.touched.acudienteTelefono2 && formik.errors.acudienteTelefono2}
                InputProps={{ readOnly: !isEditing }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title="Dirección de residencia del acudiente">
              <StyledTextField
                fullWidth
                label="Dirección de Residencia del Acudiente"
                name="acudienteDireccion"
                value={formik.values.acudienteDireccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.acudienteDireccion && Boolean(formik.errors.acudienteDireccion)}
                helperText={formik.touched.acudienteDireccion && formik.errors.acudienteDireccion}
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
);

export default PacienteForm;
