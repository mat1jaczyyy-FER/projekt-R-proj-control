module.exports = function (req, res, next) {
    const { opisZadatka, planDatPoc, planDatKraj, planBrSati, idProjekta} = req.body;

    if (req.path === "/add") {
      if (![opisZadatka, planDatPoc, planDatKraj, planBrSati, idProjekta].every(Boolean)) {
        return res.json("Potrebno popuniti sva polja!");
      }
    }
    next();
  };