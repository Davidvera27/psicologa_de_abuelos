// src/theme/styledComponents.js
import { styled } from '@mui/material/styles';
import { Dialog, TextField } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(224, 247, 250, 0.9)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(224, 247, 250, 0.3)',
      transform: 'scale(1.02)',
    },
  },
}));
