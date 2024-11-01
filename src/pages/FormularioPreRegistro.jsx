import React, { useState } from 'react';
import supabase from '../supabase/config';
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

import { enviarDatos, enviarDatosAOzmap, enviarDatosPyme } from '../features/preRegistro/preRegistroSlice';

import { personalInfoSchema, personalInfoPymeSchema, locationFormPymeSchema, locationFormSchema, plansSelectorSchema,plansSelectorPymeSchema } from '../components/schemas'

import { z } from "zod";
import axios from 'axios';
import { version } from '../config';

function FormularioPreRegistro() {
  const [errors, setErrors] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [pasoActual, setPasoActual] = useState(0);
  const [enviando, setEnviando] = useState(false)

  const isPyme = useSelector((state) => state.preRegistro.isPyme)
  const loading = useSelector(state => state.preRegistro.loading)

  const ultimoPaso = 6
  
  const dispatch = useDispatch()
  
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
      setEnviando(true)

      try {
        if (isPyme) {
          await dispatch(enviarDatosPyme(datosFormulario))
        } else {
          await dispatch(enviarDatos(datosFormulario))
        }
  
        await dispatch(enviarDatosAOzmap(datosFormulario))

        const { data: plans } = await supabase
        .from('plans')
        .select('*')
        .eq('id_plan', datosFormulario.plan);
  
        const { data: vendors } = await supabase
        .from('vendors')
        .select('*')
        .eq('id_vendor', datosFormulario.vendor);
  
        const { data: municipalities } = await supabase
        .from('municipalities')
        .select('*')
        .eq('id_municipality', datosFormulario.municipality);
  
        const { data: parishes } = await supabase
        .from('parishes')
        .select('*')
        .eq('id_parish', datosFormulario.parish);
  
        const { data: neighborhoods } = await supabase
        .from('neighborhoods')
        .select('*')
        .eq('id_neighborhood', datosFormulario.neighborhood);

        try {
          const msgProspect = await axios.post('https://api.ultramsg.com/instance87810/messages/chat', {
            token: 'rzqp54nn0tucqspv', 
            to: datosFormulario.phone, 
            body: '¡Gracias por tu interés en *Sisprot Global Fiber*!' +
            '\n\n' +
            'Estimado(a) ' + datosFormulario.name + ' ' + datosFormulario.last_name +
            '\n\n' +
            'Recibimos con entusiasmo tu solicitud de información sobre nuestros planes de internet de fibra óptica. Nos alegra saber que estás interesado(a) en el plan ' + plans[0].name_plan + ' ' + plans[0].size + '.' +
            '\n\n' + 
            'Un asesor se pondrá en contacto contigo en breve para confirmar tu disponibilidad, validar la cobertura en tu zona y ayudarte a seleccionar el plan que mejor se adapte a tus necesidades.' +
            '\n\n' +
            'Mientras tanto, puedes consultar nuestra página web para obtener más información sobre nuestros planes y servicios: https://www.sisprotgf.com/' +
            '\n\n' +
            'También puedes seguirnos en nuestras redes sociales:' +
            '\n\n' + 
            'Linktr.ee: https://linktr.ee/sisprotgf' + 
            '\n\n' + 
            'Agradecemos tu interés en Sisprot Global Fiber. Estamos seguros de que podemos ofrecerte la mejor conexión a internet para tu hogar o negocio.' +
            '\n\n' +
            '¡Te atenderemos pronto!' +
            '\n\n' +
            'Atentamente,' +
            '\n\n' +
            '*El equipo de Sisprot Global Fiber*'
          });

          console.log('Repuesta de Ultramsg (msgProspect):', msgProspect.data);
        } catch (error) {
          console.error('Error al enviar mensaje msgProspect:', error)
        }

        try {
          const msgVendor = await axios.post('https://api.ultramsg.com/instance87810/messages/chat', {
            token: 'rzqp54nn0tucqspv',
            to: vendors[0].phone, 
            body: '*Asunto: Nuevo Prospecto Asignado* - ' + datosFormulario.name + ' ' + datosFormulario.last_name +
            '\n\n' +
            '*Estimado(a)* ' + vendors[0].name_vendor + ',' +
            '\n\n' +
            'Nos complace informarte que se te ha asignado un nuevo prospecto de cliente a continuación te adjuntamos sus datos.' +
            '\n\n' +
            '*Información del Prospecto:*' +
            '\n\n' +
            '- *Nombre:* ' + datosFormulario.name + ' ' + datosFormulario.last_name +
            '\n' +
            '- *Teléfono:* ' + datosFormulario.phone + 
            '\n' +
            '- *Correo Electrónico:* ' + datosFormulario.email +
            '\n' +
            '- *Dirección:* ' + municipalities[0].name_municipality + ', ' + parishes[0].name_parish + ', ' + neighborhoods[0].name_neighborhood + ', ' + datosFormulario.address_r +
            '\n' +
            '- *Plan Seleccionado:* ' + plans[0].name_plan + ' ' + plans[0].size +
            '\n\n' +
            'El prospecto ha mostrado interés en nuestro plan ' + plans[0].name_plan + ' y ha solicitado información adicional sobre el servicio.' +
            '\n\n' +
            'Te recomendamos que contactes al prospecto lo antes posible para concertar una cita y brindarle la información que necesita.' +
            '\n\n' +
            'Estamos seguros de que podrás brindarle al prospecto la atención y el asesoramiento que necesita para convertirse en un cliente satisfecho de *Sisprot Global Fiber*.' +
            '\n\n' +
            '¡Éxito en tu gestión!' +
            '\n\n' +
            'Atentamente' +
            '\n\n' +
            'El equipo de ventas de *Sisprot Global Fiber*'
          });

          console.log('Repuesta de Ultramsg (msgVendor):', msgVendor.data);
        } catch (error) {
          console.error('Error al enviar mensaje msgVendor:', error)
        }

        try {
          const msgGroup = await axios.post('https://api.ultramsg.com/instance87810/messages/chat', {
            token: 'rzqp54nn0tucqspv', 
            to: '120363203187033015@g.us', 
            body: '*Asunto: Nuevo prospecto asignado a:* ' + vendors[0].name_vendor + ' - ' + datosFormulario.name + ' ' + datosFormulario.last_name +
            '\n\n' +
            'Estimado equipo de gerencia de ventas,' +
            '\n\n' +
            'Nos complace informarles que se ha asignado un nuevo prospecto de cliente al asesor de ventas ' + vendors[0].name_vendor + '.' +
            '\n\n' +
            '*Información del Prospecto:*' +
            '\n\n' +
            '- *Nombre:* ' + datosFormulario.name + ' ' + datosFormulario.last_name +
            '\n' +
            '- *Teléfono:* ' + datosFormulario.phone + 
            '\n' +
            '- *Correo Electrónico:* ' + datosFormulario.email +
            '\n' +
            '- *Dirección:* ' + municipalities[0].name_municipality + ', ' + parishes[0].name_parish + ', ' + neighborhoods[0].name_neighborhood + ', ' + datosFormulario.address_r +
            '\n' +
            '- *Plan Seleccionado:* ' + plans[0].name_plan + ' ' + plans[0].size +
            '\n\n' +
            'El prospecto ha mostrado interés en nuestro plan ' + plans[0].name_plan + ' y ha solicitado información adicional sobre el servicio.' +
            '\n\n' +
            vendors[0].name_vendor + ' se pondrá en contacto con el prospecto lo antes posible para concertar una cita y brindarle la información que necesita.' +
            '\n\n' +
            'Confiamos en la capacidad de ' + datosFormulario.vendor + 'para brindar una atención de calidad al prospecto y convertirlo en un cliente satisfecho de *Sisprot Global Fiber*.' +
            '\n\n' +
            'Agradecemos su atención a este aviso.' +
            '\n\n' +
            'Atentamente,' +
            '\n\n' +
            'El equipo de vendtas de *Sisprot Global Fiber*'
          });

          console.log('Repuesta de Ultramsg (msgGroup):', msgGroup.data);
        } catch (error) {
          console.error('Error al enviar mensaje msgGroup:', error)
        }
  
        setOpenSnackbar(true)
        setPasoActual(ultimoPaso)
      } catch (error) {
        console.error('Error general al enviar:', error)
      } finally {
        setEnviando(false)
      }
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
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        overflow: 'hidden'
       }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }} >
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          sx={{ 
            backgroundColor: '#004E74', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <img src={Logo} alt='Logo' style={{ maxWidth: '80%' }} />
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={8} 
          sx={{ 
            backgroundColor: '#E4EAF0', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Typography 
            variant='h6' 
            gutterBottom 
            align='center' 
            sx={{ 
              fontWeight: 500, 
              paddingTop: 12, 
              fontSize: { 
                xs: '1rem', 
                sm: '1rem', 
                md: '1.75rem' 
              },
              fontFamily: 'Montserrat' 
            }}
          >
            LLEGAMOS A TU ZONA
          </Typography>
          <Typography 
            variant='h4' 
            gutterBottom 
            align='center' 
            sx={{ 
              marginBottom: 5, 
              fontWeight: 800, 
              fontSize: { 
                xs: '1.5rem', 
                sm: '2rem', 
                md: '2.5rem' 
              },
              fontFamily: 'Montserrat'
            }}
          >
            SOLICITA TU FACTIBILIDAD
          </Typography>
          <Grid container direction='column' justifyItems='space-between' spacing={2}>
            <Stepper 
              activeStep={pasoActual}
              alternativeLabel
              sx={{
                width: '100%',
                // maxWidth: 600,
                marginLeft: 1
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel></StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xs={12}>
            <Box 
              sx={{ 
                borderRadius: 10, 
                backgroundColor: '#FFF', 
                padding: 2, 
                marginY: 5, 
                mx: { 
                  xs: 2, 
                  sm: 4, 
                  md: 2, 
                  lg: 8 
                }
              }}
            >
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
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'start', 
                marginX: 9, 
                gap: 2,
                marginBottom: 5
              }}
            >
              {pasoActual !== ultimoPaso && (
                <Button variant='outlined' onClick={handleAnterior} disabled={pasoActual === 0}>
                  Anterior
                </Button>
              )}
              {pasoActual === ultimoPaso - 1 ? (
                <Button 
                  variant="contained" 
                  color="success" 
                  endIcon={<SendIcon />}
                  onClick={handleEnviar}
                  disabled={enviando || loading}
                >
                  {enviando ? 'Enviando...' : 'Enviar'}
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
      <Box
        component='footer'
        sx={{
          backgroundColor: '#F3AF30',
          color: '#004E74',
          padding: 2,
          marginTop: 'auto',
          width: '100%',
          textAlign: 'center',
          px: {
            xs: 2,
            sm: 4,
            md: 6
          },
          fontSize: {
            xs: '0.8rem',
            sm: '1rem',
            md: '1.2rem'
          }
        }}
      >
        <Typography variant='body2' sx={{ fontFamily: 'Montserrat', fontWeight: '500' }}>
          &copy; {new Date().getFullYear()} Sisprot Global Fiber C.A.
        </Typography>
        <Typography variant='body2' sx={{ fontFamily: 'Montserrat', fontWeight: '500' }}>
          ¡La fibra que une a Mariño!
        </Typography>
      </Box>
    </Box>
  );
}

export default FormularioPreRegistro;
