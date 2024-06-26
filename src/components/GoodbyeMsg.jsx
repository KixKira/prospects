import React from 'react';
import { Box, Typography } from '@mui/material';

function GoodbyeMsg() {

  return (
    <Box sx={{ padding: 5 }}>
      <Typography variant='h5' component='h2' gutterBottom>
        Gracias por Pre-Registrarte en SISPROT
      </Typography>
      <Typography variant="body1" gutterBottom>
        ¡Gracias por preferirnos!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Esperamos darte la bienvenida pronto a nuestra red de fibra óptica. Juntos, transformaremos la forma en que te conectas con el mundo.
      </Typography>
      <Typography variant="body1">
        ¡Hasta pronto!
      </Typography>
    </Box>
  );
}

export default GoodbyeMsg;
