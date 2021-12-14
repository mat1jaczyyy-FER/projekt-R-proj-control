import React, { Fragment, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, 
  Route,
  Switch,
Redirect } 
  from 'react-router-dom';
import { toast } from "react-toastify";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import Layout from './hocs/Layout';
import Projekti from "./components/Projekti";
import Timovi from "./components/Timovi";
import Zadaci from "./components/Zadaci";


toast.configure();

function App() {

  function refreshPage() {
    window.location.reload(false);
  }
  
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
      <Layout>
        <Switch>
            <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Homepage {...props} />
                 ) : (
                  <Redirect to="/landingpage" />
                 )
              }
            />
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/landingpage" />
                )
              }
            />
            <Route
              exact
              path="/signup"
              render={props =>
                isAuthenticated ? (
                  <Redirect to="/landingpage"/>
                 ) : (
                  <SignUp {...props} setAuth={setAuth} />
                 )
              }
            />
            <Route
              exact
              path="/landingpage"
              render={props =>
                isAuthenticated ? (
                  <LandingPage {...props} setAuth={setAuth} />
                 ) : (
                  <Redirect to="/login" />
                 )
              }
            />
            <Route exact path="/projekti" render={props => isAuthenticated ? (<Projekti {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/timovi" render={props => isAuthenticated ? (<Timovi {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/zadaci" render={props => isAuthenticated ? (<Zadaci {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>


            </Switch>
            </Layout>
      </Router>
    </Fragment>
  );
}

export default App;
