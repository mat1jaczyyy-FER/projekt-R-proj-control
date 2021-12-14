import React from 'react';
const Projekt = ({projekt, handleToggle}) => {

    const handleClick = (e) => {
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }
    const clicked = (e) =>{
        e.preventDefault();
        window.location.href='./todo';
        
    }

    return (
        <><><div class='resetpassbox' id={projekt.id} key={projekt.id + projekt.task} name="mojprojekt" value={projekt.id} onClick={handleClick} className={projekt.complete ? "todo strike" : "todo"}>
            {projekt.task}
        </div>
            <button className='btn-buy' onClick={clicked}>To do list</button></>
            <h1>     </h1></>
    );
};

export default Projekt;