import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const AddZaposlenik = () => {

    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    console.log(projectid)

    const[listaZaposlenika, setListaZaposlenika] = useState('');

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
    
            setListaZaposlenika(jsonData);
            console.log(listaZaposlenika)
            
            
        } catch (err) {
            console.error(err.message);
            
        }
    }
    useEffect(() => {
        getZaposlenici();
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
        }
        
    } catch (err) {
        console.error(err.message);
        
    }
    }
    





    return (

        <div>Bok

        <Fragment>
           
        {" "}
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
             {Object.values(listaZaposlenika).map((zaposlenik) => {
                
                 return (
                     <tr key={zaposlenik.idzaposlenika}>
                         <td>{zaposlenik.imezaposlenika}</td>
                         <td>{zaposlenik.prezimezaposlenika}</td>
                         <td>{zaposlenik.korisnickoime}</td>
                         <td><button className="add-btn btn-noborder" onClick={() => handleAdd(projectid, zaposlenik.idzaposlenika)}> <AiOutlinePlusCircle size={60} color="white" /></button></td>                                              
                      </tr>
                 )
             })}                                    
             </tbody>
         </table>
     </Fragment>
     </div>
    )
}



export default AddZaposlenik;