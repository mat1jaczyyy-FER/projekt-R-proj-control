import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast } from "react-toastify";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import Layout from './hocs/Layout';

toast.configure();

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path = '/' element = {<Homepage/>} />
          <Route exact path = '/login' element = {<Login/>} />
          <Route exact path = '/signup' element = {<SignUp/>} />
        </Routes>
      </Layout>    
    </Router>
  );
}

export default App;
