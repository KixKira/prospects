import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actualizarDatos } from '../features/preRegistro/preRegistroSlice';
import supabase from '../supabase/config';


function LocationForm() {
  const dispatch = useDispatch();
  const [selectedState, setSelectedState] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [parish, setParish] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [type_house, setType_house] = useState('');
  const [vendor, setVendor] = useState('');
  const [address_r, setAddress_r] = useState('');
  const [address_b, setAddress_b] = useState('');

  const [states, setStates] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [typesHouses, setTypesHouses] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const { data, error } = await supabase.from('states').select('*');

      if (error) console.error('Error fetching states:', error);
      else setStates(data);
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (selectedState) { 
        const { data, error } = await supabase
          .from('municipalities')
          .select('*')
          .eq('id_state', selectedState); 

        if (error) console.error('Error fetching municipalities:', error);

        else setMunicipalities(data);
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
    selectedState, municipality, parish, neighborhood, type_house, 
    vendor, address_r, address_b, dispatch
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
    <div>
      <h2>Información Residencial</h2>
      <div>
        <label htmlFor="state">Seleccione un Estado:</label>
        <select id="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          {states.map((state) => (
            <option key={state.id_state} value={state.id_state}>
              {state.name_state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="municipality">Seleccione un Municipio:</label>
        <select id="municipality" value={municipality} onChange={(e) => setMunicipality(e.target.value)}>
          {municipalities.map((municipality) => (
            <option key={municipality.id_municipality} value={municipality.id_municipality}>
              {municipality.name_municipality}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="parish">Seleccione una Parroquia:</label>
        <select id="parish" value={parish} onChange={(e) => setParish(e.target.value)}>
          {parishes.map((parish) => (
            <option key={parish.id_parish} value={parish.id_parish}>
              {parish.name_parish}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="neighborhood">Seleccione un Sector:</label>
        <select id="neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}>
          {neighborhoods.map((neighborhood) => (
            <option key={neighborhood.id_neighborhood} value={neighborhood.id_neighborhood}>
              {neighborhood.name_neighborhood}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="type_house">Seleccione un Tipo de Residencia:</label>
        <select id="type_house" value={type_house} onChange={(e) => setType_house(e.target.value)}>
          {typesHouses.map((type_house) => (
            <option key={type_house.id_type_house} value={type_house.id_type_house}>
              {type_house.name_type_house}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="vendor">Seleccione un Vendedor:</label>
        <select id="vendor" value={vendor} onChange={(e) => setVendor(e.target.value)}>
          {vendors.map((vendor) => (
            <option key={vendor.id_vendor} value={vendor.id_vendor}>
              {vendor.name_vendor}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="address_r">Dirección de Residencia</label>
        <input
          type="text"
          id="address_r"
          value={address_r}
          onChange={(e) => setAddress_r(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address_b">Dirección Fiscal</label>
        <input
          type="text"
          id="address_b"
          value={address_b}
          onChange={(e) => setAddress_b(e.target.value)}
        />
      </div>
      {/* <button onClick={handleSiguiente}>Siguiente</button> */}
    </div>
  );
}

export default LocationForm;
