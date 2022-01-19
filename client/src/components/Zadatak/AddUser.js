import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import Popup from 'reactjs-popup';

const AddUser = () => {
    var [lista, setLista] = useState([])

    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    const {pid} = useParams();
    const {id} = useParams();

    const [zadatak, setZadatak] = useState('');
    const[listaKorisnika, setListaKorisnika] = useState('');
    const[listaZaposlenika, setListaZaposlenika] = useState('');
    const[listaZaposlenikaNaZad, setListaZaposlenikaNaZad] = useState('');
    const[projekt, setProjekt] = useState('');

    const[odabrani, setOdabrani] = useState('');
    let history = useHistory(); 

    const getZaposlenici = async () => {
        try {       

            const response = await fetch(
                process.env.URL_PREFIX + `/project/getUsersStatistics/${pid}`,

                {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                
                }
            );
            
            const jsonData = await response.json();
            console.log(jsonData);
            

            const response2 = await fetch(
                process.env.URL_PREFIX + `/task/${id}`,

                {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                
                }
            );
            const jsonData2 = await response2.json();
            setListaZaposlenikaNaZad(jsonData2[0].dodijeljenJe)
            console.log(jsonData2[0].dodijeljenJe)
            setZadatak(jsonData2[0]);
            const pomocniData = jsonData2[0].dodijeljenJe;

            lista = []
            var flag;
            for (const data of jsonData) {
                flag = false
                for (const data2 of pomocniData) {
                    if (data.idzaposlenika === data2.idzaposlenika) {
                        console.log(data.idzaposlenika);
                        flag = true;
                    }
                }
                if (!flag) lista.push(data);

            }
            setLista(lista);
            setListaZaposlenika(lista);
               
        } catch (err) {
            console.error(err.message);
            
        }
    }

    const getProjekt = async () => {
        try {
            const response3 = await fetch(
                process.env.URL_PREFIX + `/project/${projectid}`,

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
  
      


    const handleAdd = async(idzadatka, idzaposlenika) => {
        try {       
            const body = {idzadatka, idzaposlenika}
            console.log(body)
            const response = await fetch(
                process.env.URL_PREFIX + `/task/dodijeli`,

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
            toast.success("Zaposlenik dodan na zadatak!")
            //setListaZaposlenika(Object.values(listaKorisnika).filter((element) => element.idzaposlenika === idZaposlenika))
            //getZaposlenici();
            history.push('/svizadaci/' + pid);
            
            
        }
        
    } catch (err) {
        console.error(err.message);
        
    }
    }

    const handleDelete = async (idzadatka, idzaposlenika) => {
        try {       
            const body = {idzadatka, idzaposlenika}
            console.log(body)
            const response = await fetch(
                process.env.URL_PREFIX + `/task/makni`,

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
            toast.success("Zaposlenik maknut sa zadatka!")
            
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
            {listaZaposlenika !== '' ? console.log(listaZaposlenika) : <></>}
            
           
        {" "}
        <h2 class="project-desc order-card">Dodavanje zaposlenika na zadatak {zadatak.opiszadatka}:</h2>
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
             {Object.values(listaZaposlenika).map((korisnik) => {
                
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
                                                            Jeste li sigurni da želite dodati zaposlenika na zadatak?
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



export default AddUser;

/*<h2 class="project-desc order-card">Zaposlenici koji rade na zadatku {zadatak.opiszadatka}:</h2>
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
                 
             {Object.values(listaZaposlenikaNaZad).map((zaposlenik) => {
                
                 return (
                     <tr key={zaposlenik.idzaposlenika}>
                         <td>{zaposlenik.imezaposlenika}</td>
                         <td>{zaposlenik.prezimezaposlenika}</td>
                         <td>{zaposlenik.korisnickoime}</td>
                         {zaposlenik.idzaposlenika === projekt.idvlasnika ? <><td></td></> : <>
                            <td><Popup trigger={<button className= 'add-btn btn-noborder'><AiOutlineMinusCircle size={60} color="white" /></button>} modal className="popup">
                                                {close => (
                                                    <div>
                                                        <div className="popup-text">
                                                            Jeste li sigurni da želite maknuti zaposlenika sa zadatka?
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
         </table> */