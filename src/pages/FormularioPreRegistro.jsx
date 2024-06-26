import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Box, Button, Grid, Snackbar, Step, StepLabel, Stepper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import WelcomeMsg from '../components/WelcomeMsg';
import PersonalInfo from '../components/PersonalInfo';
import LocationForm from '../components/LocationForm';
import PlansSelector from '../components/PlansSelector';
import MapLocation from '../components/MapLocation';
import Collections from '../components/Collections';
import GoodbyeMsg from '../components/GoodbyeMsg';
import Logo from '../assets/SGF-Blanco-Aislado.png'

import { enviarDatos, enviarDatosPyme } from '../features/preRegistro/preRegistroSlice';

import { personalInfoSchema, personalInfoPymeSchema, locationFormPymeSchema, locationFormSchema, plansSelectorSchema,plansSelectorPymeSchema } from '../components/schemas'

import { z } from "zod";

function FormularioPreRegistro() {
  const dispatch = useDispatch()
  const [pasoActual, setPasoActual] = useState(0);
  const isPyme = useSelector((state) => state.preRegistro.isPyme)
  const ultimoPaso = 6
  const [errors, setErrors] = useState({})

  const [openSnackbar, setOpenSnackbar] = useState(false)
  
  const handleSiguiente = () => {
    if (validateForm()) {
      setPasoActual(pasoActual + 1);
    } else {
      console.log('Errores de validacion:', errors);
    }
  };
  
  const handleAnterior = () => {
    setPasoActual(pasoActual - 1);
  };

  const handleEnviar = async () => {
    if (validateForm()) {
      if (isPyme) {
        await dispatch(enviarDatosPyme(datosFormulario))
      } else {
        await dispatch(enviarDatos(datosFormulario))
      }
      setOpenSnackbar(true)
      setPasoActual(ultimoPaso)
    }
  }

  const validateForm = () => {
    if (pasoActual === 0) {
      return true
    } 

    if (pasoActual === 3) { 
      if (!datosFormulario.plan) {
        setErrors({ plan: 'Debe seleccionar un plan' });
        return false;
      }
    }

    try {      
      const schema = isPyme 
        ? (pasoActual === 1 ? personalInfoPymeSchema : pasoActual === 2 ? locationFormPymeSchema : plansSelectorPymeSchema)
        : (pasoActual === 1 ? personalInfoSchema : pasoActual === 2 ? locationFormSchema : plansSelectorSchema)

      schema.parse(datosFormulario)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {}
        error.issues.forEach((issue) => {
          newErrors[issue.path[0]] = issue.message
        })
        setErrors(newErrors)
      } else {
        console.error('Error de validación inesperado:', error)
      }
      return false
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }
  
  const datosFormulario = useSelector(state => state.preRegistro)

  const steps = ['Bienvenida', 'Información Personal', 'Información Residencial', 'Selección de Plan', 'Ubicación en Mapa', 'Colecciones', 'Despedida'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }} >
        <Grid item xs={12} sm={6} md={4} sx={{ backgroundColor: '#004E74', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
          <img src={Logo} alt='Logo' style={{ maxWidth: '80%' }} />
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
              {pasoActual === 1 && <PersonalInfo errors={errors} />}
              {pasoActual === 2 && <LocationForm errors={errors} />}
              {pasoActual === 3 && <PlansSelector errors={errors} />}
              {pasoActual === 4 && <MapLocation />}
              {pasoActual === 5 && <Collections />}
              {pasoActual === 6 && <GoodbyeMsg />}
            </Box>
          </Grid>
          <Grid item xs={12}>
          </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'start', marginX: 9, gap: 2 }}>
              {pasoActual !== ultimoPaso && (
                <Button variant='outlined' onClick={handleAnterior} disabled={pasoActual === 0}>
                  Anterior
                </Button>
              )}
              {pasoActual === ultimoPaso - 1 ? (
                <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={handleEnviar}>
                  Enviar
                </Button>
              ) : pasoActual === ultimoPaso ? (
                ''
              ) : (
                <Button variant="contained" onClick={handleSiguiente} disabled={pasoActual === ultimoPaso}>
                  Siguiente
                </Button>
              )}
            </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
      >
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          ¡Tus datos han sido enviados exitosamente!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FormularioPreRegistro;
