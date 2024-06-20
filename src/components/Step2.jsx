import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actualizarDatos, enviarDatos } from '../features/preRegistro/preRegistroSlice';

function Step2() {
  const dispatch = useDispatch();
  const { name, email, address_r, last_name, gender } = useSelector((state) => state.preRegistro);

  const [direccionInput, setDireccionInput] = useState(address_r);
  const [ciudadInput, setCiudadInput] = useState(last_name);
  const [paisInput, setPaisInput] = useState(gender);

  const handleEnviar = () => {
    const datosFormulario = { name, email, address_r: direccionInput, last_name: ciudadInput, gender: paisInput };
    dispatch(enviarDatos(datosFormulario)); 
  };

  return (
    <div>
      <h2>Paso 2: Dirección</h2>
      <div>
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          id="address_r"
          value={direccionInput}
          onChange={(e) => setDireccionInput(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          type="text"
          id="last_name"
          value={ciudadInput}
          onChange={(e) => setCiudadInput(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pais">País:</label>
        <input
          type="text"
          id="gender"
          value={paisInput}
          onChange={(e) => setPaisInput(e.target.value)}
        />
      </div>
      <button onClick={handleEnviar}>Enviar</button>
    </div>
  );
}

export default Step2;
