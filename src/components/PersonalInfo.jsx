import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarDatos, actualizarDatosPyme, cambiarTipoCliente } from '../features/preRegistro/preRegistroSlice';
import { 
  Box, 
  FormControl, 
  FormControlLabel, 
  FormHelperText, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  Switch, 
  TextField, 
  Typography 
} from '@mui/material';

function PersonalInfo({ errors }) {
  const dispatch = useDispatch();
  
  // RESIDENTIAL STATES
  const [name, setName] = useState('');
  const [last_name, setLast_name] = useState('');
  const [dni, setDni] = useState('');
  const [rif, setRif] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [fb, setFB] = useState('');
  const [ig, setIG] = useState('');
  const [tt, setTT] = useState('');

  //BUSINESS STATES
  const [business_name, setBusiness_name] = useState('')
  const [business_rif, setBusiness_rif] = useState('')
  const [legal_name, setLegal_name] = useState('')
  const [legal_last_name, setLegal_last_name] = useState('')
  const [business_type, setBusiness_type] = useState('')
  const [legal_dni, setLegal_dni] = useState('')
  const [legal_rif, setLegal_rif] = useState('')
  const [business_phone, setBusiness_phone] = useState('')
  const [business_email, setBusiness_email] = useState('')
  const [business_fb, setBusiness_fb] = useState('')
  const [business_ig, setBusiness_ig] = useState('')
  const [business_tt, setBusiness_tt] = useState('')

  const isPyme = useSelector((state) => state.preRegistro.isPyme)
  
  useEffect(() => {
    dispatch(
      actualizarDatos({ 
        name, 
        last_name, 
        dni, 
        rif, 
        phone, 
        email, 
        gender, 
        fb, 
        ig, 
        tt 
      })
    );
  }, [
    name, 
    last_name, 
    dni, 
    rif, 
    phone, 
    email, 
    gender, 
    fb, 
    ig, 
    tt, 
    dispatch
  ])

  useEffect(() => {
    if (isPyme) {
      dispatch(
        actualizarDatosPyme({ 
          business_name, 
          business_rif, 
          legal_name, 
          legal_last_name, 
          business_type, 
          legal_dni, 
          legal_rif, 
          business_phone, 
          business_email, 
          business_fb, 
          business_ig, 
          business_tt
        })
      );
    }
  }, [
    isPyme, 
    business_name, 
    business_rif, 
    legal_name, 
    legal_last_name, 
    business_type, 
    legal_dni, 
    legal_rif, 
    business_phone, 
    business_email, 
    business_fb, 
    business_ig, 
    business_tt, 
    dispatch
  ])


  const handleSwitchChange = (event) => {
    dispatch(cambiarTipoCliente(event.target.checked))
  }

  return (
    <Box sx={{ padding: 2}}>
      <Typography 
        variant='h5' 
        component='h2' 
        guttenBottom 
        sx={{ 
          fontWeight: 500, 
          marginBottom: 2,
          fontFamily: 'Montserrat'
        }}>
        Información Personal
      </Typography>
      <FormControlLabel
        control={<Switch checked={isPyme} onChange={handleSwitchChange} />}
        label='Soy cliente PYME'
        sx={{ marginBottom: 2 }}
      />
      {isPyme ? (

        // PYME
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Nombre de la Empresa o Razón Social' 
              id='business_name' 
              value={business_name} 
              onChange={(e) => setBusiness_name(e.target.value)} 
              error={!!errors.business_name} 
              helperText={errors.business_name} 
            />
            <FormHelperText>Ej: Sisprot Global Fiber</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='RIF de la Empresa' 
              id='business_rif' 
              value={business_rif} 
              onChange={(e) => setBusiness_rif(e.target.value)} 
              error={!!errors.business_rif} 
              helperText={errors.business_rif}
              inputProps={{
                maxLength: 11
              }}
            />
            <FormHelperText>Ej: J12345678-9</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="business-type">Tipo de Empresa</InputLabel>
              <Select
                labelId="business-type" 
                id="business_type" 
                value={business_type} 
                onChange={(e) => setBusiness_type(e.target.value)} 
                error={!!errors.business_type} 
                helperText={errors.business_type}
              >
                <MenuItem value='pyme'>PYME</MenuItem>
                <MenuItem value='corporative'>Corporativa</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText>Elija un tipo de empresa</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='RIF del Representante Legal' 
              id="legal_rif" 
              value={legal_rif} 
              onChange={(e) => setLegal_rif(e.target.value)} 
              error={!!errors.legal_rif} 
              helperText={errors.legal_rif}
              inputProps={{
                maxLength: 11
              }}
            />
            <FormHelperText>Ej: V12345678-9</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Nombre Completo del Representante Legal' 
              id='legal_name' 
              value={legal_name} 
              onChange={(e) => setLegal_name(e.target.value)} 
              error={!!errors.legal_name} 
              helperText={errors.legal_name} 
            />
            <FormHelperText>Ej: Simón José</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Apellido Completo del Representante Legal' 
              id='legal_last_name' 
              value={legal_last_name} 
              onChange={(e) => setLegal_last_name(e.target.value)} 
              error={!!errors.legal_last_name} 
              helperText={errors.legal_last_name} 
            />
            <FormHelperText>Ej: Bolívar Ponte</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Cédula de Identidad del Representante Legal' 
              id="legal_dni" 
              value={legal_dni}
              type='number' 
              onChange={(e) => {
                const inputValue = e.target.value
                if (/^\d{1,8}$/.test(inputValue) || inputValue === '') {
                  setLegal_dni(inputValue)
                }
              }}
              error={!!errors.legal_dni} 
              helperText={errors.legal_dni} 
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  '-moz-appearance': 'textfield',
                },
              }}
              inputProps={{
                maxLength: 8
              }}
            />
            <FormHelperText>Ej: 12345678</FormHelperText>
          </Grid>          
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Teléfono de Contacto' 
              id="business_phone" 
              value={business_phone}
              type='number' 
              onChange={(e) => {
                const inputValue = e.target.value
                if (/^\d{1,11}$/.test(inputValue) || inputValue === '') {
                  setBusiness_phone(inputValue)
                }
              }}
              error={!!errors.business_phone} 
              helperText={errors.business_phone} 
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  '-moz-appearance': 'textfield',
                },
              }}
              inputProps={{
                maxLength: 11
              }}
            />
            <FormHelperText>Ej: 04121234567</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Email de Contacto' 
              id="business_email" 
              value={business_email} type='email' 
              onChange={(e) => setBusiness_email(e.target.value)} 
              error={!!errors.business_email} 
              helperText={errors.business_email}
            />
            <FormHelperText>Ej: sbolivar@gmail.com</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Facebook Empresarial' 
              id="business_fb" 
              value={business_fb} 
              onChange={(e) => setBusiness_fb(e.target.value)} 
              error={!!errors.business_fb} 
              helperText={errors.business_fb} 
            />
            <FormHelperText>Ej: facebook.com/sisprotgf/</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Instagram Empresarial' 
              id="business_ig" value={business_ig} 
              onChange={(e) => setBusiness_ig(e.target.value)} 
              error={!!errors.business_ig} 
              helperText={errors.business_ig} 
            />
            <FormHelperText>Ej: instagram.com/Sisprotgf</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='TikTok Empresarial' 
              id="business_tt" 
              value={business_tt} 
              onChange={(e) => setBusiness_tt(e.target.value)} 
              error={!!errors.business_tt} 
              helperText={errors.business_tt} 
            />
            
            <FormHelperText>Ej: tiktok.com/@sisprotgf</FormHelperText>
          </Grid>
        </Grid>
      ) : (

        // RESIDENCIAL
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Nombre Completo' 
              id='name' 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              error={!!errors.name} 
              helperText={errors.name}
            />
            <FormHelperText>Ej: Simón José</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Apellido Completo' 
              id="last_name" 
              value={last_name} 
              onChange={(e) => setLast_name(e.target.value)} 
              error={!!errors.last_name} 
              helperText={errors.last_name} 
            />
            <FormHelperText>Ej: Bolívar Ponte</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Cédula de Identidad' 
              id="dni" 
              value={dni} 
              type='number' 
              onChange={(e) => {
                const inputValue = e.target.value
                if (/^\d{1,8}$/.test(inputValue) || inputValue === '') {
                  setDni(inputValue)
                }
              }}
              error={!!errors.dni} 
              helperText={errors.dni} 
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  '-moz-appearance': 'textfield',
                },
              }}
              inputProps={{
                maxLength: 8
              }}
            />
            <FormHelperText>Ej: 12345678</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='RIF Personal' 
              id="rif" 
              value={rif} 
              onChange={(e) => setRif(e.target.value)} 
              error={!!errors.rif} 
              helperText={errors.rif}
              inputProps={{
                maxLength: 11
              }}
            />
            <FormHelperText>Ej: V12345678-9</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Teléfono de Contacto' 
              id="phone" 
              value={phone} 
              type='number' 
              onChange={(e) => {
                const inputValue = e.target.value
                if (/^\d{1,11}$/.test(inputValue) || inputValue === '') {
                  setPhone(inputValue)
                }
              }}
              error={!!errors.phone} 
              helperText={errors.phone}
              sx={{
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
                  margin: 0,
                },
                '& input[type=number]': {
                  '-moz-appearance': 'textfield',
                },
              }}
              inputProps={{
                maxLength: 11
              }}
            />
            <FormHelperText>Ej: 04121234567</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Email' 
              id="email" 
              value={email} 
              type='email' 
              onChange={(e) => setEmail(e.target.value)} 
              error={!!errors.email} 
              helperText={errors.email} 
            />
            <FormHelperText>Ej: sbolivar@gmail.com</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Género</InputLabel>
              <Select 
                labelId="gender-label" 
                id="gender" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)} 
                error={!!errors.gender} 
                helperText={errors.gender}
              >
                <MenuItem value='male'>Masculino</MenuItem>
                <MenuItem value='female'>Femenino</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText>Elija un género</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Facebook' 
              id="fb" 
              value={fb} 
              onChange={(e) => setFB(e.target.value)} 
            />
            <FormHelperText>Ej: facebook.com/sisprotgf/</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='Instagram' 
              id="ig" 
              value={ig} 
              onChange={(e) => setIG(e.target.value)} 
            />
            <FormHelperText>Ej: instagram.com/Sisprotgf</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              label='TikTok' 
              id="tt" 
              value={tt} 
              onChange={(e) => setTT(e.target.value)}
            />
            <FormHelperText>Ej: tiktok.com/@sisprotgf</FormHelperText>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default PersonalInfo;
