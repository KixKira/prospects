import React from 'react';
import { Box, Typography } from '@mui/material';

function WelcomeMsg() {
  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', fontFamily: 'Montserrat' }}>
        Bienvenido a SISPROT
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ textAlign: 'left', fontFamily: 'Montserrat' }}>
        ¡Hola! Gracias por tu interés en nuestro internet de fibra óptica en Turmero.
      </Typography>

      <Typography variant="body1" sx={{ textAlign: 'left', fontFamily: 'Montserrat' }}>
        Este pre-registro nos ayudará a conocer tus necesidades y ofrecerte el plan ideal. Mantente atento a nuestras ofertas especiales.
      </Typography>
    </Box>
  );
}

export default WelcomeMsg;
