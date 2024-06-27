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
    console.log(data, error);
    
    if (error) {
      console.error('Error al insertar en Supabase:', error);
      throw error;
    }
    
    console.log('Datos insertados en Supabase:', data);
    dispatch(enviarDatosCompletado())
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});










  // // ENVIAR MENSAJES
  // const PlantillaMensaje = [
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 
  //   "Nombre cliente:\r\n\r\n" + {nombreForm} + 

  // ]

  // const PlantillaMensaje = [
  //   "Hemos recibidos tus datos" + {nombreFulano}
    
  // ]

  
  // const PlantillaMensaje = [
  //   "El cliente Fulano se registro como prospecto en el formulario y espera por ti"
    
  // ]


  // axios.post('https://api.ultramsg.com/instance87810/messages/chat', {
  //   "token":"rzqp54nn0tucqspv",
  //   "to":"+584243144832",
  //   "body": PlantillaMensaje
  // }, {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   }
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });


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
    
    console.log('Datos insertados en Supabase Pyme:', data);
    dispatch(enviarDatosCompletado())
    return data
  } catch (error) {
    console.error('Error:', error);
    throw error
  }
})

function mensajeTest(state) {
  return {
    msg: `Alo ${state.name}`
  }
}

export const enviarMensajeTest = createAsyncThunk(
  "preRegistro/enviarMensajeTest",
  async (_, { getState }) => {
    const state = getState()
    const datosFormulario = state.preRegistro

    const mensaje = mensajeTest(datosFormulario)

    try {
      const response = await axios.post(
        'https://api.ultramsg.com/instance87810/messages/chat',
        {
          token: 'rzqp54nn0tucqspv',
          to: `+58${datosFormulario.phone}`,
          body: mensaje.msg
        }
      )
      console.log('Respuesta:', response.data);
    } catch (error) {
      console.error('Error al enviar:', error)
      throw error
    }
  }
)


  // ENVIAR A OZMAP
  // axios.post('https://sandbox.ozmap.com.br:9994/api/v2/prospects', {
  //   "tags": [
  //     "638a088b25360200206c0750"
  //   ],
  //   "name": NOMBRE + APELLIDO,
  //   "coords": [
  //     LONGITUD,
  //     LATITUD
  //   ],
  //   "address": DIRECCION_FISCAL,
  //   "observation": NUMERODETELEFONO + NOMBREVENDEDOR
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

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
        state.municipality = ''
        state.parish = ''
        state.neighborhood = ''
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

export const { actualizarDatos, retrocederPaso, enviarDatosCompletado, cambiarTipoCliente, actualizarDatosPyme } = preRegistroSlice.actions;
export default preRegistroSlice.reducer;
