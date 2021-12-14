import React from 'react';
import Projekt from './Projekt';

const ProjektList = ({projektList, handleToggle, handleFilter}) => {
    return (
        <div className='form-box'>
            <h1> ---------------------------------- </h1>
            {projektList.map(projekt => {
                return (
                    <Projekt projekt={projekt} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            <h1> ---------------------------------- </h1>
            <button className='anew btn btn-2 navlinkother btn-noborder' onClick={handleFilter}>Obriši projekte</button>
            <h1> ---------------------------------- </h1>
        </div>
    );
};

export default ProjektList;