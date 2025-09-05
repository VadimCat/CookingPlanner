import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders week heading and navigates', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /week 1/i });
  expect(heading).toBeInTheDocument();

  const next = screen.getByRole('button', { name: /next week/i });
  fireEvent.click(next);
  const heading2 = screen.getByRole('heading', { name: /week 2/i });
  expect(heading2).toBeInTheDocument();
});

test('meal labels, remove dish and highlight current day', () => {
  render(<App />);

  const breakfastLabels = screen.getAllByText('Breakfast');
  expect(breakfastLabels.length).toBeGreaterThan(1);

  const addButtons = screen.getAllByText('+');
  fireEvent.click(addButtons[0]);
  let selects = screen.getAllByRole('combobox');
  expect(selects.length).toBe(22);

  const removeButtons = screen.getAllByLabelText(/remove Breakfast dish/i);
  fireEvent.click(removeButtons[0]);
  selects = screen.getAllByRole('combobox');
  expect(selects.length).toBe(21);

  const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const todayName = dayNames[(new Date().getDay() + 6) % 7];
  const todayHeading = screen.getByRole('heading', { name: todayName });
  expect(todayHeading.parentElement).toHaveClass('today');
});
