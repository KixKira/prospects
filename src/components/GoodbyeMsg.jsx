import React from 'react';
import { 
  Box, 
  Typography 
} from '@mui/material';

function GoodbyeMsg() {

  return (
    <Box 
      sx={{ 
        padding: 5 
      }}
    >
      <Typography 
        variant='h5' 
        component='h2' 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          fontFamily: 'Montserrat' 
        }}
      >
        Gracias por Pre-Registrarte en SISPROT
      </Typography>
      <Typography 
        variant="body1" 
        gutterBottom 
        sx={{ 
          textAlign: 'left', 
          fontFamily: 'Montserrat' 
          
        }}
      >
        ¡Gracias por preferirnos!
      </Typography>
      <Typography 
        variant="body1" 
        gutterBottom 
        sx={{ 
          textAlign: 'left', 
          fontFamily: 'Montserrat' 
          
        }}
      >
        Esperamos darte la bienvenida pronto a nuestra red de fibra óptica. Juntos, transformaremos la forma en que te conectas con el mundo.
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: 'left', 
          fontFamily: 'Montserrat' 
          
        }}
      >
        ¡Hasta pronto!
      </Typography>
    </Box>
  );
}

export default GoodbyeMsg;
