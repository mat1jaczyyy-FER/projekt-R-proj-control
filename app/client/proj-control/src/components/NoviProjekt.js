import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import {withRouter} from 'react-router-dom';

const  NoviProjekt = () => {
    const [inputs, setInputs] = useState({
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
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const idzaposlenika = JSON.parse(localStorage.getItem("user")).idzaposlenika;
          const idVlasnika = idzaposlenika
          const body = { nazivProjekta, planDatPoc, planDatKraj, idStatusa, idVlasnika, opisProjekta };
          const response = await fetch(
            "http://localhost:5000/project/add",
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
    
          if (parseRes.projekt) {
            toast.success(`Dodan novi projekt: ${nazivProjekta}`);
            window.location.href = '/projekti';
          } else {
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
          toast.error(`GreŠka pri dodavanju projekta!`);
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
                            name="nazivProjekta"
                            value={nazivProjekta}
                            onChange={e => onChange(e)}
                            className="form-control-newProject form-control-newProject-naslov"
                            placeholder = 'Upišite naziv projekta'
                            />
                            <br />
                            <label className="newProject-label">Planirani datum početka:</label>
                            <input
                            type="date"
                            name="planDatPoc"
                            value={planDatPoc}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odaberite planirani datum početka'
                            />
                            <br />
                            <label className="newProject-label">Planirani datum završetka:</label>
                            <input
                            type="date"
                            name="planDatKraj"
                            value={planDatKraj}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odaberite planirani datum završetka'
                            />
                            <br />
                            <textarea
                            type="text"
                            name="opisProjekta"
                            value={opisProjekta}
                            onChange={e => onChange(e)}
                            className="form-control-newProject form-control-newProject-opis"
                            placeholder = 'Unesite kratki opis projekta...'
                            />
                            <button className='anew btn btn-2 navlinkother btn-noborder' type='submit' >Dodaj projekt</button>
                        
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NoviProjekt;