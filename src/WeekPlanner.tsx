import React, { useEffect, useState } from 'react';
import './WeekPlanner.css';

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const recipes = ['Omelette','Salad','Soup','Steak'];

interface Dish {
  name: string;
  portions: number;
}

type Plan = Record<string, Record<string, Dish[]>>; // day -> meal -> dishes

const WeekPlanner: React.FC = () => {
  const [meals, setMeals] = useState<string[]>(['Breakfast','Lunch','Dinner']);

  const createEmptyPlan = (): Plan => {
    return Object.fromEntries(
      days.map(d => [d, Object.fromEntries(meals.map(m => [m, [{ name: '', portions: 1 }]]))])
    ) as Plan;
  };

  const [plans, setPlans] = useState<Record<number, Plan>>({0: createEmptyPlan()});
  const [week, setWeek] = useState(0);
  const [startDate] = useState<Date>(() => {
    const stored = localStorage.getItem('startDate');
    if (stored) return new Date(stored);
    const today = new Date();
    const monday = new Date(today);
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day; // make Monday first
    monday.setDate(today.getDate() + diff);
    localStorage.setItem('startDate', monday.toISOString());
    return monday;
  });

  useEffect(() => {
    setPlans(prev => {
      if (prev[week]) return prev;
      return { ...prev, [week]: createEmptyPlan() };
    });
  }, [week, meals]);

  const plan = plans[week] || createEmptyPlan();

  const handleDishChange = (day: string, meal: string, idx: number, value: string) => {
    setPlans(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [day]: {
          ...prev[week][day],
          [meal]: prev[week][day][meal].map((v, i) => i === idx ? { ...v, name: value } : v)
        }
      }
    }));
  };

  const handlePortionChange = (day: string, meal: string, idx: number, value: number) => {
    setPlans(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [day]: {
          ...prev[week][day],
          [meal]: prev[week][day][meal].map((v, i) => i === idx ? { ...v, portions: value } : v)
        }
      }
    }));
  };

  const addDish = (day: string, meal: string) => {
    setPlans(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [day]: {
          ...prev[week][day],
          [meal]: [...prev[week][day][meal], { name: '', portions: 1 }]
        }
      }
    }));
  };

  const removeDish = (day: string, meal: string, idx: number) => {
    setPlans(prev => {
      const updatedMeal = prev[week][day][meal].filter((_, i) => i !== idx);
      return {
        ...prev,
        [week]: {
          ...prev[week],
          [day]: {
            ...prev[week][day],
            [meal]: updatedMeal.length ? updatedMeal : [{ name: '', portions: 1 }]
          }
        }
      };
    });
  };

  const addMeal = () => {
    const name = prompt('Meal name?');
    if (name && !meals.includes(name)) {
      setMeals([...meals, name]);
      setPlans(prev => {
        const updated = { ...prev };
        Object.values(updated).forEach(weekPlan => {
          days.forEach(day => {
            weekPlan[day][name] = [''];
          });
        });
        return updated;
      });
    }
  };

  const removeMeal = (meal: string) => {
    setMeals(meals.filter(m => m !== meal));
    setPlans(prev => {
      const updated = { ...prev };
      Object.values(updated).forEach(weekPlan => {
        days.forEach(day => {
          delete weekPlan[day][meal];
        });
      });
      return updated;
    });
  };

  const addMealToDay = (day: string) => {
    const name = prompt('Meal name?');
    if (!name || plan[day][name]) return;
    setPlans(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [day]: {
          ...prev[week][day],
          [name]: [{ name: '', portions: 1 }]
        }
      }
    }));
  };

  const removeMealFromDay = (day: string, meal: string) => {
    setPlans(prev => {
      const { [meal]: _, ...rest } = prev[week][day];
      return {
        ...prev,
        [week]: {
          ...prev[week],
          [day]: rest
        }
      };
    });
  };

  const weekStart = new Date(startDate);
  weekStart.setDate(weekStart.getDate() + week * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const format = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const today = new Date();
  const currentWeek = Math.floor((today.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const currentDayName = days[(today.getDay() + 6) % 7];

  return (
    <div className="WeekPlanner">
      <div className="week-header">
        <button aria-label="Previous week" onClick={() => setWeek(w => w - 1)} disabled={week === 0}>
          &lsaquo;
        </button>
        <h1>Week {week + 1}: {format(weekStart)} - {format(weekEnd)}</h1>
        <button aria-label="Next week" onClick={() => setWeek(w => w + 1)}>
          &rsaquo;
        </button>
      </div>

      <div className="meals-control">
        {meals.map(m => (
          <span key={m} className="meal-chip">
            {m}
            <button aria-label={`remove ${m}`} onClick={() => removeMeal(m)}>×</button>
          </span>
        ))}
        <button className="add-meal" onClick={addMeal}>Add Meal</button>
      </div>

      {days.map(day => {
        const dayMeals = Object.keys(plan[day] || {});
        return (
          <div key={day} className={`day-card ${day === currentDayName && week === currentWeek ? 'today' : ''}`}>
            <h2>{day}</h2>
            {dayMeals.map(meal => (
              <div key={meal} className="meal-block">
                <div className="meal-header">
                  <span className="meal-label">{meal}</span>
                  <button aria-label={`remove ${meal} on ${day}`} onClick={() => removeMealFromDay(day, meal)}>×</button>
                </div>
                {plan[day][meal].map((dish, idx) => (
                  <div key={idx} className="dish-row">
                    <select
                      value={dish.name}
                      onChange={e => handleDishChange(day, meal, idx, e.target.value)}
                    >
                      <option value="">Select dish</option>
                      {recipes.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={1}
                      className="portion-input"
                      aria-label="portions"
                      value={dish.portions}
                      onChange={e => handlePortionChange(day, meal, idx, parseInt(e.target.value) || 1)}
                    />
                    <button
                      className="remove-dish"
                      aria-label={`remove ${meal} dish`}
                      onClick={() => removeDish(day, meal, idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button className="add-dish" onClick={() => addDish(day, meal)}>+</button>
              </div>
            ))}
            <button className="add-meal-day" aria-label={`add meal for ${day}`} onClick={() => addMealToDay(day)}>Add Meal</button>
          </div>
        );
      })}
    </div>
  );
};

export default WeekPlanner;
