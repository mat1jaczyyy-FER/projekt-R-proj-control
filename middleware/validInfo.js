module.exports = function (req, res, next) {
    const { username, email, password, name, surname } = req.body;
  
    // check a valid email has been entered by using a regex function
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/signup") {
      console.log(!email.length);
      if (![username, email, password, name, surname].every(Boolean)) {
        return res.json("Potrebno popuniti sva polja!");
      } else if (!validEmail(email)) {
        return res.json("Email nevaljan!");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.json("Potrebno popuniti sva polja!");
      } else if (!validEmail(email)) {
        return res.json("Email nevaljan!");
      }
    }
  
    next();
  };