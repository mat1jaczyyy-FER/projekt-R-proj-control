import React, {Fragment} from "react";

function NavigationBar(){

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
            </div>
        </nav>
    </Fragment>
    );
};

export default NavigationBar;