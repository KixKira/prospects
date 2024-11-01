import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../supabase/config';
import axios from 'axios';

// ENVIAR A SUPABASE
export const enviarDatos = createAsyncThunk('preRegistro/enviarDatos', async (datosFormulario, { dispatch }) => {
  try {
    const datosParaSupabase = {
      name: datosFormulario.name || null,
      last_name: datosFormulario.last_name || null,
      dni: datosFormulario.dni || null,
      rif: datosFormulario.rif || null,
      phone: datosFormulario.phone || null,
      email: datosFormulario.email || null,
      gender: datosFormulario.gender || null,
      fb: datosFormulario.fb || null,
      ig: datosFormulario.ig || null,
      tt: datosFormulario.tt || null,
      address_r: datosFormulario.address_r || null,
      address_b: datosFormulario.address_b || null,
      other_neighborhood: datosFormulario.other_neighborhood || null,
      coordinate: datosFormulario.coordinate || null,
      latitude: datosFormulario.latitude || null,
      longitude: datosFormulario.longitude || null,
      id_neighborhood: datosFormulario.neighborhood || null, 
      id_plan: datosFormulario.plan || null,              
      id_type_house: datosFormulario.type_house || null, 
      id_vendor: datosFormulario.vendor || null,    
      id_type_client: datosFormulario.idTypeClient    
    };
    
    const { data, error } = await supabase
    .from('prospects')
    .insert([datosParaSupabase]);
    
    if (error) {
      console.error('Error al insertar en Supabase:', error);
      throw error;
    }
    
    dispatch(enviarDatosCompletado())
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

export const enviarDatosPyme = createAsyncThunk('preRegistro/enviarDatosPyme', async (datosFormulario, { dispatch }) => {
  try {
    const datosParaSupabasePyme = {
      legal_name: datosFormulario.legal_name || null,
      legal_last_name: datosFormulario.legal_last_name || null,
      business_type: datosFormulario.business_type || null,
      business_rif: datosFormulario.business_rif || null,
      legal_dni: datosFormulario.legal_dni || null,
      legal_rif: datosFormulario.legal_rif || null,
      business_phone: datosFormulario.business_phone || null,
      business_name: datosFormulario.business_name || null,
      business_email: datosFormulario.business_email || null,
      business_fb: datosFormulario.business_fb || null,
      business_ig: datosFormulario.business_ig || null,
      business_tt: datosFormulario.business_tt || null,
      business_address_r: datosFormulario.business_address_r || null,
      business_address_b: datosFormulario.business_address_b || null,
      business_other_neighborhood: datosFormulario.business_other_neighborhood || null,
      coordinate: datosFormulario.coordinate || null,
      latitude: datosFormulario.latitude || null,
      longitude: datosFormulario.longitude || null,
      id_neighborhood: datosFormulario.neighborhood || null,
      id_plan: datosFormulario.plan || null,
      id_type_house: datosFormulario.type_house || null,
      id_vendor: datosFormulario.vendor || null,
      id_type_client: datosFormulario.idTypeClient    
    }
    const { data, error } = await supabase
    .from('prospects_business')
    .insert([datosParaSupabasePyme])
    
    if (error) {
      console.error('Error al insertar en Supabase:', error);
      throw error;
    }
    
    dispatch(enviarDatosCompletado())
    console.log('Datos insertados en Supabase:', data);
    return data
  } catch (error) {
    console.error('Error:', error);
    throw error
  }
})

const preRegistroSlice = createSlice({
  name: 'prospects',
  initialState: {
    name: '',
    last_name: '',
    dni: '',
    rif: '',
    phone: '',
    email: '',
    gender: '',
    fb: '',
    ig: '',
    tt: '',
    address_r: '',
    state: '',
    municipality: '',
    parish: '',
    neighborhood: '',
    other_neighborhood: '',
    type_house: '',
    vendor: '',
    address_b: '',
    business_name: '',
    business_rif: '',
    legal_name: '',
    legal_last_name: '',
    business_type: '',
    legal_dni: '',
    legal_rif: '',
    business_phone: '',
    business_email: '',
    business_fb: '',
    business_ig: '',
    business_tt: '',
    business_address_r: '',
    business_address_b: '',
    business_other_neighborhood: '',
    pasoActual: 0,
    coordinate: '',
    latitude: '',
    longitude: '',
    loading: false,
    error: null,
    isPyme: false,
    idTypeClient: 1
  },
  reducers: {
    actualizarDatos: (state, action) => {
      return {
        ...state,
        ...action.payload,
        pasoActual: state.pasoActual + 1
      }
    },
    actualizarDatosPyme: (state, action) => {
      return {
        ...state,
        ...action.payload,
        pasoActual: state.pasoActual + 1
      }
    },
    retrocederPaso: (state) => {
      state.pasoActual -= 1;
    },
    enviarDatosCompletado: (state) => {
      state.pasoActual = 6
    },
    cambiarTipoCliente: (state, action) => {
      state.isPyme = action.payload
      state.idTypeClient = action.payload ? 2 : 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(enviarDatos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enviarDatosPyme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enviarDatos.fulfilled, (state, action) => {
        state.loading = false;
        state.name = '';
        state.last_name = '';
        state.dni = ''
        state.rif = ''
        state.phone = ''
        state.email = '';
        state.gender = '';
        state.fb = ''
        state.ig = ''
        state.tt = ''
        state.address_r = '';
        state.state = ''
        state.municipality = ''
        state.parish = ''
        state.neighborhood = ''
        state.other_neighborhood = ''
        state.type_house = ''
        state.vendor = ''
        state.address_b = ''
        state.coordinate = ''
        state.latitude = ''
        state.longitude = ''
        state.pasoActual = 6;
      })
      .addCase(enviarDatosPyme.fulfilled, (state, action) => {
        state.loading = false;        
        state.business_name = '';
        state.business_rif = '';
        state.legal_name = '';
        state.legal_last_name = '';
        state.business_type = '';
        state.legal_dni = '';
        state.legal_rif = '';
        state.business_phone = '';
        state.business_email = '';
        state.business_fb = '';
        state.business_ig = '';
        state.business_tt = '';
        state.business_address_r = '';
        state.business_address_b = '';
        state.business_other_neighborhood = '';
        state.state = ''
        state.municipality = ''
        state.parish = ''
        state.neighborhood = ''
        state.type_house = ''
        state.vendor = ''        
        state.coordinate = ''
        state.latitude = ''
        state.longitude = ''
        state.pasoActual = 6;
      })
      .addCase(enviarDatos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(enviarDatosPyme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ENVIAR A OZMAP
export const enviarDatosAOzmap = createAsyncThunk('preRegistro/enviarDatosAOzmap', async (datosFormulario) => {
  try {
    const ozmapResponse = await axios.post('https://sisprtoglobalfiber.ozmap.com.br:9994', {
      "name": datosFormulario.name, 
      "coords": [
      datosFormulario.longitude,
      datosFormulario.latitude,
      ],
      "address": datosFormulario.address_r
    })
  } catch (error) {
    console.error('Error al enviar datos a OZMAP:', error)
    throw error
  }
})


export const { actualizarDatos, retrocederPaso, enviarDatosCompletado, cambiarTipoCliente, actualizarDatosPyme } = preRegistroSlice.actions;
export default preRegistroSlice.reducer;
