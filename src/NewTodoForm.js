import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

function NewTodoForm({ addTodo }) {
  const [task, setTask] = useState('');

  const handleChange = (evt) => {
    setTask(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (task.trim()) {
      addTodo({ task, id: uuid() });
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">New Todo:</label>
      <input 
        type="text" 
        id="task" 
        name="task" 
        value={task} 
        onChange={handleChange} 
      />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodoForm;
