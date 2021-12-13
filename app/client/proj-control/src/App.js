import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast } from "react-toastify";

import Login from "./components/Login";
import Form from "./components/Signup/Form";
import SignupForm from './components/Signup/SignupForm';
import Homepage from "./components/Homepage";
import Layout from './hocs/Layout';
import ToDoApp from './components/ToDoList/ToDoApp';

toast.configure();

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path = '/' element = {<Homepage/>} />
          <Route exact path = '/login' element = {<Login/>} />
          <Route exact path='/signup' element={<Form/>}></Route>
          <Route exact path='/signup' element={<SignupForm/>}></Route>
          <Route exact path = '/todo' element = {<ToDoApp/>} />
        </Routes>
      </Layout>    
    </Router>
  );
}

export default App;
