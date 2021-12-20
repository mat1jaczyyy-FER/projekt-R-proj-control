const db = require('../database');

module.exports = class dodijeljenJe {
    constructor (idZaposlenika, idZadatka) {
        this.idZaposlenika = idZaposlenika;
        this.idZadatka = idZadatka;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO dodijeljenJe (idZaposlenika, idZadatka) VALUES (" +
            `'${this.idZaposlenika}', '${this.idZadatka}')
            RETURNING *`;

        try {
            let dodijeljenje = await db.query(sql, []);
            return dodijeljenje;

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async getdodijeljenJeInfo(idZaposlenika, idZadatka) {
        const sql = `SELECT * FROM Zadatak NATURAL JOIN Zaposlenik WHERE Zadatak.idZadatka = '${idZadatka}' AND Zaposlenik.idZaposlenika = '${idZaposlenika}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}