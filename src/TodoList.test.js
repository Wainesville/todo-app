import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

// Smoke Test
test('TodoList renders without crashing', () => {
  render(<TodoList />);
});

// Snapshot Test
test('TodoList matches snapshot', () => {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

// Business Logic Tests
test('can add a new todo', () => {
  const { getByLabelText, getByText, queryByText } = render(<TodoList />);
  
  // Initially, no todo should be present
  expect(queryByText('Test Task')).not.toBeInTheDocument();

  // Add a new todo
  const input = getByLabelText('New Todo:');
  fireEvent.change(input, { target: { value: 'Test Task' } });
  fireEvent.click(getByText('Add Todo'));

  // The new todo should be in the document
  expect(getByText('Test Task')).toBeInTheDocument();
});

test('can remove a todo', () => {
  const { getByLabelText, getByText, queryByText } = render(<TodoList />);
  
  // Add a new todo
  const input = getByLabelText('New Todo:');
  fireEvent.change(input, { target: { value: 'Test Task' } });
  fireEvent.click(getByText('Add Todo'));

  // The new todo should be in the document
  expect(getByText('Test Task')).toBeInTheDocument();

  // Remove the todo
  fireEvent.click(getByText('X'));

  // The todo should no longer be in the document
  expect(queryByText('Test Task')).not.toBeInTheDocument();
});
