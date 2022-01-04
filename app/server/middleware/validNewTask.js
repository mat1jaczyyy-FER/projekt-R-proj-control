module.exports = function (req, res, next) {
    const { opisProjekta, planDatPoc, planDatKraj, planBrSati, idProjekta} = req.body;

    if (req.path === "/add") {
      if (![opisProjekta, planDatPoc, planDatKraj, planBrSati, idProjekta].every(Boolean)) {
        return res.json("Potrebno popuniti sva polja!");
      }
    }
    next();
  };