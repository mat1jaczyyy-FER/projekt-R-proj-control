import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from "react-toastify";

import Login from "./components/Login";
import Signup from "./components/SignUp";
import Homepage from "./components/Homepage";
import Layout from './hocs/Layout';
import ToDoApp from './components/ToDoList/ToDoApp';
import ProjektApp from './components/MojiProjekti/ProjektApp';

toast.configure();

function App() {

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path = '/' element = {<Homepage/>} />
          <Route exact path = '/login' element = {<Login/>} />
          <Route exact path='/signup' element={<Signup/>}></Route>
          <Route exact path = '/todo' element = {<ToDoApp/>} />
          <Route exact path = '/mojiprojekti' element = {<ProjektApp/>} />
        </Switch>
      </Layout>    
    </Router>
  );
}

export default App;
