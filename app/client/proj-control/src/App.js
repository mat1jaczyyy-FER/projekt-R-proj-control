import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Routes } from 'react-router-dom';
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import Layout from './hocs/Layout';

toast.configure();

function App() {
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
  

  /*return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path = '/' element = {<Homepage/>} />
          <Route exact path = '/login' element = {<Login/>} />
          <Route exact path = '/signup' element = {<SignUp/>} />
        </Routes>
      </Layout>    
    </Router>
  );*/
  return (
    <Fragment>
      <Router>
      <div className="container">
        
      <Layout>
        <Routes>
            <Route
              exact
              path="/"
              element={props =>
                !isAuthenticated ? (
                  <Homepage {...props} />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Link to='/landingpage' />
                )
              }
            />
            <Route
              exact
              path="/signup"
              element={props =>
                !isAuthenticated ? (
                  <SignUp {...props} setAuth={setAuth} />
                ) : (
                  <LandingPage/>
                )
              }
            />
            <Route
              exact
              path="/landingpage"
              element={props =>
                isAuthenticated ? (
                  <LandingPage {...props} setAuth={setAuth} />
                ) : (
                  <Login />
                )
              }
            />
            </Routes>
            
            </Layout>
          </div>
      </Router>
    </Fragment>
  );
}

export default App;
