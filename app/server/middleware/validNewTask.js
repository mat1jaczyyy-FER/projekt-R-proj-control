module.exports = function (req, res, next) {
    const { opis, planDatPoc, planDatKraj, planBrSati, idProjekta} = req.body;

    if (req.path === "/add") {
      if (![opis, planDatPoc, planDatKraj, planBrSati, idProjekta].every(Boolean)) {
        return res.json("Potrebno popuniti sva polja!");
      }
    }
    next();
  };