import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {withRouter, useHistory, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';



const FullProjektEdit = () => {
    const projectid = useParams().id;
    //const idProjekta = 11;
    let history = useHistory(); 

    const[projekt, setProjekt] = useState([]);
    const [inputs, setInputs] = useState({});


    const { nazivprojekta, opisprojekta, plandatpoc, plandatkraj } = inputs;



    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });


    const getProjekt = async projectid => {
        try {       
                const response = await fetch(
                  process.env.URL_PREFIX + `/project/${projectid}`,
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

            setProjekt(jsonData[0]);
            
        } catch (err) {
            console.error(err.message);
            
        }
    }

    useEffect(() => {
        getProjekt(projectid);
      }, []);

      const onSubmitForm = async e => {
        e.preventDefault();      
       try {
         const body = {           
            
            datKraj: projekt.datkraj,
            datPoc: projekt.datpoc,            
            idProjekta: projekt.idprojekta,                
            opisProjekta: document.getElementById("opisprojekta").value,      
            planDatKraj: document.getElementById("plandatkraj").value,
            planDatPoc: document.getElementById("plandatpoc").value, 
            nazivProjekta : document.getElementById("nazivprojekta").value, 
            idVlasnika : projekt.idvlasnika,
            idStatusa : projekt.idstatusa,
            datPoc: projekt.datpoc,
            datKraj: projekt.datkraj

        }

        console.log(body)
          const response = await fetch(
            process.env.URL_PREFIX + `/project/update/${projectid}`,
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
            toast.success('Ažuriran projekt');
            history.push('/projektinfo/' + projectid );
          } else {
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
          toast.error(`Greška pri ažuriranju projekta`);
        }
      };



      return (
          
        <Fragment>
        <div className='newProject'>
            <div className = 'newProject-naslov'>
            <h1>Uređivanje podataka o projektu : {projekt.nazivprojekta}</h1>
            
            </div>

            <div class="card bg-c-custom1 order-card ">
                    <div class="card-block">
                       


                        <div className="task-info-box">
                           <form onSubmit={onSubmitForm} className="center-text" id ="edit-projekt" >
                           <div  className="task-info"> 
                           <div className="form__group field">
                              <input  className="form__field"
                                            id="nazivprojekta"                                              
                                            type = 'textarea'
                                            name = 'opiszadatka'
                                            defaultValue = {projekt.nazivprojekta}                                        
                                            onChange = {e => onChange(e)}                           
                                            min="0"                                            
                                        /> 
                                        <label for="name" class="form__label">Naziv projekta</label>
                                       
                           </div>


                           <div className="form__group field">
                                      <input    
                                     
                                       className="form__field"
                                            id="opisprojekta"                                            
                                            type = 'text'
                                            name = 'opisprojekta'
                                            defaultValue = {projekt.opisprojekta}                                    
                                            
                                            onChange = {e => onChange(e)}                                      
                                            size={45}
                                          
                                        />
                                         <label for="name" class="form__label">Opis projekta</label>
                                         
                                        
                            </div>                                 
                                     
                          

                            <div className="form__group field">
                                      <input    
                                       className="form__field"
                                            id="plandatpoc"                                            
                                            type = 'date'
                                            name = 'plandatpoc'
                                            defaultValue = {projekt.plandatpoc}                         
                                            onChange = {e => onChange(e)}                                            
                                        />
                                         <label for="name" class="form__label">Planirani datum početka</label>
                            </div>

                            <div className="form__group field">
                                      <input    
                                       className="form__field"
                                            id="plandatkraj"                                            
                                            type = 'date'
                                            name = 'plandatkraj'
                                            defaultValue = {projekt.plandatkraj}                                      
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
      )

}

export default FullProjektEdit;