import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarDatos, actualizarDatosPyme } from '../features/preRegistro/preRegistroSlice';

function MapLocation() {
  const dispatch = useDispatch()
  const isPyme = useSelector((state) => state.preRegistro.isPyme)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [marker, setMarker] = useState(null)
  const mapRef = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    dispatch(
      actualizarDatos({
        latitude, longitude 
      })
    )
  }, [latitude, longitude, dispatch])

  useEffect(() => {
    dispatch(
      actualizarDatosPyme({
        latitude, longitude 
      })
    )
  }, [latitude, longitude, dispatch])

  useEffect(() => {
    if (mapRef.current) {
      map.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 10.227217866820169, lng: -67.47383124855506 },
        zoom: 17
      })

      const clickListener = map.current.addListener('click', (event) => {
        placeMarker(event.latLng);
        setLatitude(event.latLng.lat());
        setLongitude(event.latLng.lng());

        window.google.maps.event.removeListener(clickListener);
      })
    }
  }, [mapRef])

  const placeMarker = (location) => {
    const newLocation = new window.google.maps.LatLng(
      location.lat(),
      location.lng()
    );

    if (marker) {
      marker.setMap(null); 
    }

    const newMarker = new window.google.maps.Marker({
      position: newLocation,
      map: map.current,
    });
    setMarker(newMarker);
    setLatitude(newLocation.lat());
    setLongitude(newLocation.lng());
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          placeMarker(userLocation);
          map.current.setCenter(userLocation);
        },
        () => {
          alert("Error obteniendo la localización");
        }
      );
    } else {
      alert("Geolocalización no es compatible con este navegador");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h5' component='h2' gutterBottom>Geolocalización</Typography>
      {isPyme ? (
        <Box
          className='wrapper'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box ref={mapRef} sx={{ width: '100%', height: 400 }} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField 
                label='Latitud' 
                variant='outlined' 
                fullWidth 
                value={latitude} 
                disabled 
                InputProps={{ 
                  readOnly: true 
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label='Longitud' 
                variant='outlined' 
                fullWidth 
                value={longitude} 
                disabled 
                InputProps={{ 
                  readOnly: true 
                }}
              />
            </Grid>
          </Grid>
          <Button variant='contained' onClick={getCurrentLocation} sx={{ mt: 2 }}>
            Usar mi Ubicación
          </Button>
          </Box>
      ) : (
        <Box
          className='wrapper'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box ref={mapRef} sx={{ width: '100%', height: 400 }} />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField 
                label='Latitud' 
                variant='outlined' 
                fullWidth 
                value={latitude} 
                disabled 
                InputProps={{ 
                  readOnly: true 
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label='Longitud' 
                variant='outlined' 
                fullWidth 
                value={longitude} 
                disabled 
                InputProps={{ 
                  readOnly: true 
                }}
              />
            </Grid>
          </Grid>
          <Button variant='contained' onClick={getCurrentLocation} sx={{ mt: 2 }}>
            Usar mi Ubicación
          </Button>
          </Box>
      )}
    </Box>
  );
}

export default MapLocation;
