import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { MdWorkOutline  } from "react-icons/md";
import Popup from 'reactjs-popup';
import { BrowserRouter as Router, Route,Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { BsInfoSquare } from "react-icons/bs";


const MojiZadaci = () => {

    const[listaZadataka, setListaZadataka] = useState('');

    const idZaposlenika = JSON.parse(localStorage.getItem("user")).idzaposlenika;
    console.log(idZaposlenika)
    let history = useHistory(); 

    const prioData = [
        {
            value: '',
            label: 'bez filtera'
        },
        {
            value:1,
            label:"nizak"
        },
        {
            value:2,
            label:"srednji"
        },
        {
            value:3,
            label:"visok"
        }
    ];

    const [prio1, setPrio1] = useState('');
    const handleChange1 = e => {
        setPrio1(e.value);
    }

    const [prio2, setPrio2] = useState('');
    const handleChange2 = e => {
        setPrio2(e.value);
    }

    const [prio3, setPrio3] = useState('');
    const handleChange3 = e => {
        setPrio3(e.value);
    }

    let gotoviZadaci = [];
    let aktivniZadaci = [];
    let planiraniZadaci = [];

    const getZadaci = async () => {
        try {       
                const response = await fetch(
                    `/task/allusertasks/${idZaposlenika}`,

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
            console.log(listaZadataka)         
        } catch (err) {
            console.error(err.message);            
        }
    }
    useEffect(() => {
        getZadaci();
      }, []);

      if(listaZadataka !== ''){
        for(const zad of listaZadataka){
            console.log(zad);
           if(zad.zadatak.idstatusa === 3){
               var o = zad.zadatak;  
               o["projekt"] = zad.projekt.nazivprojekta;             
               gotoviZadaci.push(o);
           }
           else if(zad.zadatak.idstatusa === 2){
              var o = zad.zadatak;    
              o["projekt"] = zad.projekt.nazivprojekta;   
                  
              aktivniZadaci.push(o);
           }else if(zad.zadatak.idstatusa === 1){
              var o = zad.zadatak; 
              o["projekt"] = zad.projekt.nazivprojekta;             
              planiraniZadaci.push(o);
           }
        }     
     } 

     console.log(aktivniZadaci)

    const [sortConfig1, setSortConfig1] = useState('');
    const requestSort1 = key => {
        let direction = 'ascending';
        if (sortConfig1.key === key && sortConfig1.direction === 'ascending') {
        direction = 'descending';
        }
        setSortConfig1({ key, direction });
    }

    const [sortConfig2, setSortConfig2] = useState('');
    const requestSort2 = key => {
        let direction = 'ascending';
        if (sortConfig2.key === key && sortConfig2.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig2({ key, direction });
    }

    const [sortConfig3, setSortConfig3] = useState('');
    const requestSort3 = key => {
        let direction = 'ascending';
        if (sortConfig3.key === key && sortConfig3.direction === 'ascending') {
        direction = 'descending';
        }
        setSortConfig3({ key, direction });
    }

    let izlaz = '';
    function datumCheck(param) {
        const [year, month, day] =  param.split('-')

        izlaz =  `${day}.${month}.${year}`;
        return izlaz;        
    }


    return (                

        <div class="container-zadaci">
            
 
            {listaZadataka === '' ? <div class="loader"></div> : <><div class="gotovi-zadaci">
            <div className="sort-btn-box">
                 <h1>Završeni</h1>   
                 <button type="button" className="task-title sort-btn" onClick={() => requestSort1('opiszadatka')}>OPIS</button>     
                 <button type="button" className="task-title sort-btn" onClick={() => requestSort1('idprioriteta')}>PRIORITET</button>      
                 <button type="button" className="task-title sort-btn" onClick={() => requestSort1('plandatkraj')}>PLANIRANI ROK</button>    
                 <Select       
                 className="filter-box"    
                 placeholder="Odaberite prioritet"
                 value={prioData.find(obj => obj.value === prio1)}
                 options={prioData} 
                 onChange={handleChange1}
                 />         
             </div>
            
                 <Fragment>               
 
                     {Object.values(gotoviZadaci).sort((a, b) => {
                         if (a[sortConfig1.key] < b[sortConfig1.key]) {
                             return sortConfig1.direction === 'ascending' ? -1 : 1;
                           }
                           if (a[sortConfig1.key] > b[sortConfig1.key]) {
                             return sortConfig1.direction === 'ascending' ? 1 : -1;
                           }
                           return 0;
                         
     }).filter((zad) => {
         if(prio1 == ''){
             return zad;
         } else if (zad.idprioriteta == prio1){
             return zad;
         }
     }).map((zadatak) => {
 
                         return (
 
                             <div class="card bg-c-green order-card">
                                 <div class="card-block">
                                 <div className="task-title">
                                         {zadatak.projekt}
                                     </div>
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
                                     <Popup trigger={<BsInfoSquare size={28} color="black" />} modal className="popup2">
                                                {close => (
                                                     <div>
                                                         <div className="popup-text">
                                                             Informacije o zadataku:
                                                             <hr className="dashed"></hr>
                                                             -- {zadatak.opiszadatka} --
                                                         </div>
                                                         <br />
                                                         <div class="card bg-c-green order-card">
                                                             <div class="card-block card-popup">
                                                                 <div className="task-title-popup">
                                                                     Planirani datum početka: {zadatak.plandatpoc ? datumCheck(zadatak.plandatpoc) : '-'}
                                                                 </div>
                                                                 <div className="task-title-popup">
                                                                     Planirani datum završetka: {zadatak.plandatkraj ? datumCheck(zadatak.plandatkraj) : '-'}
                                                                 </div>
                                                                 <div className="task-title-popup">
                                                                     Datum početka: {zadatak.datpoc ? datumCheck(zadatak.datpoc) : '-'}
                                                                 </div>
                                                                 <div className="task-title-popup">
                                                                     {zadatak.datpoc ? 'Datum završetka:' + ' ' + datumCheck(zadatak.datpoc) : ''}
                                                                 </div>
                                                                 <div className="task-title-popup" style={zadatak.idprioriteta === 1 ? { color: "green" } : zadatak.idprioriteta === 2 ? { color: "yellow" } : { color: "red" }}>
                                                                    Prioritet: {zadatak.idprioriteta === 1 ? '  ' + 'nizak' : zadatak.idprioriteta === 2 ? ' ' + 'srednji' : '  visok'}
                                                                 </div>  
                                                                 <hr className="dashed"></hr>                                                                
                                                                 <div className="task-title-popup">
                                                                     Planirani broj radnih sati: {zadatak.planbrsati ? zadatak.planbrsati : '-'}
                                                                 </div>
                                                                 <div className="task-title-popup">
                                                                     Broj radnih sati: {zadatak.brsati ? zadatak.brsati : '-'}
                                                                 </div>
                                                             </div>
                                                         </div>
 
 
 
 
                                                         <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => { close(); } }>
                                                             <div>Izlaz</div>
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
                 </div>

                 <div class="radni">

                    <h1>U tijeku</h1>
                    <button type="button" className="task-title sort-btn" onClick={() => requestSort2('opiszadatka')}>OPIS</button>     
                    <button type="button" className="task-title sort-btn" onClick={() => requestSort2('idprioriteta')}>PRIORITET</button>      
                    <button type="button" className="task-title sort-btn" onClick={() => requestSort2('plandatkraj')}>PLANIRANI ROK</button> 
                    <Select     
                        className="filter-box"        
                        placeholder="Odaberite prioritet"
                        value={prioData.find(obj => obj.value === prio2)}
                        options={prioData} 
                        onChange={handleChange2}
                    /> 


                    <Fragment>

                        {Object.values(aktivniZadaci).sort((a, b) => {
                        if (a[sortConfig2.key] < b[sortConfig2.key]) {
                            return sortConfig2.direction === 'ascending' ? -1 : 1;
                          }
                          if (a[sortConfig2.key] > b[sortConfig2.key]) {
                            return sortConfig2.direction === 'ascending' ? 1 : -1;
                          }
                          return 0;
                        
    }).filter((zad) => {
        if(prio2 == ''){
            return zad;
        } else if (zad.idprioriteta == prio2){
            return zad;
        }
    }).map((zadatak) => {
                            return (

                                <div class="card bg-c-blue order-card">
                                    <div class="card-block">
                                    <div className="task-title">
                                         {zadatak.projekt}
                                     </div>
                                        <div className="task-title">
                                            {zadatak.opiszadatka}
                                        </div>                                       


                                        <hr className="dashed"></hr>
                                        <div className="task-info-box">
                                            <div className="task-info">PRIORITET:&nbsp;</div>
                                            <div className="task-info" style={zadatak.idprioriteta === 1 ? { color: "green" } : zadatak.idprioriteta === 2 ? { color: "yellow" } : { color: "red" }}>
                                                {zadatak.idprioriteta === 1 ? '  ' + 'nizak' : zadatak.idprioriteta === 2 ? ' ' + 'srednji' : '  visok'}
                                            </div>
                                        </div>


                                        <div className="task-info-box">
                                            <div className="task-info">PLANIRANI BROJ SATI: &nbsp;</div>
                                            <div className="task-info">{zadatak.planbrsati} h</div>
                                        </div>

                                        <div className="task-info-box">
                                            <div className="task-info">BROJ RADNIH SATI:&nbsp;</div>
                                            <div className="task-info">{!zadatak.brsati ? 0 : zadatak.brsati} h</div>
                                        </div>






                                        <div className="edit-box">
                                        <Popup trigger={<BsInfoSquare size={28} color="black" />} modal className="popup2">
                                               {close => (
                                                    <div>
                                                        <div className="popup-text">
                                                            Informacije o zadataku:
                                                            <hr className="dashed"></hr>
                                                            -- {zadatak.opiszadatka} --
                                                        </div>
                                                        <br />
                                                        <div class="card bg-c-green order-card">
                                                            <div class="card-block card-popup">
                                                                <div className="task-title-popup">
                                                                    Planirani datum početka: {zadatak.plandatpoc ? datumCheck(zadatak.plandatpoc) : '-'}
                                                                </div>
                                                                <div className="task-title-popup">
                                                                    Planirani datum završetka: {zadatak.plandatkraj ? datumCheck(zadatak.plandatkraj) : '-'}
                                                                </div>
                                                                <div className="task-title-popup">
                                                                    Datum početka: {zadatak.datpoc ? datumCheck(zadatak.datpoc) : '-'}
                                                                </div>
                                                                <div className="task-title-popup" style={zadatak.idprioriteta === 1 ? { color: "green" } : zadatak.idprioriteta === 2 ? { color: "yellow" } : { color: "red" }}>
                                                                   Prioritet: {zadatak.idprioriteta === 1 ? '  ' + 'nizak' : zadatak.idprioriteta === 2 ? ' ' + 'srednji' : '  visok'}
                                                                </div>  
                                                                <hr className="dashed"></hr>
                                                                <div className="task-title-popup">
                                                                    Planirani broj radnih sati: {zadatak.planbrsati ? zadatak.planbrsati : '-'}
                                                                </div>
                                                                <div className="task-title-popup">
                                                                    Broj radnih sati: {zadatak.brsati ? zadatak.brsati : '-'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => { close(); } }>
                                                            <div>Izlaz</div>
                                                        </div>

                                                    </div>
                                                )}

                                        
                                            </Popup>
                                            <Link to={`/zadatak/finish/${zadatak.idzadatka}`}>
                                                <AiIcons.AiOutlineCheck size={28} color="black" />
                                            </Link>

                                            <Link to={`/zadaci/izmjena/21/${zadatak.idzadatka}`}>
                                                <AiIcons.AiOutlineEdit size={28} color="black" />
                                            </Link>                                      

                                        </div>

                                    </div>

                                </div>



                            );
                        })}

                    </Fragment>
                    </div><div class="najavljeni">

<div className="div-neki2">
    <div className="div-neki-child"><h1>Planirani</h1></div>
    <div className="div-neki-child2">
    </div>
    
</div>
<button type="button" className="task-title sort-btn" onClick={() => requestSort3('opiszadatka')}>OPIS</button>     
<button type="button" className="task-title sort-btn" onClick={() => requestSort3('idprioriteta')}>PRIORITET</button>      
<button type="button" className="task-title sort-btn" onClick={() => requestSort3('plandatkraj')}>PLANIRANI ROK</button> 
<Select         
    className="filter-box"    
    placeholder="Odaberite prioritet"
    value={prioData.find(obj => obj.value === prio3)}
    options={prioData} 
    onChange={handleChange3}
/> 





<Fragment>

    {Object.values(planiraniZadaci).sort((a, b) => {
    if (a[sortConfig3.key] < b[sortConfig3.key]) {
        return sortConfig3.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig3.key] > b[sortConfig3.key]) {
        return sortConfig3.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    
}).filter((zad) => {
if(prio3 == ''){
return zad;
} else if (zad.idprioriteta == prio3){
return zad;
}
}).map((zadatak) => {
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
                    <Popup trigger={<BsInfoSquare size={28} color="black" />} modal className="popup2">
                           {close => (
                                <div>
                                    <div className="popup-text">
                                        Informacije o zadataku:
                                        <hr className="dashed"></hr>
                                        -- {zadatak.opiszadatka} --
                                    </div>
                                    <br />
                                    <div class="card bg-c-green order-card">
                                        <div class="card-block card-popup">
                                            <div className="task-title-popup">
                                                Planirani datum početka: {zadatak.plandatpoc ? datumCheck(zadatak.plandatpoc) : '-'}
                                            </div>
                                            <div className="task-title-popup">
                                                Planirani datum završetka: {zadatak.plandatkraj ? datumCheck(zadatak.plandatkraj) : '-'}
                                            </div>
                                            <div className="task-title-popup">
                                                Datum početka: {zadatak.datpoc ? datumCheck(zadatak.datpoc) : '-'}
                                            </div>
                                            <div className="task-title-popup" style={zadatak.idprioriteta === 1 ? { color: "green" } : zadatak.idprioriteta === 2 ? { color: "yellow" } : { color: "red" }}>
                                               Prioritet: {zadatak.idprioriteta === 1 ? '  ' + 'nizak' : zadatak.idprioriteta === 2 ? ' ' + 'srednji' : '  visok'}
                                            </div>  
                                            <hr className="dashed"></hr>                                            
                                            <div className="task-title-popup">
                                                Planirani broj radnih sati: {zadatak.planbrsati ? zadatak.planbrsati : '-'}
                                            </div>
                                            <div className="task-title-popup">
                                                Broj radnih sati: {zadatak.brsati ? zadatak.brsati : '-'}
                                            </div>
                                        </div>
                                    </div>




                                    <div className="anew btn btn-2 navlinkother btn-noborder" onClick={() => { close(); } }>
                                        <div>Izlaz</div>
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
                    

                 
                 );

}



export default MojiZadaci;