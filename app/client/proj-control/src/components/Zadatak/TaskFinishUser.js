import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {withRouter, useHistory, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

const TaskFinishUser = () => {

    let history = useHistory(); 
    const idzadatka = useParams().id;

    const[zadatak, setZadatak] = useState([]);



    const getZadatak = async idzadatka => {
        try {       
                const response = await fetch(
                    `http://localhost:5000/task/${idzadatka}`,
                {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Content-type": "application/json"
                  },
                  
                }
            );
            const jsonData = await response.json();
            console.log(jsonData[0]);

            setZadatak(jsonData[0]);
            
        } catch (err) {
            console.error(err.message);
            
        }
    }

    useEffect(() => {
        getZadatak(idzadatka);
      }, []);

      const onSubmitForm = async e => {
        e.preventDefault();
        var body = null
        var d = new Date();
        const datum = d.toISOString().split('T')[0]
        console.log(d.toISOString().split('T')[0])
       

        try {
            const body = {

                brSati: zadatak.brsati,
                budzet: zadatak.budzet,
                datKraj: datum,
                datPoc: zadatak.datpoc,
                idPrioriteta: zadatak.idprioriteta,
                idProjekta: zadatak.idprojekta,
                idStatusa: 3,
                idVrste: zadatak.idvrste,            
                opisZadatka: zadatak.opiszadatka,
                planBrSati: zadatak.planbrsati,
                planBudzet: zadatak.planbudzet,
                planDatKraj: zadatak.plandatkraj,
                planDatPoc: zadatak.plandatpoc          
            }
            console.log(body)
          const response = await fetch(
            `http://localhost:5000/task/update/${idzadatka}`,
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
    
          const parseRes = await response.json();
          console.log(parseRes);
    
          if (response.status === 200) {
            toast.success(`Završen zadatak: ${zadatak.opiszadatka}`);
            history.push("/zadaci");
          } else {
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
          toast.error(`Greška pri završavanju zadatka!`);
        }
      };


    

    return (
        <Fragment>
            <div className='newProject'>
                <div className = 'newProject-naslov'>
                    <h1>Označi zadatak: </h1> 
                    <hr className="dashed"></hr>
                    <div className="card bg-c-custom1 order-card">
                        <h1>{zadatak.opiszadatka}</h1> 
                    </div>
                    
                    <hr className="dashed"></hr>
                    <h1>kao završen?</h1>
                </div>
            <div className = 'card bg-c-custom1 order-card'>
                    <form onSubmit={onSubmitForm} className='formtest'>

                    <button id="završizad" className='anew btn btn-2 navlinkother btn-noborder' type='submit' value="3">Završi zadatak</button>
                    <div className="proj-title">                                        
                            <Link to={`/zadaci/`} className= 'btn-4'>Odustani</Link>
                    </div>    

                        
                    
                    </form>
                </div>
            </div>
        
       </Fragment>
    )


}


export default TaskFinishUser;