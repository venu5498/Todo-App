import React , {useState,useEffect, Component} from 'react';
import axios from 'axios';
import TodoList from './Components/TodoList';
import TodoForm from './Components/TodoForm';

function App(){
  const [todos,setTodos]=useState([]);
  const [selectedTodo,setSelectedtodo]=useState(null);

  const fetchTodos=()=>{
    axios.get('http://localhost:2000/todos')
    .then(res=>setTodos(res.data))
    .catch(err=>console.log(err));
  };

  const addTodo=(task)=>{
    axios.post('http://localhost:2000/addtodos',task,{
       headers:{'Content-Type':'Text/Plain'}
    })
    .then(()=>fetchTodos());
  };

  const deleteTodo=(id)=>{
    axios.delete(`http://localhost:2000/deletetodos/${id}`)
    .then(()=>fetchTodos());
  };

  const updatetodo=(id,newTask)=>{
    axios.put(`http://localhost:2000/updatetodo/${id}`,newTask,{
      headers:{'Content-type':'Text/Plain'}
    })
    .then(()=>{
      setSelectedtodo(null);
      fetchTodos();
    });
  };

  useEffect(()=>{
    fetchTodos();
  },[]);

  return(
    <div>
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} onUpdate={updatetodo} selectedTodo={selectedTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onEdit={setSelectedtodo} />
    </div>
  );
}
export default App;
