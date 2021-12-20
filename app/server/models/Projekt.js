const db = require('../database');

module.exports = class Projekt {
    constructor (nazivProjekta, planDatPoc, planDatKraj, datPoc, datKraj, idStatusa, idVlasnika, opisProjekta) {
        this.nazivProjekta = nazivProjekta;
        this.planDatPoc = planDatPoc;
        this.planDatKraj = planDatKraj;
        this.datPoc = datPoc;
        this.datKraj = datKraj;
        this.idStatusa = idStatusa;
        this.idVlasnika = idVlasnika;
        this.opisProjekta = opisProjekta;
    }

    async apply() {
        // todo fix sql injection vuln
        const sql = "INSERT INTO projekt (nazivProjekta, planDatPoc, planDatKraj, datPoc, datKraj, idStatusa, idVlasnika, opis) VALUES (" +
            `'${this.nazivProjekta}', '${this.planDatPoc}', '${this.planDatKraj}', '${this.datPoc}', '${this.datKraj}', '${this.idStatusa}', '${this.idVlasnika}', '${this.opisProjekta}')
            RETURNING *`;

        try {
            let projekt = await db.query(sql, []);
            return projekt

        } catch (err) {
            console.log(err);
            throw err
        }
    }

    static async getProjektiInfo(idVlasnika) {
        const sql = `SELECT * FROM projekt WHERE idvlasnika = '${idVlasnika}'`
        try {
            const results = (await db.query(sql, [])).rows;
            return results

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}