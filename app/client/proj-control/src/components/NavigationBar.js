import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

function NavigationBar(){

    const logout = async (e) => {
        e.preventDefault();
        try {
          localStorage.removeItem("token");
          setAuth(false);
          toast.success("Uspjesno ste se odjavili!");
          window.location.reload(false);
        } catch (err) {
          console.error(err.message);
        }
      };

    const checkAuthenticated = async () => {
        try {
          const res = await fetch("http://localhost:5000/auth/verify", {
            method: "POST",
            headers: { jwt_token: localStorage.token }
          });
    
          const parseRes = await res.json();
    
          parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
          console.error('checkAuthenticated error: ', err.message);
        }
      };
    
      useEffect(() => {
        checkAuthenticated();
      }, []);
    
      const [isAuthenticated, setIsAuthenticated] = useState(false);

      const setAuth = boolean => {
        setIsAuthenticated(boolean);
      };
    

      const guestLinks = () => (
        <Fragment> 
            <div className = 'btn-con'>
                <a href="/signup" className="anew navlinkother btn btn-2">
                    Registracija
                </a>
            </div>

            <div className="btn-con">
                <a href="/login" className="anew navlinkother btn btn-2 ">
                    Prijava
                </a>
            </div>
        </Fragment>

    );

      const authLinks = () => (
        <Fragment>
            <div className="btn-con">
                <a href="./mojiprojekti" className="anew navlinkother btn btn-2 ">
                    Moji projekti
                </a>
            </div>

            <div className="btn-con">
                <a href="#" className="anew navlinkother btn btn-2 ">
                    Upravljanje računom
                </a>
            </div>

            <div onClick={logout}>
                <a href='/' className="anew navlinkother btn btn-2 ">                
                    Odjava
                </a>
            </div>
        </Fragment>
      );

    return (
        <Fragment>            
        <nav className="navbar-flex-container navbar">
            <div className="left-navbar">
                <div className='navbarlinkholder' >
                    <a href="/" className='anew btn btn-2 homelink'>
                        ProjControl
                    </a>
                </div>
            </div>            
            <div className="right-navbar">       
                {isAuthenticated ? authLinks() : guestLinks()}
            </div>
        </nav>
    </Fragment>
    );
};

export default NavigationBar;