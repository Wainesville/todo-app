import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

// Smoke Test
test('NewTodoForm renders without crashing', () => {
  render(<NewTodoForm addTodo={() => {}} />);
});

// Snapshot Test
test('NewTodoForm matches snapshot', () => {
  const { asFragment } = render(<NewTodoForm addTodo={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

// Business Logic Test
test('form adds a new todo when submitted', () => {
  const addTodo = jest.fn();
  const { getByLabelText, getByText } = render(<NewTodoForm addTodo={addTodo} />);
  
  // Simulate user input and form submission
  const input = getByLabelText('New Todo:');
  fireEvent.change(input, { target: { value: 'New Test Todo' } });
  fireEvent.click(getByText('Add Todo'));

  // Ensure the addTodo function was called with the correct task
  expect(addTodo).toHaveBeenCalledWith('New Test Todo');
});

