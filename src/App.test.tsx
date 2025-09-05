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
