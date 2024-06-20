import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actualizarDatos } from '../features/preRegistro/preRegistroSlice';
import supabase from '../supabase/config';

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
    <div>
      <h2>Seleccione su Plan Ideal</h2>

      <div>
        {plans.map((plan) => (
          <label key={plan.id_plan}>
            <input
              type="radio"
              name="plan"
              value={plan.id_plan}
              checked={selectedPlan === plan.id_plan}
              onChange={() => setSelectedPlan(plan.id_plan)}
            />
            {plan.name_plan} - ${plan.price}
          </label>
        ))}
      </div>
    </div>
  );
}

export default PlansSelector;
