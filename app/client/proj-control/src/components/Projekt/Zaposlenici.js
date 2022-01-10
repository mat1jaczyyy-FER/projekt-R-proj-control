import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BsListTask } from 'react-icons/bs';

const Zaposlenici = () => {

    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    const[zaposleniciData, setZaposleniciData] = useState('');

    const getZaposleniciData = async (projectid) => {
        try {       
                const response = await fetch(
                    `http://localhost:5000/project/getUsersStatistics/${projectid}`,
    
                {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Content-type": "application/json"
                  },
                  
                }
            );
            const jsonData = await response.json();
    
            setZaposleniciData(jsonData);
            
            
        } catch (err) {
            console.error(err.message);
            
        }
    }
    useEffect(() => {
        getZaposleniciData(projectid);
      }, []);


    return (

        <div className="zaposlenici-title"><h1>Pregled rada zaposlenika</h1> 
    
        <div className='svi-projekti'>
             
             
        <Fragment>  
          
               
                  
             {Object.values(zaposleniciData).map((zaposlenik) => {
                 return (     
                     
                    <div class="card bg-c-custom4 order-card ">
                        <div class="card-block">

                            <div className="task-title">                     
                                {zaposlenik.ime} {zaposlenik.prezime}
                            </div>

                            <hr className="dashed"></hr>

                            <div className="task-title2">   
                            <BsListTask size={28} />  Ukupan broj zadataka: {zaposlenik.ukupnoZad}
                            </div>  

                            <div className="task-title2">                     
                            <AiOutlineFileDone  size={28}/>  Ukupan broj odrađenih zadataka: {zaposlenik.obavljenoZad}
                            </div>  

                             

                        </div>                    
                </div>
                                             
                                             
                 )
             })}                                    
            
     </Fragment>
     </div>
     </div>

    )
}

export default Zaposlenici;