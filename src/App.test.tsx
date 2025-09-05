import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weekly menu heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /weekly menu/i });
  expect(heading).toBeInTheDocument();
});
