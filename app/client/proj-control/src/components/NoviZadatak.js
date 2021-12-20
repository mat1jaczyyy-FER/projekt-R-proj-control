import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import {withRouter} from 'react-router-dom';

const NoviZadatak = () => {
    const [inputs, setInputs] = useState({
        opis: "",
        plandatpoc: Date,
        plandatkraj: Date,
        datpoc: Date,
        datkraj: Date,
        planbrsati: 1,
        idstatusa: 1,
        idvrste: 1,
    });

    const {opis, plandatpoc, plandatkraj, planbrsati, idstatusa, idvrste} = inputs;

    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { opis, plandatpoc, plandatkraj, planbrsati, idstatusa, idvrste };
          const response = await fetch(
            "http://localhost:5000/zadatak/add",
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
    
          if (parseRes.zadatak) {
            toast.success(`Dodan novi zadatak`);
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
                <h1>Dodavanje novog zadatka...</h1>
                <h3>Unesite sve potrebne podatke:</h3>
            </div>
            <div className = 'form-box'>
                    <form onSubmit={onSubmitForm} className='formtest'>
                            <textarea
                            type="text"
                            name="opis"
                            value={opis}
                            onChange={e => onChange(e)}
                            className="form-control-newProject form-control-newTask-opis"
                            placeholder = 'Napišite opis zadatka'
                            />
                            <br />
                            <label className="newProject-label">Planirani datum početka:</label>
                            <input
                            type="date"
                            name="plandatpoc"
                            value={plandatpoc}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odaberite planirani datum pocetka'
                            />
                            <br />
                            <label className="newProject-label">Planirani datum završetka:</label>
                            <input
                            type="date"
                            name="plandatkraj"
                            value={plandatkraj}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odaberite planirani datum kraja'
                            />
                            <br />
                            <label className="form-control-newProject">Težina zadatka (u radnim satima):</label>
                            <input
                            type="number"
                            name="planbrsati"
                            value={planbrsati}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odredite planirano trajanje zadatka'
                            />
                            <button className='anew btn btn-2 navlinkother btn-noborder' type='submit' >Dodaj zadatak</button>
                        
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default NoviZadatak