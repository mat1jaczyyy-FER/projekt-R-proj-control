
import { PieChart } from 'react-minimal-pie-chart';
   
import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';


const Projekti = () => {        

    const[listaProjekata, setListaProjekata] = useState([]);

    const idzaposlenika = JSON.parse(localStorage.getItem("user")).idzaposlenika;
    const idVlasnika = idzaposlenika;
    console.log(idVlasnika);
    localStorage.removeItem("projectID");

    /*dohvat svih projekata*/
    
    const getProjekti = async idVlasnika => {
        try {       
                const response = await fetch(
                    `http://localhost:5000/project/alluserprojects/${idVlasnika}`,
                {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Content-type": "application/json"
                  },
                  
                }
            );
            const jsonData = await response.json();

            setListaProjekata(jsonData);
            
        } catch (err) {
            console.error(err.message);
            
        }
    }

    
    

    useEffect(() => {
        getProjekti(idVlasnika);
      }, []);
    
      console.log(listaProjekata);

      console.log(Object.values(listaProjekata))


    return (
       /* <Fragment>
        <div className="container">
        {Object.values(listaProjekata).map((projekt) => {
            return (

            <div className="card">
                <h3 className="title">{projekt.nazivprojekta}</h3>                             
                <h4 className="title">Status: {projekt.idstatusa == '1' ? "Nije započet" : "U tijeku" }</h4>
                <h4 className="title">ID: {projekt.idprojekta}</h4>
                
               
                <div className="bar">
                
                    <div className="emptybar"></div>
                    <div className="filledbar"></div>
                </div>

                <a href="/svizadaci" className= 'a4 btn-4' onClick={localStorage.setItem("projectID", JSON.stringify(projekt.idprojekta))}>KRENI</a>

               
            </div>
            )
        })}
                
        </div>
        </Fragment>*/      

        
        <Fragment>
           
           {" "}
            <table>
                <thead>
                    <tr>
                    <th>ID projekta</th>
                    <th>Naziv</th>
                    <th>Planirani početak</th>
                    <th>Planirani završetak</th>
                    <th>Stvarni početak</th>
                    <th>Stvarni završetak</th>
                    <th>ID statusa</th>
                    <th>ID vlasnika</th>
                    <th>opis</th>
                    </tr>
                </thead>
                <tbody>
                {Object.values(listaProjekata).map((projekt) => {
                    return (
                        <tr key={projekt.idprojekta}>
                            <td>{projekt.idprojekta}  <Link to={`/svizadaci/` + projekt.idprojekta} className= 'a4 btn-4' onClick={localStorage.setItem("projectID", JSON.stringify(projekt.idprojekta))}></Link></td>
                            <td>{projekt.nazivprojekta}</td>
                            <td>{projekt.plandatpoc}</td>  
                            <td>{projekt.plandatkraj}</td>  
                            <td>{projekt.datpoc}</td>        
                            <td>{projekt.datkraj}</td>
                            <td>{projekt.idstatusa}</td>
                            <td>{projekt.idvlasnika}</td>
                            <td>{projekt.opis}</td>                  
                         </tr>
                    )
                })}                                    
                </tbody>
            </table>
        </Fragment>

    );
            };
 

export default Projekti;



        /*<div className="project-overview">
            <div className="project-info">
            <div className="project-name">
                <h1> PROJEKT TEST</h1>
            </div>
            <div className="vlasnik">
                <h1> IME VLASNIKA </h1>
            </div>
            <div className="status-projekta">STATUS</div>
            <div className="opis-projekta"></div>
            <div className="datumi"></div>
            <div className="broj-zaposlenih"></div>
        </div>
        <div className="progress-chart">
        <div className="piechart-box">
                <div className='piechart-box'>
                    <PieChart
                     label={({ dataEntry }) => dataEntry.title}
                     data={[
                        { value: 10, color: '#E38627', title: "završeni"},
                        { value: 15, color: '#C13C37', title: "u tijeku"},
                        { value: 20, color: '#6A2135', title: "nezapočeti"},
                    ]}
                    labelStyle={{
                        ...defaultLabelStyle,
                      }}                      
                 />;
                </div>
    </div>
  </div>
  <div className="stats"></div>
  <div className="gantt-chart"></div>
</div>*/

        
