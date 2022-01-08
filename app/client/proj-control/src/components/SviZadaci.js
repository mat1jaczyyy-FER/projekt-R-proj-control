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
    console.log(projectid);

    let history = useHistory(); 
    const [satiInput, setSatiInput] = useState({
        brsati : ""
      });

    const {brsati} = satiInput;
    const onChange = e =>
    setSatiInput({ ...satiInput, [e.target.name]: e.target.value });


/*dohvat svih zadataka za zadani zadatak*/

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

        setListaZadataka(jsonData);
        
    } catch (err) {
        console.error(err.message);
        
    }
}
useEffect(() => {
    getZadaci(projectid);
  }, []);

  if(listaZadataka !== ''){
  Object.values(listaZadataka)
    .filter(zadatak => zadatak.idstatusa === 2)
    .map((zadatak) => {console.log(zadatak)})
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

    return (       
              

       <div class="container-zadaci">

        <div class="gotovi-zadaci">
            <h1>Završeni</h1>
        <Fragment>
        
        {Object.values(listaZadataka).filter(zadatak => zadatak.idstatusa === 1).map((zadatak) => {
            return (

                <div class="card bg-c-green order-card">
                <div class="card-block">
                    <div className="task-title">
                        {zadatak.opiszadatka}
                    </div>

                    <hr className="dashed"></hr>
                    <div className="task-info-box">
                        <div className="task-info">PRIORITET:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                         <div className="task-info" style={zadatak.idprioriteta === 1 ? {color:"green"} : zadatak.idprioriteta === 2 ? {color:"yellow"} : {color:"red"}}>
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

            
                
            )
        })}                                    
        
</Fragment>


        </div>

        <div class="radni">
            <h1>U tijeku</h1>
        <Fragment>
        
                {Object.values(listaZadataka).filter(zadatak => zadatak.idstatusa === 2).map((zadatak) => {
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

                            <AiIcons.AiOutlineCheck size={28} color="black"/>

                            <Link to={`/zadaci/izmjena/${projectid}/${zadatak.idzadatka}`}>
                            <AiIcons.AiOutlineEdit size={28} color="black"/>
                            </Link>

                            


                            <Popup trigger = {<button> <AiIcons.AiOutlineDelete size={28}/></button>} modal className="popup">
                            {close => (
                                        <div>
                                            <div className="popup-text">
                                                Jeste li sigurni da želite trajno obrisati ovaj zadatak?
                                                <hr className="dashed"></hr>
                                                -- {zadatak.opiszadatka} --
                                            </div>
                                            <br/>
                                            
                                            <div className="button-flex-container">
                                                <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => {         
                                                    console.log(zadatak.idzadatka)                          
                                                    brisanjeZadatka(zadatak.idzadatka)
                                                    close();
                                                }}>
                                                    <div className="popup-button">Potvrdi</div>
                                                </div>
                                                <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => {close();}}>
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

        <div class="najavljeni">
            <h1>Planirani</h1>
        <Fragment>
        
        {Object.values(listaZadataka).filter(zadatak => zadatak.idstatusa === 3).map((zadatak) => {
            return (

                <div class="card bg-c-yellow order-card">
                <div class="card-block">
                    <div className="task-title">
                        {zadatak.opiszadatka}
                    </div>

                    <hr className="dashed"></hr>
                    <div className="task-info-box">
                        <div className="task-info">PRIORITET:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                         <div className="task-info" style={zadatak.idprioriteta === 1 ? {color:"green"} : zadatak.idprioriteta === 2 ? {color:"yellow"} : {color:"red"}}>
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
                    <Popup trigger = {<button> <MdWorkOutline size={28}/></button>} modal>
                            
                    </Popup>

                    </div>

                </div>
                
            </div>

            
                
            )
        })}                                    
        
</Fragment>
        </div>
        </div>
    )
    
}



export default SviZadaci ;
