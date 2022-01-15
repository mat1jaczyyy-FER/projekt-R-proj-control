import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import Popup from 'reactjs-popup';

const AddZaposlenik = () => {
    var [lista, setLista] = useState([])

    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    console.log(projectid)

    const[listaKorisnika, setListaKorisnika] = useState('');
    const[listaZaposlenika, setListaZaposlenika] = useState('');
    const[projekt, setProjekt] = useState('');

    const[odabrani, setOdabrani] = useState('');

    const getZaposlenici = async () => {
        try {       
                const response = await fetch(
                    `http://localhost:5000/user/allusers`,
    
                {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Content-type": "application/json"
                  },
                  
                }
            );
            const jsonData = await response.json();

            const response2 = await fetch(
                `http://localhost:5000/project/getUsersStatistics/${projectid}`,

                {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                
                }
            );
            lista = []
            const jsonData2 = await response2.json();
            var flag;
            for (const data of jsonData) {
                flag = false
                for (const data2 of jsonData2) {
                    if (data.idzaposlenika === data2.idzaposlenika) {
                        console.log(data.idzaposlenika);
                        flag = true;
                    }
                }
                if (!flag) lista.push(data);

            }
            setListaZaposlenika(jsonData2);
            setLista(lista);
            setListaKorisnika(lista);
            console.log(listaKorisnika);
            console.log(listaZaposlenika);

            const response3 = await fetch(
                `http://localhost:5000/project/${projectid}`,

                {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                
                }
            );

            const jsonData3 = await response3.json();
            console.log(jsonData3);
            setProjekt(jsonData3)
               
        } catch (err) {
            console.error(err.message);
            
        }
    }

    const getProjekt = async () => {
        try {
            const response3 = await fetch(
                `http://localhost:5000/project/${projectid}`,

                {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                
                }
            );

            const jsonData3 = await response3.json();
            console.log(jsonData3);
            setProjekt(jsonData3)

        } catch (err) {
            console.log(err);
        }
        
    }

    useEffect(() => {
        getZaposlenici();
        //getProjekt();
      }, []);
  
      


    const handleAdd = async(idProjekta, idZaposlenika) => {
        try {       
            const body = {idProjekta, idZaposlenika}
            console.log(body)
            const response = await fetch(
                `http://localhost:5000/project/dodajNaProjekt`,

            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
              
            }
        );
        const jsonData = await response.json();       
        
        if (response.status === 200) {
            toast.success("Zaposlenik dodan!")
            //setListaZaposlenika(Object.values(listaKorisnika).filter((element) => element.idzaposlenika === idZaposlenika))
            getZaposlenici();
            
            
        }
        
    } catch (err) {
        console.error(err.message);
        
    }
    }

    const handleDelete = async (idProjekta, idZaposlenika) => {
        try {       
            const body = {idProjekta, idZaposlenika}
            console.log(body)
            const response = await fetch(
                `http://localhost:5000/project/obrisiSProjekta`,

            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
              
            }
        );
        const jsonData = await response.json();       
        
        if (response.status === 200) {
            toast.success("Zaposlenik izbrisan s projekta!")
            
            //setListaKorisnika(...listaKorisnika, Object.values(listaZaposlenika).filter((element) => element.idzaposlenika === idZaposlenika))
            //setListaZaposlenika(Object.values(listaZaposlenika).filter((element) => element.idzaposlenika !== idZaposlenika))
            getZaposlenici();
        }
        
        } catch (err) {
            console.error(err.message);

            
        }

    }
    





    return (


        <Fragment>
            {console.log(listaZaposlenika)}
            <h2 class="project-desc order-card">Zaposlenici na projektu:</h2>
            <table>
             <thead> 
                 <tr>
                 <th>Ime </th>
                 <th>Prezime</th>
                 <th>Korisničko ime</th>
                 <th>Obriši</th>                 
                 </tr>
                 
             </thead>
             <tbody>
                 
             {Object.values(listaZaposlenika).map((zaposlenik) => {
                
                 return (
                     <tr key={zaposlenik.idzaposlenika}>
                         <td>{zaposlenik.imezaposlenika}</td>
                         <td>{zaposlenik.prezimezaposlenika}</td>
                         <td>{zaposlenik.korisnickoime}</td>
                         {zaposlenik.idzaposlenika === projekt[0].idvlasnika ? <><td></td></> : <>
                            <td><Popup trigger={<button className= 'add-btn btn-noborder'><AiOutlineMinusCircle size={60} color="white" /></button>} modal className="popup">
                                                {close => (
                                                    <div>
                                                        <div className="popup-text">
                                                            Jeste li sigurni da želite maknuti korisnika sa projekta?
                                                            <hr className="dashed"></hr>
                                                            --{zaposlenik.korisnickoime} --
                                                        </div>
                                                        <br />

                                                        <div className="button-flex-container">
                                                            <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => {
                                                                handleDelete(projectid, zaposlenik.idzaposlenika);
                                                                close();
                                                            } }>
                                                                <div className="popup-button">Potvrdi</div>
                                                            </div>
                                                            <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => { close(); } }>
                                                                <div className="popup-button">Odustani</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </Popup></td>
                         </>}
                                               
                      </tr>
                 )
             })}                                    
             </tbody>
         </table>
           
        {" "}
        <h2 class="project-desc order-card">Ostali korisnici:</h2>
         <table>
             <thead> 
                 <tr>
                 <th>Ime </th>
                 <th>Prezime</th>
                 <th>Korisničko ime</th>
                 <th>Dodaj</th>                 
                 </tr>
                 
             </thead>
             <tbody>
             {Object.values(listaKorisnika).map((korisnik) => {
                
                 return (
                     <tr key={korisnik.idzaposlenika}>
                         <td>{korisnik.imezaposlenika}</td>
                         <td>{korisnik.prezimezaposlenika}</td>
                         <td>{korisnik.korisnickoime}</td>
                         <td>
                         <Popup trigger={<button className= 'add-btn btn-noborder'><AiOutlinePlusCircle size={60} color="white" /></button>} modal className="popup" color="blue">
                                                {close => (
                                                    <div>
                                                        <div className="popup-text">
                                                            Jeste li sigurni da želite dodati korisnika na projekt?
                                                            <hr className="dashed"></hr>
                                                            --{korisnik.korisnickoime} --
                                                        </div>
                                                        <br />

                                                        <div className="button-flex-container">
                                                            <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => {
                                                                handleAdd(projectid, korisnik.idzaposlenika);
                                                                close();
                                                            } }>
                                                                <div className="popup-button">Potvrdi</div>
                                                            </div>
                                                            <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => { close(); } }>
                                                                <div className="popup-button">Odustani</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                            </Popup></td>                                         
                      </tr>
                 )
             })}                                    
             </tbody>
         </table>
     </Fragment>
    )
}



export default AddZaposlenik;