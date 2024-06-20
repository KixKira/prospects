import React from 'react';
import { Box, Typography } from '@mui/material';

function WelcomeMsg() {
  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Bienvenido a SISPROT
      </Typography>

      <Typography variant="body1" gutterBottom>
        ¡Hola! Gracias por tu interés en nuestro internet de fibra óptica en Turmero.
      </Typography>

      <Typography variant="body1">
        Este pre-registro nos ayudará a conocer tus necesidades y ofrecerte el plan ideal. Mantente atento a nuestras ofertas especiales.
      </Typography>
    </Box>
  );
}

export default WelcomeMsg;
