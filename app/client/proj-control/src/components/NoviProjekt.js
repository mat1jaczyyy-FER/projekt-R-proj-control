import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import {withRouter} from 'react-router-dom';

const  NoviProjekt = () => {
    const [inputs, setInputs] = useState({
        nazivprojekta: "",
        plandatpoc: Date,
        plandatkraj: Date,
        datpoc: Date,
        datkraj: Date,
        idstatusa: 1,
        idvlasnika: "",
        opisprojekta: ""
    });

    const {nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta} = inputs;

    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { nazivprojekta, plandatpoc, plandatkraj, datpoc, datkraj, idstatusa, idvlasnika, opisprojekta };
          const response = await fetch(
            "http://localhost:5000/projekt/novi",
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
    
          if (parseRes.status === 200) {
            toast.success(`Dodan novi projekt: ${nazivprojekta}`);
            window.location.href = '/projekti';
          } else {
            toast.error(`Greska pri dodavanju projekta!`);
          }
        } catch (err) {
          console.error(err.message);
        }
      };

    return (
        <Fragment>
          <div className='newProject'>
            <div className = 'newProject-naslov'>
                <h1>Dodavanje novog projekta...</h1>
                <h3>Unesite sve potrebne podatke:</h3>
            </div>
            <div className = 'form-box'>
                    <form onSubmit={onSubmitForm} className='formtest'>

                        
                            <input
                            type="text"
                            name="nazivprojekta"
                            value={nazivprojekta}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Upišite naziv projekta'
                            />
                            <br />
                            <label className="newProject-label">Planirani datum pocetka:</label>
                            <input
                            type="date"
                            name="plandatpoc"
                            value={plandatpoc}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odaberite planirani datum pocetka'
                            />
                            <br />
                            <label className="newProject-label">Planirani datum zavrsetka:</label>
                            <input
                            type="date"
                            name="plandatkraj"
                            value={plandatkraj}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odaberite planirani datum kraja'
                            />
                            <br />
                            <textarea
                            type="text"
                            name="opisprojekta"
                            value={opisprojekta}
                            onChange={e => onChange(e)}
                            className="form-control-newProject form-control-newProject-opis"
                            placeholder = 'Napisite kratki opis projekta...'
                            />
                            <button className='anew btn btn-2 navlinkother btn-noborder' type='submit' >Dodaj projekt</button>
                        
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NoviProjekt;