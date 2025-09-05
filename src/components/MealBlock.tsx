import React from 'react';
import { Dish } from '../types';
import DishRow from './DishRow';

interface MealBlockProps {
  meal: string;
  dishes: Dish[];
  recipes: string[];
  removeMealLabel: string;
  onRemoveMeal: () => void;
  onDishChange: (idx: number, value: string) => void;
  onPortionChange: (idx: number, value: number) => void;
  onAddDish: () => void;
  onRemoveDish: (idx: number) => void;
}

const MealBlock: React.FC<MealBlockProps> = ({
  meal,
  dishes,
  recipes,
  removeMealLabel,
  onRemoveMeal,
  onDishChange,
  onPortionChange,
  onAddDish,
  onRemoveDish,
}) => (
  <div className="meal-block">
    <div className="meal-header">
      <span className="meal-label">{meal}</span>
      <button aria-label={removeMealLabel} onClick={onRemoveMeal}>×</button>
    </div>
    {dishes.map((dish, idx) => (
      <DishRow
        key={idx}
        dish={dish}
        recipes={recipes}
        removeLabel={`remove ${meal} dish`}
        onNameChange={value => onDishChange(idx, value)}
        onPortionChange={value => onPortionChange(idx, value)}
        onRemove={() => onRemoveDish(idx)}
      />
    ))}
    <button className="add-dish" onClick={onAddDish}>+</button>
  </div>
);

export default MealBlock;
