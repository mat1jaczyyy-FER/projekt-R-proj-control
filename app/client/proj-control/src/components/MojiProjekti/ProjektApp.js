import React, { useState } from 'react';
//mock data
import data1 from "./data1";
//components
import ProjektList from "./ProjektList";
import ProjektForm from './ProjektForm';

function ProjektApp() {
  
  const [ projektList, setProjektList ] = useState(data1);

  const handleToggle = (id) => {
    let mapped = projektList.map(projekt => {
      return projekt.id === Number(id) ? { ...projekt, complete: !projekt.complete } : { ...projekt};
    });
    setProjektList(mapped);
  }

  const handleFilter = () => {
    let filtered = projektList.filter(projekt => {
      return !projekt.complete;
    });
    setProjektList(filtered);
  }

  const addProjekt = (userInput ) => {
    let copy = [...ProjektList];
    copy = [...copy, { id: projektList.length + 1, task: userInput, complete: false }];
    setProjektList(copy);
  }

  return (
    <div className='signIN'>
    <div className = 'login-naslov'>
        <h1>MOJI PROJEKTI </h1>
        <p>Popis projekti:</p>
    </div>
    <div className="ToDoApp" >
      <ProjektList projektList={projektList} handleToggle={handleToggle} handleFilter={handleFilter}/>
      <ProjektForm addProjekt={addProjekt}/>
    </div>
    </div>
  );
}

export default ProjektApp;