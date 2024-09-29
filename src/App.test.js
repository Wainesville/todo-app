import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Smoke Test
test('App renders without crashing', () => {
  render(<App />);
});

// Snapshot Test
test('App matches snapshot', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
