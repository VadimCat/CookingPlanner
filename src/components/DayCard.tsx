import React from 'react';
import { MealEntry } from '../Models/plan';
import { Recipe } from '../Models/recipe';
import MealBlock from './MealBlock';

interface DayCardProps {
  day: string;
  meals: Record<string, MealEntry[]>;
  recipes: Recipe[];
  isToday: boolean;
  onRecipeChange: (meal: string, idx: number, value: string) => void;
  onPortionChange: (meal: string, idx: number, value: number) => void;
  onAddDish: (meal: string) => void;
  onRemoveDish: (meal: string, idx: number) => void;
  onAddMeal: () => void;
  onRemoveMeal: (meal: string) => void;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  meals,
  recipes,
  isToday,
  onRecipeChange,
  onPortionChange,
  onAddDish,
  onRemoveDish,
  onAddMeal,
  onRemoveMeal,
}) => {
  const mealNames = Object.keys(meals);
  return (
    <div className={`day-card ${isToday ? 'today' : ''}`}>
      <h2>{day}</h2>
      {mealNames.map(meal => (
        <MealBlock
          key={meal}
          meal={meal}
          dishes={meals[meal]}
          recipes={recipes}
          removeMealLabel={`remove ${meal} on ${day}`}
          onRemoveMeal={() => onRemoveMeal(meal)}
          onRecipeChange={(idx, value) => onRecipeChange(meal, idx, value)}
          onPortionChange={(idx, value) => onPortionChange(meal, idx, value)}
          onAddDish={() => onAddDish(meal)}
          onRemoveDish={idx => onRemoveDish(meal, idx)}
        />
      ))}
      <button
        className="add-meal-day"
        aria-label={`add meal for ${day}`}
        onClick={onAddMeal}
      >
        Add Meal
      </button>
    </div>
  );
};

export default DayCard;
