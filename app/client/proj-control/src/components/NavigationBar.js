import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideBarData } from './SideBarData';
import { IconContext } from 'react-icons';
import './Navbar.css';


function NavigationBar(){

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const projectid = localStorage.getItem("projecID");


  

    const logout = async (e) => {
        e.preventDefault();
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
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
                <Link to='/projekti' className="anew navlinkother btn btn-2 ">
                Moji projekti
                </Link>
            </div>

            <div onClick={logout}>
                <a href='/' className="anew navlinkother btn btn-2 ">                
                    Odjava
                </a>
            </div>
        </Fragment>
      );

   

    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            {isAuthenticated ? <>
            <Link to='#' className='menu-bars1'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link></> : <h1 className="projcontrol-naslov">ProjControl</h1>}
            
            <div className="right-navbar">       
                {isAuthenticated ? authLinks() : guestLinks()}
            </div>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>

              
              {SideBarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
};

export default NavigationBar;