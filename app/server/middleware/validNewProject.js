module.exports = function (req, res, next) {
    const { nazivProjekta, planDatPoc, planDatKraj, idVlasnika, opisProjekta} = req.body;

    if (req.path === "/add") {
      if (![nazivProjekta, planDatPoc, planDatKraj, idVlasnika, opisProjekta].every(Boolean)) {
        return res.json("Potrebno popuniti sva polja!");
      } else if (/^\s*$/.test(nazivProjekta)) {
        return res.json("Naziv projekta nevalja!");
      }
    }
    next();
  };