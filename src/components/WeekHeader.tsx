import React from 'react';

interface WeekHeaderProps {
  week: number;
  weekStart: Date;
  weekEnd: Date;
  onPrev: () => void;
  onNext: () => void;
}

const format = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

const WeekHeader: React.FC<WeekHeaderProps> = ({ week, weekStart, weekEnd, onPrev, onNext }) => (
  <div className="week-header">
    <button aria-label="Previous week" onClick={onPrev} disabled={week === 0}>
      &lsaquo;
    </button>
    <h1>Week {week + 1}: {format(weekStart)} - {format(weekEnd)}</h1>
    <button aria-label="Next week" onClick={onNext}>
      &rsaquo;
    </button>
  </div>
);

export default WeekHeader;
