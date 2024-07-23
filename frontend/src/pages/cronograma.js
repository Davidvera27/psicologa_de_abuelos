import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const Cronograma = () => {
  const [cronograma, setCronograma] = useState([]);
  const [view, setView] = useState(Views.MONTH);

  useEffect(() => {
    const fetchCronograma = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/pacientes');
        setCronograma(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCronograma();
  }, []);

  const events = cronograma.flatMap((paciente) =>
    paciente.diasSeleccionados.map((dia, index) => ({
      id: paciente._id,
      diaId: dia._id,
      title: `${index + 1}. ${paciente.nombre} ${paciente.apellidos}`,
      start: new Date(dia.start),
      end: new Date(dia.end),
      allDay: true,
    }))
  );

  const onEventDrop = async ({ event, start, end }) => {
    try {
      await axios.put(`http://localhost:5000/api/pacientes/${event.id}/dias/${event.diaId}`, {
        start,
        end,
      });
      setCronograma((prevCronograma) =>
        prevCronograma.map((paciente) =>
          paciente._id === event.id
            ? {
                ...paciente,
                diasSeleccionados: paciente.diasSeleccionados.map((dia) =>
                  dia._id === event.diaId
                    ? { ...dia, start, end }
                    : dia
                ),
              }
            : paciente
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = isSelected ? '#3f51b5' : '#f50057';
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <ThemeProvider theme={theme}>    
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            Cronograma de Actividades
          </Typography>
          <DragAndDropCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={['month', 'week']}
            view={view}
            onView={(newView) => setView(newView)}
            onEventDrop={onEventDrop}
            resizable
            onEventResize={onEventDrop}
            draggableAccessor={() => true}
            eventPropGetter={eventStyleGetter}
            messages={{
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
              today: 'Hoy',
              previous: 'Anterior',
              next: 'Siguiente',
            }}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Cronograma;
