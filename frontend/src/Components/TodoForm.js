import React, { useState, useEffect } from 'react';

const TodoForm = ({ onAdd, onUpdate, selectedTodo }) => {
  const [task, setTask] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setTask(selectedTodo.task);
    }
  }, [selectedTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTodo) {
      onUpdate(selectedTodo._id, task);
    } else {
      onAdd(task);
    }
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task" />
      <button type="submit">{selectedTodo ? "Update" : "Add"}</button>
    </form>
  );
};

export default TodoForm;
