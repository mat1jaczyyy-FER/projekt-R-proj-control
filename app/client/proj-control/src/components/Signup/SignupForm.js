import React, { useEffect, useState } from 'react';
import validation from './Validation';
import { Fragment } from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
function SignupForm(props) {
  const [values,setValues]=useState({
    username:"",
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmpassword:""
  });

  const [errors,setErrors]=useState({});
  const [error1,setError1]=useState({msg:""});
  const [error2,setError2]=useState({msg:""});
  const [error3,setError3]=useState({msg:""});
  const [dataIsCorrect,setDataIsCorrect]=useState(false);
  const handleFormSubmit=(e)=>{
    e.preventDefault();
    setError1("");
    setError2("");
    setError3("");
    fetch('/api/signup', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(values)
    }).then(function(response) {
        return response.json();
    }).then(data=>{
      try{
        if(data.err1){
          setError1({msg:data.err1})
        }else if(data.err2){
          setError2({msg:data.err2})
        }else if(data.err3){
          setError3({msg:data.err3})
        }else{
        setDataIsCorrect(true); 
        localStorage.setItem("token", data.token)
        window.location.href = "/";}}
       catch{
         console.log(data)
       }
       
    });
    setErrors(validation(values));
  }  
  useEffect(async()=>{
    if(Object.keys(errors).length ===0 && dataIsCorrect){
      props.submitForm(true);
    }
  },[errors]);

  const handleChange=(e)=>{
    setValues({
      ...values,
      [e.target.name]:e.target.value,});
  };

    

      return (
        <Fragment>
         <div className='signIN'>
            <div className = 'login-naslov'>
                <h1>DOBRODOŠLI !</h1>
                <p>Unesite podatke potrebne za registraciju:</p>
            </div>
            <div className = 'form-box'>
                        <form onSubmit={handleFormSubmit}>

                          <input
                                type="text"
                                name="username"
                                value={values.username}
                                placeholder="Korisničko ime"
                                onChange={e => handleChange(e)}
                                className="form-control"
                            />
                            {errors.username && <p className="error">{errors.username}</p>}
                                               
                            <input
                                type="text"
                                name="email"
                                value={values.email}
                                placeholder="Email"
                                onChange={e => handleChange(e)}
                                className="form-control"
                            />
                            {errors.email && <p className="error">{errors.email}</p>}

                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                placeholder="Lozinka"
                                onChange={e => handleChange(e)}
                                className="form-control"
                            />
                            {errors.password && <p className="error">{errors.password}</p>}

                            <input
                                type="password"
                                name="confirmpassword"
                                value={values.confirmpassword}
                                placeholder="Potvrdi lozinku"
                                onChange={e => handleChange(e)}
                                className="form-control"
                            />
                            {error1.msg && <p className="error">{error1.msg}</p>}
                            {error2.msg && <p className="error">{error2.msg}</p>}
                            {error3.msg && <p className="error">{error3.msg}</p>}

                            <input
                                type="text"
                                name="firstname"
                                value={values.firstname}
                                placeholder="Ime"
                                onChange={e => handleChange(e)}
                                className="form-control"
                            />
                            {errors.firstname && <p className="error">{errors.firstname}</p>}

                            <input
                                type="text"
                                name="lastname"
                                value={values.lastname}
                                placeholder="Prezime"
                                onChange={e => handleChange(e)}
                                className="form-control"
                            />
                            {errors.lastname && <p className="error">{errors.lastname}</p>}

                            <button className='anew btn btn-2 navlinkother btn-noborder' type='submit' onClick={handleChange}>Registriraj se</button>

                        </form>                        
            </div>
        </div>
      </Fragment>
        
      );
};

export default SignupForm;