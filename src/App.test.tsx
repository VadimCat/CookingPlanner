import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
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

test('shows settings page when settings tab clicked', () => {
  render(<App />);
  const settingsBtn = screen.getByRole('button', { name: 'Settings' });
  fireEvent.click(settingsBtn);
  expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
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

test('add and remove meal per day and change portions', () => {
  render(<App />);

  const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('Snack');
  const addMealBtn = screen.getByLabelText(/add meal for Monday/i);
  fireEvent.click(addMealBtn);
  expect(screen.getAllByText('Snack').length).toBeGreaterThan(0);

  const removeMealBtn = screen.getByLabelText('remove Breakfast on Monday');
  fireEvent.click(removeMealBtn);
  const mondayCard = screen.getByRole('heading', { name: 'Monday' }).parentElement!;
  expect(within(mondayCard).queryByText('Breakfast')).toBeNull();
  const tuesdayCard = screen.getByRole('heading', { name: 'Tuesday' }).parentElement!;
  expect(within(tuesdayCard).getByText('Breakfast')).toBeInTheDocument();

  promptSpy.mockRestore();

  const portionInputs = screen.getAllByLabelText('portions');
  expect((portionInputs[0] as HTMLInputElement).value).toBe('1');
  fireEvent.change(portionInputs[0], { target: { value: '3' } });
  expect((portionInputs[0] as HTMLInputElement).value).toBe('3');
});

test('removing meal does not affect other weeks', () => {
  render(<App />);
  const removeBreakfast = screen.getByLabelText('remove Breakfast');
  fireEvent.click(removeBreakfast);
  const mondayCard = screen.getByRole('heading', { name: 'Monday' }).parentElement!;
  expect(within(mondayCard).queryByText('Breakfast')).toBeNull();
  const next = screen.getByRole('button', { name: /next week/i });
  fireEvent.click(next);
  const mondayNext = screen.getByRole('heading', { name: 'Monday' }).parentElement!;
  expect(within(mondayNext).getByText('Breakfast')).toBeInTheDocument();
});
