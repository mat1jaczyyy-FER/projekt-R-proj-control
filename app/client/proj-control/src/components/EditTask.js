import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {withRouter, useHistory, useParams} from 'react-router-dom';

import { BsBookmarkCheck } from "react-icons/bs";


const EditTask = () => {

    const idzadatka = useParams().id;
    const projectid = useParams().pid;
    console.log(projectid)
    //const idProjekta = 11;
    let history = useHistory(); 

    const[zadatak, setZadatak] = useState([]);

    const [inputs, setInputs] = useState({
        brojsati: 0       
      });

    const { brojsati } = inputs;
    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });



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
        try {
         const body = {

            brSati: brojsati,
            budzet: zadatak.budzet,
            datKraj: zadatak.datkraj,
            datPoc: zadatak.datpoc,
            idPrioriteta: zadatak.idprioriteta,
            idProjekta: zadatak.idprojekta,
            idStatusa: zadatak.idstatusa,
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
            toast.success('Ažuriran broj sati');
            history.push('/svizadaci/' + projectid );
          } else {
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
          toast.error(`Greška pri ažuriranju broj radnih sati!`);
        }
      };



    return (

        <Fragment>
            <div className='newProject'>
                <div className = 'newProject-naslov'>
                <h1>Unos radnih sati za zadatak</h1>
                
                </div>

                <div class="card bg-c-custom1 order-card">
                        <div class="card-block">
                            <div className="task-title">
                                {zadatak.opiszadatka}
                            </div>

                            <hr className="dashed"></hr>
                            <div className="task-info-box">
                                <div className="task-info">PRIORITET:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                 <div className="task-info" style={zadatak.idprioriteta === 1 ? {color:"green"} : zadatak.idprioriteta === 2 ? {color:"yellow"} : {color:"red"}}>
                                {zadatak.idprioriteta === 1 ? '  ' + 'nizak' : zadatak.idprioriteta === 2 ? ' ' + 'srednji' : '  visok'}
                                </div>
                            </div>

                            <div className="task-info-box">
                                <div className="task-info">PLANIRANI BROJ SATI: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <div className="task-info">{zadatak.planbrsati} h</div>
                            </div>

                            <div className="task-info-box">
                                <div className="task-info">TREUNTNI BROJ RADNIH SATI:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <div className="task-info">{!zadatak.brsati ? 0 : zadatak.brsati} h</div>
                            </div> 

                            <hr className="dashed"></hr>


                            <div className="task-info-box">
                               <form onSubmit={onSubmitForm} >
                               <div  className="task-info">
                                          <span >Novi broj radnih sati </span>
                                          <input                                                
                                                type = 'number'
                                                name = 'brojsati'
                                                value = {brojsati}
                                                pattern="[0-9]*"
                                                onChange = {e => onChange(e)}                                           
                                                size = '5'     
                                                min="0"
                                                required
                                            />

                                            <button className="task-info"  type='submit' >Potvrdi</button>    
                                </div>
                               </form>
                            </div> 


                        </div>
                </div>  

                




            </div>
        </Fragment>
    )

    
}


export default EditTask;