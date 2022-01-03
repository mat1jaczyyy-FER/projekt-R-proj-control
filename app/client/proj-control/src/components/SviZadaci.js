import React, { Fragment, useEffect, useState } from "react";

const SviZadaci = () => {

    const[listaZadataka, setListaZadataka] = useState([]);
    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    console.log(projectid);


/*dohvat svih zadataka za zadani zadatak*/
    
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

  console.log(listaZadataka);

  

  

    return (
        <div>
            Hello there
        </div>
    )
    /*return (
        <Fragment>
           listaZadataka.length === 0 ? <div>Nema zadataka</div> : (<><table>
                <thead>
                    <tr>
                    <th>Opis zadatka</th>
                    <th>Planirani početak</th>
                    <th>Planirani završetak</th>
                    <th>Broj radnih sati</th>
                    <th>ID statusa</th>
                    <th>ID projekta</th>
                    </tr>
                </thead>
                <tbody>
                {Object.values(listaZadataka).map((zadatak) => {
                    return (
                        <tr key={zadatak.idzadataka}>
                            <td>{zadatak.opis}</td>   
                            <td>{zadatak.plandatpoc}</td>
                            <td>{zadatak.plandatkraj}</td>
                            <td>{zadatak.planbrsati}</td>
                            <td>{zadatak.idstatusa}</td>
                            <td>{zadatak.idprojekta}</td>                
                         </tr>
                    )
                })}                                    
                </tbody>
            </table>
           </>)}
           
        </Fragment>
    )*/
}



export default SviZadaci ;
