import React, { useState } from 'react';
//mock data
import data from "./data";
//components
import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';

function ToDoApp() {
  
  const [ toDoList, setToDoList ] = useState(data);

  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    setToDoList(mapped);
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    setToDoList(filtered);
  }

  const addTask = (userInput ) => {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, task: userInput, complete: false }];
    setToDoList(copy);
  }

  return (
    <div className='signIN'>
    <div className = 'login-naslov'>
        <h1>TO DO LISTA </h1>
        <p>Popis zadataka:</p>
    </div>
    <div className="ToDoApp" >
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
      <ToDoForm addTask={addTask}/>
    </div>
    </div>
  );
}

export default ToDoApp;