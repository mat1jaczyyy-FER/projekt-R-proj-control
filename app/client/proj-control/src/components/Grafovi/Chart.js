import React from 'react'
import  { useEffect, useState } from "react";
import { Line, Pie } from 'react-chartjs-2'
import 'chart.js/auto';
import { useParams } from 'react-router';


//defaults.global.tooltips.enabled = false
//defaults.global.legend.position = 'bottom'

const Charts = () => {
  const projectid=useParams().pid;
  var completed=0;
  var uncompleted=0;
  var planned=0;
  const[listaZadataka, setListaZadataka] = useState('');

  
// __________________________---DOHVACANJE SVIH ZADATAKA---______________________________________________
  const getZadatci = async projectid => {
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

const[listaBurndown, setListaBurndown] = useState([]);
const[listaPlanZad, setListaPlanZad] = useState([]);
const[listaTime, setListaTime] = useState([]);



const getBurndown = async projectid => {
  try {       
          const response = await fetch(
              `http://localhost:5000/project/getProjectStatistics/${projectid}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            
          }
      );
      const jsonData = await response.json();
      //jsonData.filter(n => n.total>0);
      //console.log(jsonData)

      for(const k of jsonData.filter(t=> (t.total-t.resolved)>0)){
        //listaBurndown.addItem(k.resolved)
        //console.log(k);
        //if(k.resolved>0 && k.total>0 ){
          setListaBurndown(t => [...t,k.total-k.resolved]);
          setListaTime(m => [...m,(new Date(Date.parse(k.ts))).toLocaleDateString() ]);
          setListaPlanZad(f => [...f, k.totalplanned-k.resolvedplaned]);
        //}
      }
      //console.log(listaBurndown);
      //setListaBurndown(jsonData);
      
      //console.log(listaTime)
  } catch (err) {
      console.error(err.message);
      
  }
}

useEffect(() => {
  getZadatci(projectid);
  getBurndown(projectid);
}, []);

if(listaZadataka !== ''){
Object.values(listaZadataka)
  .filter(zadatak => zadatak.idstatusa === 2)
  .map((zadatak) => {uncompleted+=1})
Object.values(listaZadataka)
  .filter(zadatak => zadatak.idstatusa === 3)
  .map((zadatak) => {completed+=1})
Object.values(listaZadataka)
  .filter(zadatak => zadatak.idstatusa === 1)
  .map((zadatak) => {planned+=1})
}


//__________________BURNDOWN CHART FUNKCIJE I VARIJABLE___________________________________
//const burndownData=[200, 160, 160, 140, 90, 90, 80, 50, 30, 8];
//const scopeChange=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//const [scopeChange,setScope]=useState([]);
//console.log(listaTime);
//console.log(listaBurndown);
//console.log(getMax(listaBrojZad));


//for(let b=0;b<listaTime.length;b++){
  //setScope(f => [...f, 0]);
  //}

//defaults.global.defaultFontFamily = "Arial";
//Chart.defaults.global.defaultFontSize = 14;

//const brojDovrsenihZadataka = listaBurndown[0];
//const idealniBrojZadataka = brojDovrsenihZadataka / 9;
//var i = 0;

function getMax(lista) {
  let max=lista[0];
  for(let x=1;x<lista.length;x++){
    if(lista[x]>lista[x-1]){
      max=lista[x];
    }
  }
  return max;
}
//______________________________________________________________________________________________
  return (
    <div>
      <div>
      <Pie style={ { fontsize:"30" }}
        data={{
          labels: ['Završeni', 'U tijeku','Planirani'],
          datasets: [
            {
              label: '# zadataka',
              data: [completed, uncompleted, planned],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
                
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
                
              ],
              borderWidth: 1,
            },
            
          ],
        }}
        height={400}
        width={600}
        options={{
          title:{
            display:true
          },
        
          legend: {
            labels: {
              font: {
                size: 25
            }
            },
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          }
          
        }}
      />
      </div>

      <div>
      <Line
      data={{
        //labels:[ "Prvi dan",	"Drugi dan",	"Treći dan",	"Četvrti dan",	"Peti dan",	"Šesti dan",	"Sedmi dan",	"Osmi dan",	"Deveti dan", "Deseti dan"],
        labels:listaTime,
        datasets: [
          {
            label: "Broj nedovršenih zadataka",
            //data: burndownData,
            data:listaBurndown,
            fill: false,
            borderColor: "#EE6868",
            backgroundColor: "#EE6868",
            lineTension: 0,
          },
          {
            label: "Ukupan broj zadataka",
            data:listaPlanZad,
            borderColor: "#6C8893",
            backgroundColor: "#6C8893",
            
            
          }
        ],
      }}
      height={400}
      width={800}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero:true,
                max: Math.round(getMax(listaPlanZad)+1.1),
              },
            },
          ],
        },
        legend: {
          display:true,
          position:'top',
          labels:{
            fontSize:25,
            boxWidth:80,
            fontColor:'black'
          }
        },
        
      }}
    />
    </div>

    </div>
   
  )
}

export default Charts