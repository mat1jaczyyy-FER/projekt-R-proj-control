import React, { useState } from 'react';

const ToDoForm = ({ addTask }) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }
    return (
        <form className='input-item' onSubmit={handleSubmit}>
            <input className="form-control" style={{marginLeft:'auto'},{marginRight:'auto'}} value={userInput} type="text" onChange={handleChange} placeholder="                      Unesi zadatak..."/>
            <h1> ---------------------------------- </h1>
            <button className='anew btn btn-2 navlinkother btn-noborder'>Dodaj zadatak</button>
        </form>
    );
};

export default ToDoForm;