import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import WelcomeMsg from '../components/WelcomeMsg';
import PersonalInfo from '../components/PersonalInfo';
import LocationForm from '../components/LocationForm';
import PlansSelector from '../components/PlansSelector';
import MapLocation from '../components/MapLocation';
import Collections from '../components/Collections';
import GoodbyeMsg from '../components/GoodbyeMsg';

import { enviarDatos } from '../features/preRegistro/preRegistroSlice';

function FormularioPreRegistro() {
  const dispatch = useDispatch()
  const [pasoActual, setPasoActual] = useState(0);
  const ultimoPaso = 6
  
  const handleSiguiente = () => {
    setPasoActual(pasoActual + 1);
  };
  
  const handleAnterior = () => {
    setPasoActual(pasoActual - 1);
  };

  const handleEnviar = () => {
    dispatch(enviarDatos(datosFormulario))
  }
  
  const datosFormulario = useSelector(state => state.preRegistro)

  const steps = ['Bienvenida', 'Información Personal', 'Información Residencial', 'Selección de Plan', 'Ubicación en Mapa', 'Colecciones', 'Despedida'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }} >
        <Grid item xs={12} sm={6} md={4} sx={{ backgroundColor: '#004E74' }} >
          Imagen
        </Grid>
        <Grid item xs={12} sm={6} md={8} sx={{ padding: 2, backgroundColor: '#E4EAF0' }}>
          <Typography variant='subtitle1' gutterBottom align='center' sx={{ fontWeight: 500, paddingTop: 12 }}>LLEGAMOS A TU ZONA</Typography>
          <Typography variant='h3' gutterBottom align='center' sx={{ marginBottom: 5, fontWeight: 800 }}>SOLICITA TU FACTIBILIDAD</Typography>
          <Grid container direction='column' justifyItems='space-between' spacing={2}>
            <Stepper activeStep={pasoActual} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel></StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ borderRadius: 10, backgroundColor: '#FFF', padding: 2, marginY: 5, mx: { xs: 2, sm: 4, md: 2, lg: 8 }}}>
              {pasoActual === 0 && <WelcomeMsg />}
              {pasoActual === 1 && <PersonalInfo />}
              {pasoActual === 2 && <LocationForm />}
              {pasoActual === 3 && <PlansSelector />}
              {pasoActual === 4 && <MapLocation />}
              {pasoActual === 5 && <Collections />}
              {pasoActual === 6 && <GoodbyeMsg />}
            </Box>
          </Grid>
          <Grid item xs={12}>
          </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'start', marginX: 9, gap: 2 }}>
              <Button variant='outlined' onClick={handleAnterior} disabled={pasoActual === 0}>
                Anterior
              </Button>
              {pasoActual === ultimoPaso - 1 ? (
                <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleEnviar}>Enviar</Button>
              ) : (
                <Button variant="contained" onClick={handleSiguiente} disabled={pasoActual === ultimoPaso}>
                  Siguiente
                </Button>
              )}
            </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormularioPreRegistro;
