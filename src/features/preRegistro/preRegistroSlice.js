import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../supabase/config';

export const enviarDatos = createAsyncThunk('preRegistro/enviarDatos', async (datosFormulario) => {
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
      id_neighborhood: datosFormulario.neighborhood || null, 
      id_plan: datosFormulario.plan || null,              
      id_type_house: datosFormulario.type_house || null, 
      id_vendor: datosFormulario.vendor || null,        
    };

    const { data, error } = await supabase
      .from('prospects')
      .insert([datosParaSupabase]);

    if (error) {
      console.error('Error al insertar en Supabase:', error);
      throw error;
    }

    console.log('Datos insertados en Supabase:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

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
    type_house: '',
    vendor: '',
    address_b: '',
    pasoActual: 0,
    loading: false,
    error: null, 
  },
  reducers: {
    actualizarDatos: (state, action) => {
      return {
        ...state,
        ...action.payload,
        pasoActual: state.pasoActual + 1
      }
    },
    retrocederPaso: (state) => {
      state.pasoActual -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enviarDatos.pending, (state) => {
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
        state.municipality = ''
        state.parish = ''
        state.neighborhood = ''
        state.type_house = ''
        state.vendor = ''
        state.address_b = ''
        state.pasoActual = 0;
      })
      .addCase(enviarDatos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { actualizarDatos, retrocederPaso } = preRegistroSlice.actions;
export default preRegistroSlice.reducer;
