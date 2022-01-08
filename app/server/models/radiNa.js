const db = require('../database');

module.exports = class radiNa {
    constructor (idProjekta, idZaposlenika) {
        this.idProjekta = idProjekta;
        this.idZaposlenika = idZaposlenika;
    }

    async apply() {
        return await db.query(
            `INSERT INTO radiNa (idProjekta, idZaposlenika) VALUES ($1, $2) RETURNING *`,
            [this.idProjekta, this.idZaposlenika]
        );
    }

    async getradiNaInfo(idProjekta, idZaposlenika) {
        return (await db.query(
            `SELECT * FROM Projekt NATURAL JOIN Zaposlenik WHERE Projekt.idProjekta = $1 AND Zaposlenik.idZaposlenika = $2`,
            [idProjekta, idZaposlenika]
        )).rows;
    }
}