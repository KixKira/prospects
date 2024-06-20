import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actualizarDatos } from '../features/preRegistro/preRegistroSlice';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

function PersonalInfo() {
  const dispatch = useDispatch();
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
  }, [name, last_name, dni, rif, phone, email, gender, fb, ig, tt, dispatch])

  return (
    <Box sx={{ padding: 2}}>
      <Typography variant='h5' component='h2' guttenBottom sx={{ fontWeight: 500, marginBottom: 2 }}>
        Información Personal
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Nombre Completo' id='name' value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Apellido Completo' id="last_name" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Cédula de Identidad' id="dni" value={dni} type='number' onChange={(e) => setDni(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='RIF Personal' id="rif" value={rif} type='number' onChange={(e) => setRif(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Teléfono de Contacto' id="phone" value={phone} type='number' onChange={(e) => setPhone(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Email' id="email" value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Género</InputLabel>
            <Select labelId="gender-label" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value='male'>Masculino</MenuItem>
              <MenuItem value='female'>Femenino</MenuItem>
              <MenuItem></MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Facebook' id="fb" value={fb} onChange={(e) => setFB(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Instagram' id="ig" value={ig} onChange={(e) => setIG(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='TikTok' id="tt" value={tt} onChange={(e) => setTT(e.target.value)} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PersonalInfo;
