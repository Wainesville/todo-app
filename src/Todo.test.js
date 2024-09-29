import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

// Smoke Test
test('Todo renders without crashing', () => {
  render(<Todo task="Sample task" />);
});

// Snapshot Test
test('Todo matches snapshot', () => {
  const { asFragment } = render(<Todo task="Sample task" />);
  expect(asFragment()).toMatchSnapshot();
});

// Business Logic Test
test('can edit a todo', () => {
  const editTodo = jest.fn();
  const { getByText, getByDisplayValue } = render(
    <Todo id={1} task="Test Task" editTodo={editTodo} removeTodo={() => {}} />
  );

  // Enter edit mode
  fireEvent.click(getByText('Edit'));

  // Change the input value
  const input = getByDisplayValue('Test Task');
  fireEvent.change(input, { target: { value: 'Updated Task' } });

  // Save the new task
  fireEvent.click(getByText('Save'));

  // The editTodo function should be called with the updated task
  expect(editTodo).toHaveBeenCalledWith(1, 'Updated Task');
});
