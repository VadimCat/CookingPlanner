import React, { useState } from 'react';

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const meals = ['Breakfast','Lunch','Dinner'];
const recipes = ['Omelette','Salad','Soup','Steak'];

type Plan = Record<string, Record<string, string>>;

const createEmptyPlan = (): Plan => {
  return Object.fromEntries(
    days.map(d => [d, Object.fromEntries(meals.map(m => [m, '']))])
  ) as Plan;
};

const WeekPlanner: React.FC = () => {
  const [plan, setPlan] = useState<Plan>(createEmptyPlan());

  const handleChange = (day: string, meal: string, value: string) => {
    setPlan(prev => ({
      ...prev,
      [day]: { ...prev[day], [meal]: value }
    }));
  };

  return (
    <div>
      <h1>Weekly Menu</h1>
      {days.map(day => (
        <div key={day}>
          <h2>{day}</h2>
          {meals.map(meal => (
            <select
              key={meal}
              value={plan[day][meal]}
              onChange={e => handleChange(day, meal, e.target.value)}
            >
              <option value="">Select dish</option>
              {recipes.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WeekPlanner;
