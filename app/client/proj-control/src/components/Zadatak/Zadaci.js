import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { MdWorkOutline  } from "react-icons/md";
import Popup from 'reactjs-popup';
import { BrowserRouter as Router, Route,Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';



const Zadaci = () => {

    const[listaZadataka, setListaZadataka] = useState('');
    const [aktivniZadaci, setAktivniZadaci] = useState(false);
    const [loading, setLoading] = useState(true);

    let history = useHistory(); 
    const [satiInput, setSatiInput] = useState({
        brsati : ""
      });

    const {brsati} = satiInput;
    const onChange = e =>
    setSatiInput({ ...satiInput, [e.target.name]: e.target.value });

    const [sortedField, setSortedField] = useState(null);

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

    const getZadaci = async () => {
        const idZaposlenika = JSON.parse(localStorage.getItem("user")).idzaposlenika;
        console.log(idZaposlenika)
        try {       
                const response = await fetch(
                    `http://localhost:5000/task/allusertasks/${idZaposlenika}`,

                {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                
                }
            );
            const jsonData = await response.json();
            console.log(Object.values(jsonData)[0].zadatak)
            for (const data of Object.values(jsonData)) {
                data.zadatak.imeprojekta = data.projekt.nazivprojekta;
                if (data.zadatak.idstatusa === 2) {
                    setAktivniZadaci(true);
                }
            }
            Object.values(jsonData).sort(function(a, b) {
                return (a.zadatak.idprojekta - b.zadatak.idprojekta);
            });

            setLoading(false);
            setListaZadataka(jsonData);
            console.log(jsonData)
            
        } catch (err) {
            console.error(err.message);
            
        }
    }

    useEffect(() => {
        getZadaci();
      }, []);
    
      if(listaZadataka !== ''){
        Object.values(listaZadataka)
          .filter(zadatak => zadatak.idstatusa === 2)
          .map((zadatak) => {console.log(zadatak)})
        }
    
    return (       
              

        <div class="container-zadaci">
 
         <div class="radni">
 
             {loading ? <div class="loader"></div> : <>
             {aktivniZadaci === false ? <h1>Nemate zadataka za rješavanje!</h1> : <>
                <h1>Aktivni zadaci: </h1>   
                <Fragment>
         
         {Object.values(listaZadataka).map(e => e.zadatak).filter(zadatak => zadatak.idstatusa === 2).map((zadatak) => {
             return (
                 

                 <div class="card bg-c-blue order-card">
                 <div class="card-block">
                 <div className="task-title">
                         Projekt: {zadatak.imeprojekta}
                     </div>
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
                            <Link to={`/userzadatak/finish/${zadatak.idzadatka}`}>        
                            <AiIcons.AiOutlineCheck size={28} color="black"/>
                            </Link>

                            <Link to={`/userzadatak/izmjena/${zadatak.idzadatka}`}>
                            <AiIcons.AiOutlineEdit size={28} color="black"/>
                            </Link>
                         
                         </div>     

                 </div>
                 
             </div>

             
                 
             )
         })}                                    
         
 </Fragment>
             </>}
             </>}
             
             
            
         
 
         
         </div>
         </div>
     );
};

export default Zadaci;


