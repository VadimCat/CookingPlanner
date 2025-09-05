import React from 'react';
import { MealEntry } from '../Models/plan';
import { Recipe } from '../Models/recipe';
import DishRow from './DishRow';

interface MealBlockProps {
  meal: string;
  dishes: MealEntry[];
  recipes: Recipe[];
  removeMealLabel: string;
  onRemoveMeal: () => void;
  onRecipeChange: (idx: number, value: string) => void;
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
  onRecipeChange,
  onPortionChange,
  onAddDish,
  onRemoveDish,
}) => (
  <div className="meal-block">
    <div className="meal-header">
      <span className="meal-label">{meal}</span>
      <button aria-label={removeMealLabel} onClick={onRemoveMeal}>×</button>
    </div>
    {dishes.map((entry, idx) => (
      <DishRow
        key={idx}
        entry={entry}
        recipes={recipes}
        removeLabel={`remove ${meal} dish`}
        onRecipeChange={value => onRecipeChange(idx, value)}
        onPortionChange={value => onPortionChange(idx, value)}
        onRemove={() => onRemoveDish(idx)}
      />
    ))}
    <button className="add-dish" onClick={onAddDish}>+</button>
  </div>
);

export default MealBlock;
