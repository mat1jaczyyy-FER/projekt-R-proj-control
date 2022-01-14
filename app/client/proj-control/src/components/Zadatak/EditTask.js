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
    const [opis, setOpis] = useState('');

    const [inputs, setInputs] = useState({
      
    });


    const { brojsati, opiszadatka, plandatpoc } = inputs;



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
    if(opis){
      console.log(opis)
    }
    

    useEffect(() => {
        getZadatak(idzadatka);
      }, []);

     
      
    


      const onSubmitForm = async e => {
        e.preventDefault();      
        try {
         const body = {

            brSati: document.getElementById("brojsati").value,
            budzet: zadatak.budzet,
            datKraj: zadatak.datkraj,
            datPoc: zadatak.datpoc,
            idPrioriteta: zadatak.idprioriteta,
            idProjekta: zadatak.idprojekta,
            idStatusa: zadatak.idstatusa,
            idVrste: zadatak.idvrste,            
            opisZadatka: document.getElementById("opiszadatka").value,
            planBrSati: document.getElementById("planbrojsati").value,
            planBudzet: zadatak.planbudzet,
            planDatKraj: document.getElementById("plandatkraj").value,
            planDatPoc: document.getElementById("plandatpoc").value,      
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
                <h1>Uređivanje podataka o zadatku : {zadatak.opiszadatka}</h1>
                
                </div>

                <div class="card bg-c-custom1 order-card ">
                        <div class="card-block">
                           


                            <div className="task-info-box">
                               <form onSubmit={onSubmitForm} className="center-text" id ="edit-task" >
                               <div  className="task-info"> 
                               <div className="form__group field">
                                  <input  className="form__field"
                                                id="opiszadatka"                                              
                                                type = 'textarea'
                                                name = 'opiszadatka'
                                                defaultValue = {zadatak.opiszadatka}                                        
                                                onChange = {e => onChange(e)}                           
                                                min="0"                                            
                                            /> 
                                            <label for="name" class="form__label">Opis zadatka</label>
                                           
                               </div>


                               <div className="form__group field">
                                          <input    
                                           className="form__field"
                                                id="planbrojsati"                                            
                                                type = 'number'
                                                name = 'planbrojsati'
                                                defaultValue = {zadatak.planbrsati}                                            
                                                pattern="[0-9]*"
                                                onChange = {e => onChange(e)}                                        
                                                min="0"
                                              
                                            />
                                             <label for="name" class="form__label">Broj radnih sati</label>
                                </div>
                                          
                                         
                               <div className="form__group field">
                                          <input    
                                           className="form__field"
                                                id="brojsati"                                            
                                                type = 'number'
                                                name = 'brojsati'
                                                defaultValue = {zadatak.brsati}                                            
                                                pattern="[0-9]*"
                                                onChange = {e => onChange(e)}                                        
                                                min="0"
                                              
                                            />
                                             <label for="name" class="form__label">Broj radnih sati</label>
                                </div>

                                <div className="form__group field">
                                          <input    
                                           className="form__field"
                                                id="plandatpoc"                                            
                                                type = 'date'
                                                name = 'plandatpoc'
                                                defaultValue = {zadatak.plandatpoc}                                            
                                                pattern="[0-9]*"
                                                onChange = {e => onChange(e)}                                        
                                                min="0"
                                              
                                            />
                                             <label for="name" class="form__label">Planirani datum početka</label>
                                </div>

                                <div className="form__group field">
                                          <input    
                                           className="form__field"
                                                id="plandatkraj"                                            
                                                type = 'date'
                                                name = 'plandatkraj'
                                                defaultValue = {zadatak.plandatkraj}                                            
                                                pattern="[0-9]*"
                                                onChange = {e => onChange(e)}                                        
                                                min="0"
                                              
                                            />
                                             <label for="name" class="form__label">Planirani datum završetka</label>
                                </div>

                                            <button className="task-info"  type='submit' >Potvrdi</button>    
                                </div>
                               </form>
                            </div> 


                        </div>
                </div>  

                




            </div>
        </Fragment>
      );
    
    

    
}


export default EditTask;