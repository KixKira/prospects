import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarDatos, actualizarDatosPyme } from '../features/preRegistro/preRegistroSlice';
import supabase from '../supabase/config';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';


function LocationForm({ errors }) {
  const dispatch = useDispatch();
  
  // RESIDENTIAL STATES
  const [selectedState, setSelectedState] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [parish, setParish] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [type_house, setType_house] = useState('');
  const [vendor, setVendor] = useState('');
  const [address_r, setAddress_r] = useState('');
  const [address_b, setAddress_b] = useState('');

  //BUSINESS STATES
  const [business_address_r, setBusiness_address_r] = useState('')
  const [business_address_b, setBusiness_address_b] = useState('')

  const [states, setStates] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [typesHouses, setTypesHouses] = useState([]);
  const [vendors, setVendors] = useState([]);
  
  const isPyme = useSelector((state) => state.preRegistro.isPyme)

  useEffect(() => {
    const fetchStates = async () => {
      const stateId = 4

      const { data, error } = await supabase
        .from('states')
        .select('*')
        .eq('id_state', stateId)
        .single();

      if (error) {
        console.error('Error fetching states:', error);
      } else {
        setStates([data]);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      const municipalityId = 13;

      if (selectedState) { 
        const { data, error } = await supabase
          .from('municipalities')
          .select('*')
          .eq('id_state', selectedState)
          .eq('id_municipality', municipalityId)
          .single();

        if (error) {
          console.error('Error fetching municipalities:', error);
        }else {
          setMunicipalities([data]);
        }

      } else {
        setMunicipalities([]);
      }
    };
    
    fetchMunicipalities();
  }, [selectedState]);

  useEffect(() => {
    const fetchParishes = async () => {
      if (municipality) { 
        const { data, error } = await supabase
          .from('parishes')
          .select('*')
          .eq('id_municipality', municipality); 

        if (error) console.error('Error fetching parishes:', error);

        else setParishes(data);
      } else {
        setParishes([]);
      }
    };
    
    fetchParishes();
  }, [municipality]);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      if (parish) { 
        const { data, error } = await supabase
          .from('neighborhoods')
          .select('*')
          .eq('id_parish', parish); 

        if (error) console.error('Error fetching neighborhoods:', error);

        else setNeighborhoods(data);
      } else {
        setNeighborhoods([]);
      }
    };
    
    fetchNeighborhoods();
  }, [parish]);
  
  useEffect(() => {
    dispatch(actualizarDatos({ 
      selectedState, 
      municipality, 
      parish, 
      neighborhood, 
      type_house, 
      vendor, 
      address_r, 
      address_b 
    }));
  }, [
    selectedState, municipality, parish, neighborhood, type_house, vendor, address_r, address_b, dispatch
  ]);
  
  useEffect(() => {
    if (isPyme) {
      dispatch(actualizarDatosPyme({ 
        selectedState, 
        municipality, 
        parish, 
        neighborhood, 
        type_house, 
        vendor, 
        business_address_r, 
        business_address_b 
      }));
    }
  }, [ isPyme, selectedState, municipality, parish, neighborhood, type_house, vendor, business_address_r, business_address_b, dispatch
  ]);

  useEffect(() => {
    const fetchTypesHouses = async () => {
      const { data, error } = await supabase.from('types_houses').select('*');

      if (error) console.error('Error fetching types of houses:', error);
      else setTypesHouses(data);
    };

    fetchTypesHouses();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      const { data, error } = await supabase.from('vendors').select('*');

      if (error) console.error('Error fetching vendors:', error);
      else setVendors(data);
    };

    fetchVendors();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant='h5' component='h2' guttenBottom sx={{ fontWeight: 500, marginBottom: 2 }}>
        Información Residencial
      </Typography>
      {isPyme ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="state-label">Seleccione un Estado</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                value={selectedState}
                label="Seleccione un Estado"
                onChange={(e) => setSelectedState(e.target.value)}
                error={!!errors.selectedState}
                helperText={errors.selectedState}
              >
                {states.map((state) => (
                  <MenuItem key={state.id_state} value={state.id_state}>
                    {state.name_state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="municipality-label">Seleccione un Municipio</InputLabel>
              <Select
                labelId="municipality-label"
                id="municipality"
                value={municipality}
                label="Seleccione un Municipio"
                onChange={(e) => setMunicipality(e.target.value)}
                error={!!errors.municipality}
                helperText={errors.municipality}
              >
                {municipalities.map((municipality) => (
                  <MenuItem key={municipality.id_municipality} value={municipality.id_municipality}>
                    {municipality.name_municipality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="parish-label">Seleccione una Parroquia</InputLabel>
              <Select
                labelId="parish-label"
                id="parish"
                value={parish}
                label="Seleccione una Parroquia"
                onChange={(e) => setParish(e.target.value)}
                error={!!errors.parish}
                helperText={errors.parish}
              >
                {parishes.map((parish) => (
                  <MenuItem key={parish.id_parish} value={parish.id_parish}>
                    {parish.name_parish}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="neighborhood-label">Seleccione un Sector</InputLabel>
              <Select
                labelId="neighborhood-label"
                id="neighborhood"
                value={neighborhood}
                label="Seleccione un Sector"
                onChange={(e) => setNeighborhood(e.target.value)}
                error={!!errors.neighborhood}
                helperText={errors.neighborhood}
              >
                {neighborhoods.map((neighborhood) => (
                  <MenuItem key={neighborhood.id_neighborhood} value={neighborhood.id_neighborhood}>
                    {neighborhood.name_neighborhood}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="type_house-label">Seleccione un Tipo de Residencia</InputLabel>
              <Select
                labelId="type_house-label"
                id="type_house"
                value={type_house}
                label="Seleccione un Tipo de Residencia"
                onChange={(e) => setType_house(e.target.value)}
                error={!!errors.type_house}
                helperText={errors.type_house}
              >
                {typesHouses.map((type_house) => (
                  <MenuItem key={type_house.id_type_house} value={type_house.id_type_house}>
                    {type_house.name_type_house}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="vendor-label">Seleccione un Vendedor</InputLabel>
              <Select
                labelId="vendor-label"
                id="vendor"
                value={vendor}
                label="Seleccione un Vendedor"
                onChange={(e) => setVendor(e.target.value)}
                error={!!errors.vendor}
                helperText={errors.vendor}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.id_vendor} value={vendor.id_vendor}>
                    {vendor.name_vendor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Dirección de Residencia' id="business_address_r" value={business_address_r} onChange={(e) => setBusiness_address_r(e.target.value)} error={!!errors.business_address_r} helperText={errors.business_address_r} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Dirección Fiscal' id="business_address_b" value={business_address_b} onChange={(e) => setBusiness_address_b(e.target.value)} />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="state-label">Seleccione un Estado</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                value={selectedState}
                label="Seleccione un Estado"
                onChange={(e) => setSelectedState(e.target.value)}
                error={!!errors.selectedState}
                helperText={errors.selectedState}
              >
                {states.map((state) => (
                  <MenuItem key={state.id_state} value={state.id_state}>
                    {state.name_state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="municipality-label">Seleccione un Municipio</InputLabel>
              <Select
                labelId="municipality-label"
                id="municipality"
                value={municipality}
                label="Seleccione un Municipio"
                onChange={(e) => setMunicipality(e.target.value)}
                error={!!errors.municipality}
                helperText={errors.municipality}
              >
                {municipalities.map((municipality) => (
                  <MenuItem key={municipality.id_municipality} value={municipality.id_municipality}>
                    {municipality.name_municipality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="parish-label">Seleccione una Parroquia</InputLabel>
              <Select
                labelId="parish-label"
                id="parish"
                value={parish}
                label="Seleccione una Parroquia"
                onChange={(e) => setParish(e.target.value)}
                error={!!errors.parish}
                helperText={errors.parish}
              >
                {parishes.map((parish) => (
                  <MenuItem key={parish.id_parish} value={parish.id_parish}>
                    {parish.name_parish}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="neighborhood-label">Seleccione un Sector</InputLabel>
              <Select
                labelId="neighborhood-label"
                id="neighborhood"
                value={neighborhood}
                label="Seleccione un Sector"
                onChange={(e) => setNeighborhood(e.target.value)}
                error={!!errors.neighborhood}
                helperText={errors.neighborhood}
              >
                {neighborhoods.map((neighborhood) => (
                  <MenuItem key={neighborhood.id_neighborhood} value={neighborhood.id_neighborhood}>
                    {neighborhood.name_neighborhood}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="type_house-label">Seleccione un Tipo de Residencia</InputLabel>
              <Select
                labelId="type_house-label"
                id="type_house"
                value={type_house}
                label="Seleccione un Tipo de Residencia"
                onChange={(e) => setType_house(e.target.value)}
                error={!!errors.type_house}
                helperText={errors.type_house}
              >
                {typesHouses.map((type_house) => (
                  <MenuItem key={type_house.id_type_house} value={type_house.id_type_house}>
                    {type_house.name_type_house}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth> 
              <InputLabel id="vendor-label">Seleccione un Vendedor</InputLabel>
              <Select
                labelId="vendor-label"
                id="vendor"
                value={vendor}
                label="Seleccione un Vendedor"
                onChange={(e) => setVendor(e.target.value)}
                error={!!errors.vendor}
                helperText={errors.vendor}
              >
                {vendors.map((vendor) => (
                  <MenuItem key={vendor.id_vendor} value={vendor.id_vendor}>
                    {vendor.name_vendor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Dirección de Residencia' id="address_r" value={address_r} onChange={(e) => setAddress_r(e.target.value)} error={!!errors.address_r} helperText={errors.address_r} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Dirección Fiscal' id="address_b" value={address_b} onChange={(e) => setAddress_b(e.target.value)} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default LocationForm;
