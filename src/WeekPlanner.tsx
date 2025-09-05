import React, { useEffect, useState } from 'react';
import './WeekPlanner.css';
import WeekHeader from './components/WeekHeader';
import MealsControl from './components/MealsControl';
import DayCard from './components/DayCard';
import { MealEntry } from './Models/plan';
import { Recipe } from './Models/recipe';

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const recipes: Recipe[] = [
  { id: '1', title: 'Omelette', servings: 1, ingredients: [], createdAt: '', updatedAt: '' },
  { id: '2', title: 'Salad', servings: 1, ingredients: [], createdAt: '', updatedAt: '' },
  { id: '3', title: 'Soup', servings: 1, ingredients: [], createdAt: '', updatedAt: '' },
  { id: '4', title: 'Steak', servings: 1, ingredients: [], createdAt: '', updatedAt: '' },
];

const defaultMeals = ['Breakfast','Lunch','Dinner'];

const WeekPlanner: React.FC = () => {
  const [mealsByWeek, setMealsByWeek] = useState<Record<number, string[]>>({0: defaultMeals});

  type Plan = Record<string, Record<string, MealEntry[]>>;

  const createEmptyPlan = (mealsList: string[]): Plan => {
    return Object.fromEntries(
      days.map(d => [d, Object.fromEntries(mealsList.map(m => [m, [{ recipeId: '', servings: 1 }]]))])
    ) as Plan;
  };

  const [plans, setPlans] = useState<Record<number, Plan>>({0: createEmptyPlan(defaultMeals)});
  const [week, setWeek] = useState(0);
  const [startDate] = useState<Date>(() => {
    const stored = localStorage.getItem('startDate');
    if (stored) return new Date(stored);
    const today = new Date();
    const monday = new Date(today);
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    monday.setDate(today.getDate() + diff);
    localStorage.setItem('startDate', monday.toISOString());
    return monday;
  });

  useEffect(() => {
    setPlans(prev => {
      if (prev[week]) return prev;
      const mealsList = mealsByWeek[week] || defaultMeals;
      return { ...prev, [week]: createEmptyPlan(mealsList) };
    });
    setMealsByWeek(prev => {
      if (prev[week]) return prev;
      return { ...prev, [week]: mealsByWeek[0] || defaultMeals };
    });
  }, [week, mealsByWeek]);

  const meals = mealsByWeek[week] || defaultMeals;
  const plan = plans[week] || createEmptyPlan(meals);

  const handleRecipeChange = (day: string, meal: string, idx: number, value: string) => {
    setPlans(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        [day]: {
          ...prev[week][day],
          [meal]: prev[week][day][meal].map((v, i) => i === idx ? { ...v, recipeId: value } : v)
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
          [meal]: prev[week][day][meal].map((v, i) => i === idx ? { ...v, servings: value } : v)
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
          [meal]: [...prev[week][day][meal], { recipeId: '', servings: 1 }]
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
            [meal]: updatedMeal.length ? updatedMeal : [{ recipeId: '', servings: 1 }]
          }
        }
      };
    });
  };

  const addMeal = () => {
    const name = prompt('Meal name?');
    if (name && !meals.includes(name)) {
      setMealsByWeek(prev => ({ ...prev, [week]: [...meals, name] }));
      setPlans(prev => ({
        ...prev,
        [week]: days.reduce((acc, day) => ({
          ...acc,
          [day]: { ...prev[week][day], [name]: [{ recipeId: '', servings: 1 }] }
        }), {} as Record<string, Record<string, MealEntry[]>>)
      }));
    }
  };

  const removeMeal = (meal: string) => {
    setMealsByWeek(prev => ({ ...prev, [week]: prev[week].filter(m => m !== meal) }));
    setPlans(prev => ({
      ...prev,
      [week]: days.reduce((acc, day) => {
        const { [meal]: _, ...rest } = prev[week][day];
        return { ...acc, [day]: rest };
      }, {} as Record<string, Record<string, MealEntry[]>>)
    }));
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
          [name]: [{ recipeId: '', servings: 1 }]
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
  const today = new Date();
  const currentWeek = Math.floor((today.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  const currentDayName = days[(today.getDay() + 6) % 7];

  return (
    <div className="WeekPlanner">
      <WeekHeader
        week={week}
        weekStart={weekStart}
        weekEnd={weekEnd}
        onPrev={() => setWeek(w => w - 1)}
        onNext={() => setWeek(w => w + 1)}
      />

      <MealsControl meals={meals} onRemove={removeMeal} onAdd={addMeal} />

      {days.map(day => (
        <DayCard
          key={day}
          day={day}
          meals={plan[day] || {}}
          recipes={recipes}
          isToday={day === currentDayName && week === currentWeek}
          onRecipeChange={(meal, idx, value) => handleRecipeChange(day, meal, idx, value)}
          onPortionChange={(meal, idx, value) => handlePortionChange(day, meal, idx, value)}
          onAddDish={meal => addDish(day, meal)}
          onRemoveDish={(meal, idx) => removeDish(day, meal, idx)}
          onAddMeal={() => addMealToDay(day)}
          onRemoveMeal={meal => removeMealFromDay(day, meal)}
        />
      ))}
    </div>
  );
};

export default WeekPlanner;
