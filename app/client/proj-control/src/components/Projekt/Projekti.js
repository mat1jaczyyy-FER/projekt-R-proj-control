
import { PieChart } from 'react-minimal-pie-chart';
   
import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, 
    Route,
    Redirect, Switch, useHistory
    } 
    from 'react-router-dom';
import { toast } from 'react-toastify';


const Projekti = () => {    
    let history = useHistory();    

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

    
    //pomocna funkcija za izbrisat kasnije
    const brisanjeProjekta = async (idProjekta) => {
        try {       
            const response = await fetch(
                `http://localhost:5000/project/delete/${idProjekta}`,
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
            toast.success("Projekt obrisan!")
            history.push('/projekti')
            getProjekti(idVlasnika);
        }
        
        } catch (err) {
            console.error(err.message);
            
        }

    }

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
           
                {Object.values(listaProjekata).map((projekt) => {
                    return (

                        <div className='svi-projekti'>
                            <div class="card bg-c-green order-card">
                                <div class="card-block">
                                     <div className="project-title">
                                         {projekt.nazivprojekta}
                                    </div>                     
                                    <hr className="dashed"></hr>     

                                    <div className="project-desc">                     
                                        {'OPIS: ' + projekt.opisprojekta}
                                    </div>   
                                </div>
                            </div>



                        </div>                        
                    )
                })}                                    
               
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

        
