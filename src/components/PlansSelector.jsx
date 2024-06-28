import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Card, 
  CardContent, 
  FormControl, 
  FormControlLabel, 
  FormHelperText, 
  FormLabel, 
  Radio, 
  RadioGroup, 
  Typography 
} from '@mui/material';
import { actualizarDatos } from '../features/preRegistro/preRegistroSlice';
import supabase from '../supabase/config';

function PlansSelector({ errors }) {
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);

  const isPyme = useSelector((state) => state.preRegistro.isPyme)

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from('plans')
        .select('id_plan, name_plan, price')
        .eq('client_type_plan', isPyme ? 'business' : 'residential')

      if (error) {
        console.error('Error fetching plans:', error);
      } else {
        setPlans(data);
      }
    };

    fetchPlans();
  }, [isPyme]);

  useEffect(() => {
    dispatch(actualizarDatos({ plan: selectedPlan }));
  }, [selectedPlan, dispatch]);

  const handlePlanClick = (planId) => {
    setSelectedPlan(planId)
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontFamily: 'Montserrat' }}>
        Seleccione su Plan Ideal
      </Typography>
      <FormControl component="fieldset" sx={{ width: '100%'}}>
        <FormLabel component="legend" sx={{ fontFamily: 'Montserrat' }}>{isPyme ? 'Planes PYME' : 'Planes Residenciales'}</FormLabel>
        <FormHelperText error>{errors.plan}</FormHelperText>
        <RadioGroup
          aria-label="planes"
          name="plan"
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 2fr))',
            gap: 2
          }}
        >
          {plans.map((plan) => (
            <FormControlLabel
              key={plan.id_plan}
              value={plan.id_plan}
              control={<Radio sx={{ display: 'none'}} />}
              label={
                <Card
                  onClick={() => handlePlanClick(plan.id_plan)}
                  sx={{
                    width: '100%',
                    minWidth: 250,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    border: selectedPlan === plan.id_plan ? '2px solid #007BFF' : '1px solid #004e74',
                    borderRadius: 2,
                    boxShadow: selectedPlan === plan.id_plan ? 3 : 2,
                    backgroundColor: selectedPlan === plan.id_plan ? '#e0f2ff' : '#fff',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                    '&:hover': {
                      boxShadow: 3,
                      backgroundColor: '#e4eaf0'
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant='h6'>{plan.name_plan}</Typography>
                  </CardContent>
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    ${plan.price}
                  </Typography>
                </Card>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default PlansSelector;
