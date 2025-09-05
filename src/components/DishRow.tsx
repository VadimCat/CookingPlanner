import React from 'react';
import { Dish } from '../types';

interface DishRowProps {
  dish: Dish;
  recipes: string[];
  removeLabel: string;
  onNameChange: (value: string) => void;
  onPortionChange: (value: number) => void;
  onRemove: () => void;
}

const DishRow: React.FC<DishRowProps> = ({ dish, recipes, removeLabel, onNameChange, onPortionChange, onRemove }) => (
  <div className="dish-row">
    <select value={dish.name} onChange={e => onNameChange(e.target.value)}>
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
