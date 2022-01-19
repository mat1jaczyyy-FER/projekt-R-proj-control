
import { PieChart } from 'react-minimal-pie-chart';
   
import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, 
    Route,
    Redirect, Switch, useHistory
    } 
    from 'react-router-dom';
import { toast } from 'react-toastify';
import { GrStatusInfo } from "react-icons/gr";



const Projekti = () => {    
    let history = useHistory();
    const [loading, setLoading] = useState(true);
    const [imaProjekata, setImaProjekata] = useState(false)

    const[listaProjekata, setListaProjekata] = useState([]);

    const idzaposlenika = JSON.parse(localStorage.getItem("user")).idzaposlenika;
    const idVlasnika = idzaposlenika;
    console.log(idVlasnika);
    localStorage.removeItem("projectID");

    /*dohvat svih projekata*/
    
    const getProjekti = async idVlasnika => {
        try {       
                const response = await fetch(
                    process.env.URL_PREFIX + `/project/alluserprojects/${idVlasnika}`,
                {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Content-type": "application/json"
                  },
                  
                }
            );
            const jsonData = await response.json();
            setLoading(false);
            if (jsonData.lenght !== 0) setImaProjekata(true)
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
      
        <Fragment>             
           <div className='svi-projekti'> 
           {loading ? <div class="loader"></div> : <>
            {!imaProjekata ? <div className="proj-title">Nema projekata u kojima sudjelujete!</div> : <>
                {Object.values(listaProjekata).map((projekt) => {
                    return (                        
                            <div class="card bg-c-custom2 order-card">
                                <div class="card-block">
                                     <div className="proj-title">                                        
                                         <Link to={`/projektinfo/` + projekt.idprojekta} className= 'btn-4'> {projekt.nazivprojekta}</Link>
                                    </div>      

                                    <div className="proj-title">                                        
                                        Status: {projekt.idstatusa === 1 ? 'Nije započet' : projekt.idstatusa === 2 ? 'Rad u tijeku' : 'Završen'}
                                    </div>                 
                                    <hr className="dashed"></hr>     

                                    <div className="proj-title">                     
                                    <Link to={`/svizadaci/` + projekt.idprojekta} className= 'btn-4'>Pregled zadataka</Link>
                                    </div>   
                                </div>
                            </div>                       
                                                
                    )
                })}
           </>}         
                      
                </>}                              
               </div>
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

        
