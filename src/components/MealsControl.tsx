import React from 'react';

interface MealsControlProps {
  meals: string[];
  onRemove: (meal: string) => void;
  onAdd: () => void;
}

const MealsControl: React.FC<MealsControlProps> = ({ meals, onRemove, onAdd }) => (
  <div className="meals-control">
    {meals.map(m => (
      <span key={m} className="meal-chip">
        {m}
        <button aria-label={`remove ${m}`} onClick={() => onRemove(m)}>×</button>
      </span>
    ))}
    <button className="add-meal" onClick={onAdd}>Add Meal</button>
  </div>
);

export default MealsControl;
