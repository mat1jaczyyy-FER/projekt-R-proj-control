import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {withRouter, useHistory, useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditProjekt = () => {
    const idProjekta = useParams().id;
    //const idProjekta = 11;
    let history = useHistory(); 

    const[projekt, setProjekt] = useState([]);

    const getProjekt = async idProjekta => {
        try {       
                const response = await fetch(
                  process.env.URL_PREFIX + `/project/${idProjekta}`,
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
        getProjekt(idProjekta);
      }, []);

    /*const [inputs, setInputs] = useState({
        nazivProjekta: "",
        planDatPoc: Date,
        planDatKraj: Date,
        datPoc: Date,
        datKraj: Date,
        idStatusa: 1,
        opisProjekta: ""
    });

    const {nazivProjekta, planDatPoc, planDatKraj, idStatusa, opisProjekta} = inputs;

    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });*/

    const onSubmitForm = async e => {
        e.preventDefault();
        var body = null
        var d = new Date();
        const datum = d.toISOString().split('T')[0]
        console.log(d.toISOString().split('T')[0])
        if (projekt.datpoc === null) {
            body = { nazivProjekta: projekt.nazivprojekta,
                planDatPoc: projekt.plandatpoc,
                planDatKraj: projekt.plandatkraj,
                idStatusa: 2,
                datPoc: datum,
                datKraj: projekt.datkraj,
                opisProjekta: projekt.opisprojekta,
                };
        } else {
            body = { nazivProjekta: projekt.nazivprojekta,
                planDatPoc: projekt.plandatpoc,
                planDatKraj: projekt.plandatkraj,
                idStatusa: 3,
                datPoc: projekt.datpoc,
                datKraj: datum,
                opisProjekta: projekt.opisprojekta,
            }
        }

        try {
          const response = await fetch(
            process.env.URL_PREFIX + `/project/update/${idProjekta}`,
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
            toast.success(`Ažuriran projekt: ${projekt.nazivprojekta}`);
            history.push("/projekti");
          } else {
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
          toast.error(`Greška pri ažuriranju projekta!`);
        }
      };

    return (
        <Fragment>
          <div className='newProject'>
                <div className = 'newProject-naslov'>
                    <h1>Izmjena stanja projekta: </h1> 
                    <hr className="dashed"></hr>
                    <div className="card bg-c-custom1 order-card">
                        <h1>{projekt.nazivprojekta}</h1> 
                    </div>
                    
                    <hr className="dashed"></hr>
                    </div>
                    {projekt.idstatusa === 1 ? (<>
                      <h1>Projekt nije započet...</h1>
                      <div className = 'card bg-c-custom1 order-card'>
                    <form onSubmit={onSubmitForm} className='formtest'>

                    <button id="završizad" className='anew btn btn-2 navlinkother btn-noborder' type='submit' value="2">Pokreni projekt</button>
                    <div className="proj-title">                                        
                            <Link to={`/projektinfo/` + projekt.idprojekta } className= 'btn-4'>Odustani</Link>
                    </div>    
                    </form>
                </div>
                    </>) : (<>
                    </>)}
                    {projekt.idstatusa === 2 ? (<>
                      <h1>Projekt je u tijeku..</h1>
                      <div className = 'card bg-c-custom1 order-card'>
                    <form onSubmit={onSubmitForm} className='formtest'>

                    <button id="završizad" className='anew btn btn-2 navlinkother btn-noborder' type='submit' value="3">Završi projekt</button>
                    <div className="proj-title">                                        
                            <Link to={`/projektinfo/` + projekt.idprojekta } className= 'btn-4'>Odustani</Link>
                    </div>    
                    </form>
                </div>
                    </>) : (<>
                    </>)}
                    {projekt.idstatusa === 3 ? (<>
                      <h1>Projekt je završen!</h1>
                      <div className = 'card bg-c-custom1 order-card'>
                      <div className="proj-title">                                        
                            <Link to={`/projektinfo/` + projekt.idprojekta } className= 'btn-4'>Povratak</Link>
                    </div>   
                    </div>
                    </>) : <></>}
                   
                
            
            </div>
        </Fragment>
    );
};

export default EditProjekt;
/*
<input type="radio" id="1" name="najavljen" value="najavljen" checked></input>
                        <label for="1">Najavljen</label>
                        <input type="radio" id="2" name="utijeku" value="utijeku" ></input>
                        <label for="2">U tijeku</label>
                        <input type="radio" id="3" name="dovrsen" value="dovrsen" ></input>
                        <label for="3">Završen</label>
                        */