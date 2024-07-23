// src/components/Calendar.js
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Typography } from '@mui/material';

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

const CalendarComponent = ({ formData, handleSelectSlot, maxDias }) => {
  return (
    <>
      <Calendar
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectSlot}
        events={formData.diasSeleccionados}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month']}
        messages={{
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
        }}
      />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Días seleccionados: {formData.diasSeleccionados.length}/{maxDias}
      </Typography>
    </>
  );
};

export default CalendarComponent;
