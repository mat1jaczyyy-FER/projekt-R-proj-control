import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";


const SignUp = ({ setAuth }) => {
    const [SignupData, setSignupData] = useState({
      username: "",
      email: "",
      password: "",
      name: "",
      surname: ""
    });

    const {username, email, password, name, surname } = SignupData;

    const onChange = e =>
    setSignupData({ ...SignupData, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {

        e.preventDefault();

        try {
          const body = { username, email, password, name, surname };
          const response = await fetch(
            "http://localhost:5000/auth/signup",
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          const parseRes = await response.json();
    
          if (parseRes.jwtToken) {
            localStorage.setItem("token", parseRes.jwtToken);
            setAuth(true);
            toast.success("Uspjesna registracija!");
            window.location.reload(false);
          } else {
            setAuth(false);
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
      };
    

      return (
        <Fragment>
         <div className='signIN'>
            <div className = 'login-naslov'>
                <h1>DOBRODOŠLI !</h1>
                <p>Unesite podatke potrebne za registraciju:</p>
            </div>
            <div className = 'form-box'>
                        <form onSubmit={onSubmitForm} className="formtest">

                          <input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Korisničko ime"
                                onChange={e => onChange(e)}
                                className="form-control"
                            />
                                               
                            <input
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={e => onChange(e)}
                                className="form-control"
                            />

                            
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Lozinka"
                                onChange={e => onChange(e)}
                                className="form-control"
                            />
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Ime"
                                onChange={e => onChange(e)}
                                className="form-control"
                            />

                            <input
                                type="text"
                                name="surname"
                                value={surname}
                                placeholder="Prezime"
                                onChange={e => onChange(e)}
                                className="form-control"
                            />

                            <button className='anew btn btn-2 navlinkother btn-noborder' type='submit'>Registriraj se</button>

                        </form>                        
            </div>
        </div>
      </Fragment>
        
      );
};

export default SignUp;