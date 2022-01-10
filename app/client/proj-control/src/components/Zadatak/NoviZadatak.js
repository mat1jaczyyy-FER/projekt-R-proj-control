import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import {withRouter, useHistory} from 'react-router-dom';

const NoviZadatak = () => {
  const projectid = JSON.parse(localStorage.getItem("projectID"));
    var [odabrano, setOdabrano] = useState(1);
    
    let history = useHistory(); 

    //pomocni kod za filipa c
    /*const start = new Date(`${projekt.datPoc}`);
    const pomocni = new Date();
    const end = pomocni.toISOString().split('T')[0]

    lista = []
    let loop = new Date(start);
    while (loop <= end) {
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
      let ukupnoZadataka = 0;
      let rijesenihZadataka = 0;
      for (const zad of zadaci) {
        if (zad.datPoc && zad.datPoc < newDate) {
          ukupnoZadataka++;
        }
        if (zad.datKraj && zad.datKraj < newDate) {
          rijesenihZadataka++;
        }
      }
      lista.push({
        newDate,
        ukupnoZadataka,
        rijesenihZadataka
      })
    }*/

    var [inputs, setInputs] = useState({
        opisZadatka: "",
        planDatPoc: Date,
        planDatKraj: Date,
        datPoc: Date,
        datKraj: Date,
        planBrSati: 1,
        idStatusa: 1,
        idVrste: 1,
        idPrioriteta: "1"
    });

    var {opisZadatka, planDatPoc, planDatKraj, planBrSati, idPrioriteta, idStatusa} = inputs;

    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const idproj = localStorage.getItem("projectID")
            console.log(idproj);
          const idProjekta = projectid
          idPrioriteta = parseInt(odabrano)
          
          const body = { opisZadatka, planDatPoc, planDatKraj, planBrSati, idProjekta, idStatusa, idPrioriteta};
          console.log(body)
          const response = await fetch(
            "http://localhost:5000/task/add",
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
            history.push('/svizadaci/' + projectid);
          } else {
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
          toast.error(`Greška pri dodavanju zadatka!`);
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
                            name="opisZadatka"
                            value={opisZadatka}
                            onChange={e => onChange(e)}
                            className="form-control-newProject form-control-newTask-opis"
                            placeholder = 'Napišite opis zadatka'
                            />
                            <br />
                            <label className="newProject-label">Planirani datum početka:</label>
                            <input
                            type="date"
                            name="planDatPoc"
                            value={planDatPoc}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odaberite planirani datum pocetka'
                            />
                            <br />
                            <label className="newProject-label">Planirani datum završetka:</label>
                            <input
                            type="date"
                            name="planDatKraj"
                            value={planDatKraj}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odaberite planirani datum kraja'
                            />
                            <br />
                            <label className="form-control-newProject">Težina zadatka (u radnim satima):</label>
                            <input
                            type="number"
                            name="planBrSati"
                            value={planBrSati}
                            onChange={e => onChange(e)}
                            className="form-control-newProject"
                            placeholder = 'Odredite planirano trajanje zadatka'
                            />
                            <div defaultValue={odabrano}
                            onChange={(novoOdabrano) => {
                              setOdabrano(novoOdabrano.target.value);
                          }}
>
                            <br />
                            <label className="newProject-label">Odaberite prioritet:</label>
                            <input
                            type="radio"
                            name="idPrioriteta"
                            id="nizak"
                            value="1"
                            className="form-control-newProject"
                            
                            />
                            <label for="nizak" className="form-control-newProject">Nizak</label>
                            <input
                            type="radio"
                            name="idPrioriteta"
                            id="srednji"
                            value="2"
                            className="form-control-newProject"
                            
                            />
                            <label for="srednji" className="form-control-newProject">Srednji</label>
                            <input
                            type="radio"
                            name="idPrioriteta"
                            id="visok"
                            value="3"
                            className="form-control-newProject"
                            />
                            <label for="visok" className="form-control-newProject">Visok</label>
                            </div>
                            <br />
                            <br />
                            <button className='anew btn btn-2 navlinkother btn-noborder' type='submit' >Dodaj zadatak</button>
                        
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default NoviZadatak