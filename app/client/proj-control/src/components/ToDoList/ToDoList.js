import React from 'react';
import ToDo from './ToDo';

const ToDoList = ({toDoList, handleToggle, handleFilter}) => {
    return (
        <div className='form-box'>
            <h1> ---------------------------------- </h1>
            {toDoList.map(todo => {
                return (
                    <ToDo todo={todo} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            <h1> ---------------------------------- </h1>
            <button className='anew btn btn-2 navlinkother btn-noborder' onClick={handleFilter}>Obriši zadatke</button>
            <h1> ---------------------------------- </h1>
        </div>
    );
};

export default ToDoList;