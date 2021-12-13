import React, { useState } from 'react';
import SignupForm from "./SignupForm";
import  { Navigate } from 'react-router-dom';
const Form=()=>{
  const[formIsSubmitted,setFormIsSubmitted]=useState(false);
  const submitForm=()=>{
    setFormIsSubmitted(true);
  }
  return (<div>
    {!formIsSubmitted ? <SignupForm submitForm={submitForm} />:<Navigate to={"/"}/>}
  </div>);
}
export default Form;
