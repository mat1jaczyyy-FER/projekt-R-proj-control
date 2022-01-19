import React, { Fragment, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, 
  Route,
  Redirect, Switch
  } 
  from 'react-router-dom';
// import {} from 'react-router'
import { toast } from "react-toastify";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import Layout from './hocs/Layout';
import Timovi from "./components/Timovi";
import MojiZadaci from "./components/Zadatak/MojiZadaci";
import Projekti from "./components/Projekt/Projekti"
import NoviProjekt from "./components/Projekt/NoviProjekt";
import NoviZadatak from "./components/Zadatak/NoviZadatak";
import SviZadaci from "./components/Zadatak/SviZadaci";
import EditProjekt from "./components/Projekt/EditProjekt";
import EditTask from "./components/Zadatak/EditTask";
import EditTaskUser from "./components/Zadatak/EditTaskUser";
import ProjektINFO from "./components/Projekt/ProjektINFO";
import FullProjektEdit from "./components/Projekt/FullProjektEdit"

import Charts from "./components/Grafovi/Chart";

//import Zaposlenici from "./components/Projekt/Zaposlenici";
//ovo iz rutera dolje (bacalo je error)
//<Route exact path="/projektinfo/zaposlenici/:id" render={props => isAuthenticated ? (<Zaposlenici {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
import Zaposlenici from "./components/Projekt/Zaposlenici";
import TaskFinish from "./components/Zadatak/TaskFinish";
import TaskFinishUser from "./components/Zadatak/TaskFinishUser";
import AddZaposlenik from "./components/Projekt/AddZaposlenik";
import OstaliZadaci from "./components/Zadatak/OstaliZadaci";
import AddUser from "./components/Zadatak/AddUser";




toast.configure();

function App() {

  function refreshPage() {
    window.location.reload(false);
  }
  
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/auth/verify", {
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
            <Route
              exact
              path="/chart/:pid"
              render={props =>
                isAuthenticated ? (
                  <Charts {...props} setAuth={setAuth} />
                 ) : (
                  <Redirect to="/login" />
                 )
              }
            />
            <Route exact path='/projekti' render={props => isAuthenticated ? (<Projekti {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/timovi" render={props => isAuthenticated ? (<Timovi {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/zadaci" render={props => isAuthenticated ? (<MojiZadaci {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/noviprojekt" render={props => isAuthenticated ? (<NoviProjekt {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/novizadatak" render={props => isAuthenticated ? (<NoviZadatak {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/svizadaci/:id" render={props => isAuthenticated ? (<SviZadaci {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/projekti/izmjena/:id" render={props => isAuthenticated ? (<EditProjekt {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/zadaci/izmjena/:pid/:id" render={props => isAuthenticated ? (<EditTask {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/zadaci/dodaj/:pid/:id" render={props => isAuthenticated ? (<AddUser {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/userzadatak/izmjena/:id" render={props => isAuthenticated ? (<EditTaskUser {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/projektinfo/:id" render={props => isAuthenticated ? (<ProjektINFO {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            
            <Route exact path="/projektinfo/zaposlenici/:id" render={props => isAuthenticated ? (<Zaposlenici {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/zadatak/finish/:id" render={props => isAuthenticated ? (<TaskFinish {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/userzadatak/finish/:id" render={props => isAuthenticated ? (<TaskFinishUser {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/addzaposlenik/:pid" render={props => isAuthenticated ? (<AddZaposlenik {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/projekti/fullizmjena/:id" render={props => isAuthenticated ? (<FullProjektEdit {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            <Route exact path="/ostalizadaci/:id" render={props => isAuthenticated ? (<OstaliZadaci {...props} setAuth={setAuth} />) : (<Redirect to="/login" />)}/>
            
            </Switch>
            </Layout>
      </Router>
    </Fragment>
  );
}

export default App;
