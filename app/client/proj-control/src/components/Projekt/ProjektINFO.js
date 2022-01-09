import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';import { BrowserRouter as Router, Route, Redirect, Switch, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import { GrSchedulePlay } from "react-icons/gr"
import { GoTasklist } from "react-icons/go"
import { GoGraph } from "react-icons/go"
import { BsPeopleFill} from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { GrStatusInfo } from "react-icons/gr";


const ProjektINFO = () => {

    const projectid = (window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
    localStorage.setItem("projectID", projectid)
    const[projekt, setProjekt] = useState('');

    let history = useHistory();  
    const idzaposlenika = JSON.parse(localStorage.getItem("user")).idzaposlenika;
    const idVlasnika = idzaposlenika;
    console.log(idVlasnika);


    let izlaz = '';
    function datumCheck(param) {
        const [year, month, day] =  param.split('-')

        izlaz =  `${day}.${month}.${year}`;
        return izlaz;        
     }


    const getProjekt = async (projectid) => {
        try {       
                const response = await fetch(
                    `http://localhost:5000/project/${projectid}`,
    
                {
                  method: "GET",
                  mode: "cors",
                  headers: {
                    "Content-type": "application/json"
                  },
                  
                }
            );
            const jsonData = await response.json();
    
            setProjekt(jsonData);
            
            
        } catch (err) {
            console.error(err.message);
            
        }
    }
    useEffect(() => {
        getProjekt(projectid);
      }, []);

      if(projekt !== ''){
            console.log(Object.values(projekt)[0].nazivprojekta)
      }

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
            
        }
        
        } catch (err) {
            console.error(err.message);
            
        }

    }
    


    return(    
        

        <Fragment>
            {}

            {Object.values(projekt).map((p) => {

                return(

                    
                    <div className="project-box">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                <div class="card bg-c-green order-card">
                    <div class="card-block">
                        <div className="project-title">
                            {p.nazivprojekta}
                        </div>                     
                        <hr className="dashed"></hr>     

                        <div className="project-desc">                     
                            {'OPIS: ' + p.opisprojekta}
                        </div>   
                    </div>
                </div>

                <div className="task-dates">

                    <div class="card bg-c-pink order-card ">
                        <div class="card-block">

                            <div className="task-title">                     
                                <GrSchedulePlay size={28} />
                            </div>

                            <hr className="dashed"></hr>

                            <div className="task-title">                     
                                {'Planirani datum početka: ' + datumCheck(p.plandatpoc)}
                            </div>  

                            <div className="task-title">                     
                                {'Planirani datum završetka: ' + datumCheck(p.plandatkraj)}
                            </div>   

                        </div>                    
                    </div>

                    <div class="card bg-c-pink order-card ">
                        <div class="card-block">

                            <div className="task-title">                     
                                <GrSchedulePlay size={28} />
                            </div>

                            <hr className="dashed"></hr>

                            <div className="task-title">                     
                                {p.datpoc ? 'Datum početka: ' + datumCheck(p.datpoc) : 'Projekt nije započet'}
                            </div>  

                            <div className="task-title">                     
                               Datum završetka: {p.datkraj ? datumCheck(p.datkraj) : 'Projekt nije završen'}
                            </div>   

                        </div>                    
                    </div>

                </div>

                <div className="task-dates">
                <div class="card bg-c-blue order-card ">
                        <div class="card-block">
                            <div className="task-dates2">
                                 <div className="task-title">                     
                                    <GoTasklist size={60} color="black" />
                                </div>                    
                                <div className="task-title">                    
                                    <Link to={`/svizadaci/` + projectid} className="navlinkother btn btn-2">Pregled svih zadataka</Link>
                                </div>   
                            </div>                          

                           

                        </div>                    
                    </div>

                    <div class="card bg-c-blue order-card ">
                        <div class="card-block">
                            <div className="task-dates2">
                                 <div className="task-title">                     
                                    <GoGraph size={60} color="black" />
                                </div>                    
                                <div className="task-title">                    
                                    <Link to={`/svizadaci/` + projectid} className="navlinkother btn btn-2">Pregled statističkih grafova</Link>
                                </div>   
                            </div>                          

                           

                        </div>                    
                    </div>




                </div>

                <div className="task-dates">
                <div class="card bg-c-yellow order-card ">
                        <div class="card-block">
                            <div className="task-dates2">
                                 <div className="task-title">                     
                                    <BsPeopleFill size={60} color="black" />
                                </div>                    
                                <div className="task-title">                    
                                    <Link to={`/svizadaci/` + projectid} className="navlinkother btn btn-2">Zaposlenici</Link>
                                </div>   
                            </div>                          

                           

                        </div>                    
                    </div>

                    <div class="card bg-c-yellow order-card ">
                        <div class="card-block">
                            <div className="task-dates2">
                                 <div className="task-title">                     
                                    <GiMoneyStack size={60} color="black" />
                                </div>                    
                                <div className="task-title">                    
                                    <Link to={`/svizadaci/` + projectid} className="navlinkother btn btn-2">Pregled financija</Link>
                                </div>   
                            </div>              
                        </div>                    
                    </div>

                    <div class="card bg-c-custom3 order-card ">
                        <div class="card-block">
                            <div className="task-dates2">
                                 <div className="task-title">                     
                                    <GrStatusInfo size={60} color="black" />
                                </div>                    
                                <div className="task-title">                    
                                    <Link to={`/projekti/izmjena/` + projectid} className="navlinkother btn btn-2">Promjena statusa</Link>
                                </div>   
                            </div>              
                        </div>                    
                    </div>

                    <div class="card bg-c-custom3 order-card ">
                        <div class="card-block">
                            <div className="task-dates2">
                                 <div className="task-title">                     
                                    <GrStatusInfo size={60} color="black" />
                                </div>                    
                                <div className="task-title">                    
                                <a type="submit" className= 'navlinkother btn btn-2 btn-noborder' onClick={() => { if (window.confirm('Jeste li sigurni da želite obrisati projekt?')) brisanjeProjekta(projectid)}}>Obriši</a>
                                </div>   
                            </div>              
                        </div>                    
                    </div>
                </div>



                
                </div>
                )
            })}

        

        </Fragment>
       

       
    );

};


export default ProjektINFO;


    