import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
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
        <Routes>
          <Route exact path = '/' element = {<Homepage/>} />
          <Route exact path = '/login' element = {<Login/>} />
          <Route exact path='/signup' element={<Signup/>}></Route>
          <Route exact path = '/todo' element = {<ToDoApp/>} />
          <Route exact path = '/mojiprojekti' element = {<ProjektApp/>} />
        </Routes>
      </Layout>    
    </Router>
  );
}

export default App;
