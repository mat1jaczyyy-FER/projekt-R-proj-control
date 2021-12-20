import React, {useState}from "react"
import { useHistory } from "react-router";


//import moment from 'moment';
//import Transactions from "../Transactions/Transactions"; 



const ContainerProjekti = (props) =>{
   //const history= new useHistory();
   var string="";
   let list=[];

   const goToProject=async (nazivProjekta)=>{
        fetch('/api/project/project',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          credentials:'same-origin',
          body: JSON.stringify({nazivProjekta:nazivProjekta,idVlasnika:localStorage.getItem("token").user_id}),
        }).then(function(response) {         
          if (response.status === 401) {
            window.location = "/"
            return;
          } else { 
            return response.json();}
        }).then(data=>{
              try{
                // eslint-disable-next-line react-hooks/rules-of-hooks
                //history.push("/projekt",{state:data});
            
                console.log(list);
                //navigate('/tasks', {state:list}) 
                  
              }catch{
                  console.log("NE PROLAZI")
                }
          });
        }
          
    return (
        <div id={props.idVlasnika}>
          <h5 className="container">
            <span style={{fontSize:20}}><button onClick={goToProject(props.nazivProjekta)}>{props.nazivProjekta}</button></span>
            <span style={{fontSize:20}} >{props.planDatPoc}</span>
            <span style={{fontSize:20}} >{props.planDatKraj}</span>
            <span style={{fontSize:20}}>{props.datPoc}</span>
            <span style={{fontSize:20}}>{props.datKraj}</span>
            <span style={{fontSize:20}}>{props.idStatusa}</span>
            <span style={{fontSize:20}}>{props.idVlasnika}</span>
            </h5>
        </div>
    )
}

export default ContainerProjekti;
