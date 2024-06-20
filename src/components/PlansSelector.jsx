import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actualizarDatos } from '../features/preRegistro/preRegistroSlice';
import supabase from '../supabase/config';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';

function PlansSelector() {
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('id_plan, name_plan, price');

      if (error) {
        console.error('Error fetching plans:', error);
      } else {
        setPlans(data);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    dispatch(actualizarDatos({ plan: selectedPlan }));
  }, [selectedPlan, dispatch]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Seleccione su Plan Ideal
      </Typography>
      <FormControl component="fieldset" sx={{ width: '100%'}}>
        <FormLabel component="legend">Planes 'Din</FormLabel>
        <RadioGroup
          aria-label="planes"
          name="plan"
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          {plans.map((plan) => (
            <FormControlLabel
              key={plan.id_plan}
              value={plan.id_plan}
              control={<Radio />}
              label={`${plan.name_plan} - $${plan.price}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default PlansSelector;
