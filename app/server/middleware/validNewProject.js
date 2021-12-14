module.exports = function (req, res, next) {
    const { nazivProjekta, planDatPoc, planDatKraj, idVlasnika} = req.body;
  
    if (![nazivProjekta, planDatPoc, planDatKraj, idVlasnika].every(Boolean)) {
      return res.json("Potrebno popuniti sva polja!");
    } else if (/^\s*$/.test(nazivProjekta)) {
      return res.json("Naziv projekta nevalja!");
    }

    next();
  };