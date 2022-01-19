import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
      email: "",
      password: ""
    });

    let history = useHistory(); 

    const { email, password } = inputs;

    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { email, password };
          const response = await fetch(
            "/auth/login",
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
            localStorage.setItem("user", JSON.stringify(parseRes.data));
            setAuth(true);
            toast.success("Uspjesna prijava!");
            history.push('/landingpage')
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
                <h1>DOBRODOŠLI NATRAG!</h1>
                <p>Unesite svoje podatke za prijavu:</p>
            </div>
            <div className = 'form-box'>
                    <form onSubmit={onSubmitForm} className='formtest'>

                        <div className='email-form'>
                            <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            className="form-control-email"
                            placeholder = 'Upišite email adresu*'
                            />
                        </div>

                        <div className='pass-form'>

                            <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            className="form-control"
                            placeholder = 'Upišite lozinku'
                            />
                            <button className='anew btn btn-2 navlinkother btn-noborder' type='submit' >Prijava</button>

                        </div>
                    </form>
            </div>
            <br />
            <div className = 'ostaloLogin'>
                <div className='sign-up-option'>
                    Nemaš račun?<a href="/signup" className= 'a6 btn-6'>Registriraj se</a>
                </div>
                
                <div className='pass-reset-option'>
                    Zaboravljena lozinka? <a href="/reset-password" className= 'a6 btn-6'>Obnovi lozinku</a>
                </div>
            </div>
          </div>
          
        </Fragment>
      );

};

export default Login;