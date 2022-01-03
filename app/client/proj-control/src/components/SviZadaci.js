import React, { Fragment, useEffect, useState } from "react";

const SviZadaci = () => {

    const[listaZadataka, setListaZadataka] = useState([]);
    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    console.log(projectid);


/*dohvat svih zadataka za zadani projekt*/
    
const getZadaci = async projectid => {
    try {       
            const response = await fetch(
                `http://localhost:5000/allprojecttasks/${projectid}`,
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

  console.log(listaZadataka);

  

  

    return (
        <div>
            bok
        </div>
    )
}



export default SviZadaci ;
