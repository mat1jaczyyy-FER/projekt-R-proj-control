import React from "react";
import NavigationBar from '../components/NavigationBar';
const Layout = ({children}) => {    
    return (
        <div>
            <NavigationBar />
            {children}
        </div>
    );
};

export default Layout;