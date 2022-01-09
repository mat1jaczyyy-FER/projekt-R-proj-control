import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {withRouter, useHistory, useParams} from 'react-router-dom';

const EditProjekt = () => {
    const idProjekta = useParams().id;
    //const idProjekta = 11;
    let history = useHistory(); 

    const[projekt, setProjekt] = useState([]);

    const getProjekt = async idProjekta => {
        try {       
                const response = await fetch(
                    `http://localhost:5000/project/${idProjekta}`,
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
            `http://localhost:5000/project/update/${idProjekta}`,
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
                <h1>Izmjena stanja projekta {projekt.nazivprojekta}</h1>
                <h3>Odaberite trenutno stanje projekta</h3>
            </div>
            <div className = 'form-box'>
                    <form onSubmit={onSubmitForm} className='formtest'>
                        <div >
                    {projekt.idstatusa === 1 ? (<>
                        <label className="newProject-label">Projekt nije još započet...</label>
                        <br />
                        <br />
                    <button id="pokreniprojekt" className='anew btn btn-2 navlinkother btn-noborder' type='submit' value="2">Pokreni projekt</button>
                    </>
                    ) : (<>
                        <label className="newProject-label">Projekt je u tijeku!</label>
                        <br />
                        <br />
                    <button id="zavrsiprojekt" className='anew btn btn-2 navlinkother btn-noborder' type='submit' value="3">Završi projekt</button>
                    </>)}</div>      
                    </form>
                </div>
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