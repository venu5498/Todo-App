import React from 'react';

const TodoItem = ({ todo, onDelete, onEdit }) => {
  return (
    <li>
      {todo.task}
      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
