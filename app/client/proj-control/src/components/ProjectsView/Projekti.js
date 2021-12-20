/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'
import ContainerProjekti from './ContainerProjekti';
//import {Link} from 'react-router-dom';
let list=[];
function Projekti() {
    //const [users, setUsers] = React.useState();
    const [projects, setProjects]=useState({list:[{
          project:""
    }]});
    

    useEffect(async()=>{
        await(fetch('api/project/alluserprojects', {
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify({idVlasnika: localStorage.getItem("token").user_id},)
          }))
        .then(function(response) {
          if (response.status === 401) {
            window.location = "/"
            return;
          } else { 
            return response.json();}
        }).then(data=>{
          try{
            for(var i=0;i<data.projects.length;i++){
              list[i]={
                nazivProjekta:data.projects[i].nazivProjekta,
                planDatPoc:data.projects[i].planDatPoc,
                planDatKraj:data.projects[i].planDatKraj,
                datPoc:data.projects[i].datPoc,
                datKraj:data.projects[i].datKraj,
                idStatusa:data.projects[i].idStatusa,
                idVlasnika:data.projects[i].idVlasnika
              }
            }
            setProjects({list:list});
            console.log("projekti"+projects.list);
          }
          catch{
            console.log(data)
          }
           
        });
      },[])

  return(
    <div>
        <div >
            <div >
                <h1 className="title">Popis projekata</h1>
                <h5 className="containerProjekti"><span>Naziv projekta</span><span>Planirani početak</span><span>Planirani Kraj</span><span>Početak</span><span>Kraj</span><span>Status</span><span>Vlasnik</span></h5>
                <hr />
                {/* {projects.list.map(t=>ContainerProjekti(t))}  */}
            </div>
            </div>
        </div>);
}

export default Projekti;


