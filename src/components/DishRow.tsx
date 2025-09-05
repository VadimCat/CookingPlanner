import React from 'react';
import { MealEntry } from '../Models/plan';
import { Recipe } from '../Models/recipe';

interface DishRowProps {
  entry: MealEntry;
  recipes: Recipe[];
  removeLabel: string;
  onRecipeChange: (value: string) => void;
  onPortionChange: (value: number) => void;
  onRemove: () => void;
}

const DishRow: React.FC<DishRowProps> = ({ entry, recipes, removeLabel, onRecipeChange, onPortionChange, onRemove }) => (
  <div className="dish-row">
    <select value={entry.recipeId} onChange={e => onRecipeChange(e.target.value)}>
      <option value="">Select dish</option>
      {recipes.map(r => (
        <option key={r.id} value={r.id}>{r.title}</option>
      ))}
    </select>
    <input
      type="number"
      min={1}
      className="portion-input"
      aria-label="portions"
      value={entry.servings}
      onChange={e => onPortionChange(parseInt(e.target.value) || 1)}
    />
    <button
      className="remove-dish"
      aria-label={removeLabel}
      onClick={onRemove}
    >
      ×
    </button>
  </div>
);

export default DishRow;
