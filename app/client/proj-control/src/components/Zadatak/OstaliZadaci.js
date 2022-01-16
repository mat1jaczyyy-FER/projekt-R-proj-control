import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { MdWorkOutline  } from "react-icons/md";
import Popup from 'reactjs-popup';
import { BrowserRouter as Router, Route,Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';

const OstaliZadaci = () => {

    const[listaZadataka, setListaZadataka] = useState('');
    const[imaZadataka, setImaZadataka] = useState(false);
    const [loading, setLoading] = useState(true);

    let history = useHistory(); 

    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    localStorage.setItem("projectID", projectid)

    const priorityData = [
        {
            id: 1,
            color: 'white',
            label: 'nizak'
        },
        {
            id: 2,
            color: 'yellow',
            label: 'srednji'
        },
        {
            id: 3,
            color: 'red',
            label: 'visok'
        }
        
    ]

    const getZadaci = async projectid => {
        try {       
                const response = await fetch(
                    `http://localhost:5000/task/allprojecttasks/${projectid}`,
    
                {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Content-type": "application/json"
                  },
                  
                }
            );
            const jsonData = await response.json();
            for (const data of Object.values(jsonData)) {
                if (data.idstatusa === 4 || data.idstatusa === 5) {
                    setImaZadataka(true)
                }
            }
            
            setLoading(false);
            setListaZadataka(jsonData);
            console.log(jsonData);
            
            
            
        } catch (err) {
            console.error(err.message);
            
        }
    }
    useEffect(() => {
        getZadaci(projectid);
      }, []);

      const brisanjeZadatka = async (idZadatka) => {
        try {       
            const response = await fetch(
                `http://localhost:5000/task/delete/${idZadatka}`,
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
    
        if (response.status === 200) {
            toast.success("Zadatak obrisan!")
            history.push('/ostalizadaci/' + projectid)
            getZadaci(projectid);
        }
        
        } catch (err) {
            console.error(err.message);
            
        }
    
    }
    const editZadatak = async (idZadatka, idStatusa, brSati) => {
        const body = {
            idStatusa,
            brSati
        }
        console.log(body)
        try {       
            const response = await fetch(
                `http://localhost:5000/task/editzadatka/${idZadatka}`,
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
        console.log(jsonData);
    
        if (response.status === 200) {
            toast.success("Status zadatka promijenjen!")
            history.push('/ostalizadaci/' + projectid)
            getZadaci(projectid);
        }
        
        } catch (err) {
            console.error(err.message);
            
        }
    
    }
      
    if(listaZadataka !== ''){
        Object.values(listaZadataka)
          .map((zadatak) => {})
        }

    return (
        <div class="container-zadaci">
 
         
 
             {loading ? <div class="loader"></div> : <>
             
             {imaZadataka === false ? <h1>Nema odbačenih ili pauziranih zadataka!</h1> : <>
                <div class="radni">
                
                <h1>Pauzirani: </h1>   
                <Fragment>
         
         {Object.values(listaZadataka).filter(zadatak => zadatak.idstatusa === 4).map((zadatak) => {
             return (
                 

                 <div class="card bg-c-blue order-card">
                 <div class="card-block">
                     <div className="task-title">
                         {zadatak.opiszadatka}
                     </div>

                     <hr className="dashed"></hr>
                     <div className="task-info-box">
                         <div className="task-info">PRIORITET:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                          <div className="task-info" style={zadatak.idprioriteta === 1 ? {color:"green"} : zadatak.idprioriteta === 2 ? {color:"yellow"} : {color:"red"}}>
                         {zadatak.idprioriteta === 1 ? '  ' + 'nizak' : zadatak.idprioriteta === 2 ? ' ' + 'srednji' : '  visok'}
                         </div>
                     </div>                         
                     

                     <div className="task-info-box">
                         <div className="task-info">PLANIRANI BROJ SATI: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                         <div className="task-info">{zadatak.planbrsati} h</div>
                     </div>

                     <div className="task-info-box">
                         <div className="task-info">BROJ RADNIH SATI:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                         <div className="task-info">{!zadatak.brsati ? 0 : zadatak.brsati} h</div>
                     </div>   

                     <div className="edit-box">
                            <Popup trigger={<AiIcons.AiOutlinePlayCircle size={28} color="black" />} modal className="popup">
                                                {close => (
                                                    <div>
                                                        <div className="popup-text">
                                                            Jeste li sigurni da želite ponovno pokrenuti ovaj zadatak?
                                                            <hr className="dashed"></hr>
                                                            --{zadatak.opiszadatka} --
                                                        </div>
                                                        <br />

                                                        <div className="button-flex-container">
                                                            <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => {
                                                                console.log(zadatak.idzadatka);
                                                                editZadatak(zadatak.idzadatka, 2, zadatak.brsati);
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

                                            </Popup>

                            <Popup trigger={<AiIcons.AiOutlineCloseCircle size={28} color="black" />} modal className="popup">
                                                {close => (
                                                    <div>
                                                        <div className="popup-text">
                                                            Jeste li sigurni da želite odbaciti ovaj zadatak?
                                                            <hr className="dashed"></hr>
                                                            --{zadatak.opiszadatka} --
                                                        </div>
                                                        <br />

                                                        <div className="button-flex-container">
                                                            <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => {
                                                                console.log(zadatak.idzadatka);
                                                                editZadatak(zadatak.idzadatka, 5, zadatak.brsati);
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

                                            </Popup>
                            

                         
                         </div>     

                 </div>
                 
             </div>

             
                 
             )
         })}                                    
         
 </Fragment>
 </div>
 <div class="gotovi-zadaci">
    <h1>Odbačeni: </h1>   
                <Fragment>
                {Object.values(listaZadataka).filter(zadatak => zadatak.idstatusa === 5).map((zadatak) => {
             return (
                 

                 <div class="card bg-c-blue order-card">
                 <div class="card-block">
                     <div className="task-title">
                         {zadatak.opiszadatka}
                     </div>

                     <hr className="dashed"></hr>
                     <div className="task-info-box">
                         <div className="task-info">PRIORITET:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                          <div className="task-info" style={zadatak.idprioriteta === 1 ? {color:"green"} : zadatak.idprioriteta === 2 ? {color:"yellow"} : {color:"red"}}>
                         {zadatak.idprioriteta === 1 ? '  ' + 'nizak' : zadatak.idprioriteta === 2 ? ' ' + 'srednji' : '  visok'}
                         </div>
                     </div>                         
                     

                     <div className="task-info-box">
                         <div className="task-info">PLANIRANI BROJ SATI: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                         <div className="task-info">{zadatak.planbrsati} h</div>
                     </div>

                     <div className="task-info-box">
                         <div className="task-info">BROJ RADNIH SATI:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                         <div className="task-info">{!zadatak.brsati ? 0 : zadatak.brsati} h</div>
                     </div>   

                     <div className="edit-box">

                            <Popup trigger={<AiIcons.AiOutlineDelete size={28} color="black" />} modal className="popup">
                                                {close => (
                                                    <div>
                                                        <div className="popup-text">
                                                            Jeste li sigurni da želite trajno obrisati ovaj zadatak?
                                                            <hr className="dashed"></hr>
                                                            --{zadatak.opiszadatka} --
                                                        </div>
                                                        <br />

                                                        <div className="button-flex-container">
                                                            <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => {
                                                                console.log(zadatak.idzadatka);
                                                                brisanjeZadatka(zadatak.idzadatka);
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

                                            </Popup>
                         
                         </div>     

                 </div>
                 
             </div>

             
                 
             )
         })}                 

                </Fragment>
                </div></>}
             </>}
             
         </div>

    );
}

export default OstaliZadaci;