const db = require('../database');

module.exports = class dodijeljenJe {
    constructor (idZaposlenika, idZadatka) {
        this.idZaposlenika = idZaposlenika;
        this.idZadatka = idZadatka;
    }

    async apply() {
        return await db.query(
            `INSERT INTO dodijeljenJe (idZaposlenika, idZadatka)
             VALUES ($1, $2) RETURNING *`,
            [this.idZaposlenika, this.idZadatka]
        );
    }

    async getdodijeljenJeInfo(idZaposlenika, idZadatka) {
        return (await db.query(
            `SELECT * FROM Zadatak NATURAL JOIN Zaposlenik
             WHERE Zadatak.idZadatka = $1 AND Zaposlenik.idZaposlenika = $2`,
            [idZadatka, idZaposlenika]
        )).rows;
    }
}