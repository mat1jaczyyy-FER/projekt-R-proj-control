import React from 'react';
const Projekt = ({projekt, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }

    return (
        <div class='todobox' id={projekt.id} key={projekt.id + projekt.task} name="mojprojekt" value={projekt.id} onClick={handleClick} className={projekt.complete ? "todo strike" : "todo"}>
            {projekt.task}
        </div>
    );
};

export default Projekt;