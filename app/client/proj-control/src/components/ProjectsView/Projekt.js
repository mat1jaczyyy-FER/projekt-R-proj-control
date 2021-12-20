import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

function Project(){
    const [project, setProject]=useState({
        nazivProjekta:"",
        planDatPoc:"",
        planDatKraj:"",
        datPoc:"",
        datKraj:"",
        idStatusa:"",
        idVlasnika:""
    });

    //const location= useLocation;
    //const projekt= location.state;
    //setProject(projekt);

    return(

        <div>

        </div>

    );
}


export default Project;

