const db = require('../database');

module.exports = class radiNa {
    constructor (idProjekta, idZaposlenika) {
        this.idProjekta = idProjekta;
        this.idZaposlenika = idZaposlenika;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO radiNa (idProjekta, idZaposlenika) VALUES (" +
            `'${this.idProjekta}', '${this.idZaposlenika}')
            RETURNING *`;

        try {
            let radina = await db.query(sql, []);
            return radina;

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async getradiNaInfo(idProjekta, idZaposlenika) {
        const sql = `SELECT * FROM Projekt NATURAL JOIN Zaposlenik WHERE Projekt.idProjekta = '${idProjekta}' AND Zaposlenik.idZaposlenika = '${idZaposlenika}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}