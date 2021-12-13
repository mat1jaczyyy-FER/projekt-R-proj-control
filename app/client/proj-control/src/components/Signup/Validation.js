const validation=(values)=>{
    let errors ={};
    if(!values.firstname){
      errors.firstname="Potrebno je unijeti ime";
    }else if (values.firstname.length<2){
      errors.firstname="Uneseno ime mora sadržavati barem 2 slova";
    }
    if(!values.username){
        errors.username="Potrebno je unijeti korisničko ime";
      }else if (values.username.length<2){
        errors.firstname="Uneseno korisničko ime mora sadržavati barem 2 slova";
    }
    if(!values.lastname){
      errors.lastname="Potrebno je unijeti prezime";
    }else if(values.lastname.length<2){
      errors.lastname="Uneseno prezime mora sadržavati barem 2 slova";
    }
    if(!values.email){
      errors.email="Potrebno je unijeti e-mail";
    }else if(!/.+@.+/.test(values.email)){
      errors.email="E-mail je neispravan";
    }
    if(!values.password){
      errors.password="Potrebno je unijeti lozinku"
    }else if(values.password.length<6){
      errors.password="Lozinka se mora sastojati od barem šest znakova"
    }
    // if(values.password !== values.confirmpassword){
    //   errors.confirmpassword="Unesene lozinke se ne podudaraju"
    // }
    return errors;
  }
  export default validation;
  