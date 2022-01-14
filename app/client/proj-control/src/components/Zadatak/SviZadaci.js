import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { MdWorkOutline  } from "react-icons/md";
import Popup from 'reactjs-popup';
import { BrowserRouter as Router, Route,Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';



const SviZadaci = () => {

    const[listaZadataka, setListaZadataka] = useState('');
    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    localStorage.setItem("projectID", projectid)
    console.log(projectid);

    const idZaposlenika = JSON.parse(localStorage.getItem("user")).idzaposlenika;
    console.log(idZaposlenika)

    let history = useHistory(); 
    const [satiInput, setSatiInput] = useState({
        brsati : ""
      });

    const {brsati} = satiInput;
    const onChange = e =>
    setSatiInput({ ...satiInput, [e.target.name]: e.target.value });

    




let gotoviZadaci = [];
let aktivniZadaci = [];
let planiraniZadaci = [];





    
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

        setListaZadataka(jsonData);
        
        
    } catch (err) {
        console.error(err.message);
        
    }
}
useEffect(() => {
    getZadaci(projectid);
  }, []);

  if(listaZadataka !== ''){
      for(const zad of listaZadataka){
         if(zad.idstatusa === 1){
             var o = zad;            
             gotoviZadaci.push(o);
         }
         else if(zad.idstatusa === 2){
            var o = zad;            
            aktivniZadaci.push(o);
         }else if(zad.idstatusa === 3){
            var o = zad;            
            planiraniZadaci.push(o);
         }
      }
      console.log(gotoviZadaci);
    }
    
  


  const brisanjeZadatka = async (idZadatka) => {
    try {       
        const response = await fetch(
            `http://localhost:5000/task/deletetask/${idZadatka}`,
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
        history.push('/svizadaci/' + projectid)
        getZadaci(projectid);
    }
    
    } catch (err) {
        console.error(err.message);
        
    }

}

    const dodijeliZad = async (idzadatka, idzaposlenika) => {
        try {   
            const body = {idzadatka, idzaposlenika}  
            console.log(body);
            const response = await fetch(
                `http://localhost:5000/task/dodijeli`,
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
            toast.success("Zadatak obrisan!")
            history.push('/svizadaci/' + projectid)
            getZadaci(projectid);
        }
        
        } catch (err) {
            console.error(err.message);
            
        }           
}  



    return (                

       <div class="container-zadaci">
           

           {listaZadataka === '' ? <div class="loader"></div> : <><div class="gotovi-zadaci">
           <div className="div-neki">
                <h1>Završeni</h1>              
            </div>
                <Fragment>               

                    {Object.values(gotoviZadaci).map((zadatak) => {

                        return (

                            <div class="card bg-c-green order-card">
                                <div class="card-block">
                                    <div className="task-title">
                                        {zadatak.opiszadatka}
                                    </div>

                                    <hr className="dashed"></hr>
                                    <div className="task-info-box">
                                        <div className="task-info">PRIORITET:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                        <div className="task-info" style={zadatak.idprioriteta === 1 ? { color: "green" } : zadatak.idprioriteta === 2 ? { color: "yellow" } : { color: "red" }}>
                                            {zadatak.idprioriteta === 1 ? 'nizak' : zadatak.idprioriteta === 2 ? 'srednji' : 'visok'}
                                        </div>
                                    </div>

                                    <div className="task-info-box">
                                        <div className="task-info">PLANIRANI BROJ SATI: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                        <div className="task-info">{zadatak.planbrsati} h</div>
                                    </div>

                                    <div className="task-info-box">
                                        <div className="task-info">RADNI BROJ SATI: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                        <div className="task-info">{!zadatak.brsati ? 0 : zadatak.brsati} h</div>
                                    </div>

                                </div>

                            </div>



                        );
                    })}

                </Fragment>


            </div><div class="radni">

                    <h1>U tijeku</h1>


                    <Fragment>

                        {Object.values(aktivniZadaci).map((zadatak) => {
                            return (

                                <div class="card bg-c-blue order-card">
                                    <div class="card-block">
                                        <div className="task-title">
                                            {zadatak.opiszadatka}
                                        </div>

                                        <hr className="dashed"></hr>
                                        <div className="task-info-box">
                                            <div className="task-info">PRIORITET:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                            <div className="task-info" style={zadatak.idprioriteta === 1 ? { color: "green" } : zadatak.idprioriteta === 2 ? { color: "yellow" } : { color: "red" }}>
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
                                            <Link to={`/zadatak/finish/${zadatak.idzadatka}`}>
                                                <AiIcons.AiOutlineCheck size={28} color="black" />
                                            </Link>

                                            <Link to={`/zadaci/izmjena/${projectid}/${zadatak.idzadatka}`}>
                                                <AiIcons.AiOutlineEdit size={28} color="black" />
                                            </Link>




                                            <Popup trigger={<AiIcons.AiOutlineDelete size={28} color="pink" />} modal className="popup">
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



                            );
                        })}

                    </Fragment>

                </div><div class="najavljeni">

                    <div className="div-neki">
                        <div className="div-neki-child"><h1>Planirani</h1></div>
                        <div className="div-neki-child2">
                            <Link to={'/novizadatak'}>
                                <AiIcons.AiOutlineFileAdd size={28} color="white" />
                            </Link>
                        </div>
                    </div>





                    <Fragment>

                        {Object.values(planiraniZadaci).map((zadatak) => {
                            return (

                                <div class="card bg-c-yellow order-card">
                                    <div class="card-block">
                                        <div className="task-title">
                                            {zadatak.opiszadatka}
                                        </div>

                                        <hr className="dashed"></hr>
                                        <div className="task-info-box">
                                            <div className="task-info">PRIORITET:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                            <div className="task-info" style={zadatak.idprioriteta === 1 ? { color: "green" } : zadatak.idprioriteta === 2 ? { color: "yellow" } : { color: "red" }}>
                                                {zadatak.idprioriteta === 1 ? 'nizak' : zadatak.idprioriteta === 2 ? 'srednji' : 'visok'}
                                            </div>
                                        </div>

                                        <div className="task-info-box">
                                            <div className="task-info">PLANIRANI BROJ SATI: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                            <div className="task-info">{zadatak.planbrsati} h</div>
                                        </div>

                                        <div className="task-info-box">
                                            <div className="task-info">RADNI BROJ SATI: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
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

                                            <Popup trigger={<button> <MdWorkOutline size={28} /></button>} modal>
                                                {close => (
                                                    <div>
                                                        <div className="popup-text">
                                                            Jeste li sigurni da želite započeti s radom na ovom zadatku?
                                                            <hr className="dashed"></hr>
                                                            --{zadatak.opiszadatka} --
                                                        </div>
                                                        <br />

                                                        <div className="button-flex-container">
                                                            <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => {

                                                                dodijeliZad(zadatak.idzadatka, idZaposlenika);
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



                            );
                        })}

                    </Fragment>
                </div></>}

        
        </div>
    )
    
}



export default SviZadaci ;
