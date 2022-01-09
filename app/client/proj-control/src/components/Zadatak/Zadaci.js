import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { MdWorkOutline  } from "react-icons/md";
import Popup from 'reactjs-popup';
import { BrowserRouter as Router, Route,Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';



const Zadaci = () => {

    const[listaZadataka, setListaZadataka] = useState('');

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
        const idZaposlenika = localStorage.getItem("user").idzaposlenika;
        try {       
                const response = await fetch(
                    `http://localhost:5000/task/usertask/${idZaposlenika}`,

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

    
    return (



      
        <div className="content">
            <br />
            <h1>    Ovdje će se prikazivati zadaci dodijeljeni trenutnom useru</h1>
            
        </div>
    );
};

export default Zadaci;


