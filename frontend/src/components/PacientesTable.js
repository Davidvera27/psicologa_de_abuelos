// src/components/PacientesTable.js
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

const PacientesTable = ({ pacientes, handleDelete, setSelectedPaciente }) => (
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
          <TableCell>Tiquetera</TableCell>
          <TableCell>Estado de Tiquetera</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pacientes.map((paciente, index) => (
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
);

export default PacientesTable;
